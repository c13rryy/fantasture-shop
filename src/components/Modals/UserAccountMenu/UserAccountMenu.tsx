"use client";
import UserAvatar from "@/components/UserAvatar/UserAvatar";
import { Icon } from "@/components/ui/Icon/Icon";
import Button from "@/components/ui/button/button";
import Modal from "@/components/ui/modal/modal";
import Typo from "@/components/ui/typography/typo";
import { ModalContext } from "@/store/modal-store";
import { User } from "next-auth";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FC, useContext } from "react";

interface UserAccountMenuProps {
  user: Pick<User, "name" | "email" | "image">;
}

const UserAccountMenu: FC<UserAccountMenuProps> = ({ user }) => {
  const { open, toggle } = useContext(ModalContext);

  const router = useRouter();

  function closeModal() {
    toggle("accountModal");
  }

  return (
    <Modal toggle={closeModal} isOpen={open.accountModal}>
      <div className="flex relative flex-col gap-24px">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-10px">
            <UserAvatar
              user={{
                name: user.name || null,
                image: user.image || null,
              }}
            />
            <button
              onClick={() => {
                router.push("/settings");
                toggle("accountModal");
              }}
            >
              <Icon icon="settings" size={24} />
            </button>
          </div>
          <button onClick={closeModal}>
            <Icon icon="close" size={24} />
          </button>
        </div>
        <ul className="flex flex-col gap-16px mt-20">
          <li className="border-t-[1px] pt-10 border-solid">
            <Typo tag="h4" text="Name"></Typo>
            <Typo type="mediumP">{user.name}</Typo>
          </li>
          <li className="border-t-[1px] pt-10 border-solid">
            <Typo tag="h4" text="Email"></Typo>
            <Typo type="mediumP">{user.email}</Typo>
          </li>
        </ul>

        <div>
          <Button
            type="button"
            onClick={() => {
              signOut({
                callbackUrl: `${window.location.origin}/sign-in`,
              });
            }}
            size="small"
          >
            Sign out
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default UserAccountMenu;
