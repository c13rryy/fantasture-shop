import { FC } from "react";

interface MessageTemplateProps {
  userName: string;
  userMessage: string;
}

const MessageTemplate: FC<Readonly<MessageTemplateProps>> = ({
  userName,
  userMessage,
}) => {
  return (
    <div>
      <h1>{userName}</h1>
      <p>{userMessage}</p>
    </div>
  );
};

export default MessageTemplate;
