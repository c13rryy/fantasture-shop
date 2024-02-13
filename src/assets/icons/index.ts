import Cart from "./Cart";
import Like from "./Like";
import Logo from "./Logo";
import Profile from "./Profile";
import Search from "./Search";
import Share from "./Share";
import HeaderLike from "./HeaderLike";
import Arrow from "./Arrow";
import SwiperArrow from "./SwiperArrrow";
import ActivePathArrow from "./ActivePathArrow";
import Support from "./Support";
import Guarantee from "./Guarantee";
import Trophy from "./Trophy";
import Shipping from "./Shipping";
import Google from "./Google";
import Phone from "./Phone";
import Clock from "./Clock";
import Location from "./Location";
import Delete from "./Delete";
import Loader from "./Loader";
import Close from "./Close";
import Bot from "./Bot";
import Star from "./Star";
import VoteLike from "./VoteLike";
import VoteDislike from "./VoteDislike";
import Trash from "./Trash";
import MessageSquare from "./MessageSquare";
import CartLike from "./CartLike";
import CartDislike from "./CartDislike";
import NotFound from "./NotFound";
import Settings from "./Settings";

export const content = {
  share: Share,
  like: Like,
  profile: Profile,
  headerLike: HeaderLike,
  search: Search,
  cart: Cart,
  logo: Logo,
  arrow: Arrow,
  swiperArrow: SwiperArrow,
  "active-path-arrow": ActivePathArrow,
  support: Support,
  guarantee: Guarantee,
  trophy: Trophy,
  shipping: Shipping,
  google: Google,
  phone: Phone,
  clock: Clock,
  location: Location,
  delete: Delete,
  loader: Loader,
  close: Close,
  bot: Bot,
  star: Star,
  "vote-like": VoteLike,
  "vote-dislike": VoteDislike,
  trash: Trash,
  "message-square": MessageSquare,
  "cart-tick": CartLike,
  "cart-empty": CartDislike,
  "not-found": NotFound,
  settings: Settings,
};

export type IAvailableIcons = keyof typeof content;
