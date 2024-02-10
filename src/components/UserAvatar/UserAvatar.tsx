import { User } from "next-auth";
import Image from "next/image";
import { FC } from "react";

interface UserAvatarProps {
  user: Pick<User, "name" | "image">;
}

const UserAvatar: FC<UserAvatarProps> = ({ user }) => {
  return (
    <div>
      {user.image ? (
        <div className="w-[50px] h-[50px]">
          <div className="relative aspect-square h-full">
            <Image
              fill
              src={user.image}
              alt="profile-picture"
              referrerPolicy="no-referrer"
              className="rounded-[50%]"
            />
          </div>
        </div>
      ) : (
        <div className="w-[50px] h-[50px]">
          <span className="sr-only">{user.name}</span>
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
