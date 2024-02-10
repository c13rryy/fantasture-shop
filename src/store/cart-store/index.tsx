/* eslint-disable @typescript-eslint/no-unused-vars */
import { ProductType } from "@/types";
import { ReactNode, createContext, useEffect, useReducer } from "react";

interface ReducerState {
  items: ProductType[] | [];
}

type ReducerAction =
  | { type: "ADD_ITEM"; item: ProductType }
  | { type: "INCREASE_ITEM_QUANTITY"; id: string }
  | { type: "REMOVE_ITEM"; id: string }
  | { type: "DELETE_ITEM"; id: string }
  | { type: "CLEAR_CART" }
  | { type: "INIT_STORED"; items: ProductType[] };

export const CartContext = createContext<{
  items: ProductType[] | [];
  addItem: (item: ProductType) => void;
  increaseQuantity: (id: string) => void;
  removeItem: (id: string) => void;
  deleteItem: (id: string) => void;
  clearCart: () => void;
}>({
  items: [],
  addItem: (item: ProductType) => {},
  increaseQuantity: (id: string) => {},
  removeItem: (id: string) => {},
  deleteItem: (id: string) => {},
  clearCart: () => {},
});

function cartReducer(state: ReducerState, action: ReducerAction) {
  if (action.type === "INIT_STORED") {
    return { ...state, items: action.items };
  }

  if (action.type === "ADD_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      item => item.id === action.item.id
    );

    const updItems = [...state.items];

    if (existingCartItemIndex > -1) {
      const updItem = {
        ...state.items[existingCartItemIndex],
        quantity:
          (state.items[existingCartItemIndex].quantity ?? 0) +
          (action.item.quantity ?? 1),
      };

      updItems[existingCartItemIndex] = updItem;
    } else if (action.item.quantity) {
      updItems.push({ ...action.item });
    } else {
      updItems.push({ ...action.item, quantity: 1 });
    }

    return { ...state, items: updItems };
  }

  if (action.type === "INCREASE_ITEM_QUANTITY") {
    const existingCartItemIndex = state.items.findIndex(
      item => item.id === action.id
    );

    const updItems = [...state.items];

    const updItem = {
      ...state.items[existingCartItemIndex],
      quantity: (state.items[existingCartItemIndex].quantity ?? 0) + 1,
    };

    updItems[existingCartItemIndex] = updItem;

    return { ...state, items: updItems };
  }

  if (action.type === "DELETE_ITEM") {
    const updItems = [...state.items];

    const filterData = updItems.filter(el => el.id !== action.id);

    return { ...state, items: filterData };
  }

  if (action.type === "REMOVE_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      item => item.id === action.id
    );

    const existingCartItem = state.items[existingCartItemIndex];

    const updItems = [...state.items];

    if (existingCartItem.quantity === 1) {
      updItems.splice(existingCartItemIndex, 1);
    } else if (existingCartItem.quantity) {
      const updItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };

      updItems[existingCartItemIndex] = updItem;
    }

    return { ...state, items: updItems };
  }

  if (action.type === "CLEAR_CART") {
    return { ...state, items: [] };
  }

  return state;
}

const initialState = {
  items: [],
};

export function CartContextProvider({ children }: { children: ReactNode }) {
  const [shoppingCartState, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("cartItems") || "[]")) {
      dispatch({
        type: "INIT_STORED",
        items: JSON.parse(localStorage.getItem("cartItems") || "[]"),
      });
    }
  }, []);

  useEffect(() => {
    if (shoppingCartState.items !== initialState.items) {
      localStorage.setItem(
        "cartItems",
        JSON.stringify(shoppingCartState.items)
      );
    }
  }, [shoppingCartState.items]);

  function addItem(item: ProductType) {
    dispatch({
      type: "ADD_ITEM",
      item,
    });
  }

  function increaseQuantity(id: string) {
    dispatch({
      type: "INCREASE_ITEM_QUANTITY",
      id,
    });
  }

  function removeItem(id: string) {
    dispatch({
      type: "REMOVE_ITEM",
      id,
    });
  }

  function deleteItem(id: string) {
    dispatch({
      type: "DELETE_ITEM",
      id,
    });
  }
  function clearCart() {
    dispatch({
      type: "CLEAR_CART",
    });
  }

  const cartCtx = {
    items: shoppingCartState.items,
    addItem,
    removeItem,
    deleteItem,
    clearCart,
    increaseQuantity,
  };

  return (
    <CartContext.Provider value={cartCtx}>{children}</CartContext.Provider>
  );
}
