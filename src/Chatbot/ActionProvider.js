import React from "react";
import ChatGPTInvoke from "./ChatGPTInvoke";

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const handleOtherInput = async (input) => {
    let botMessage;
    try {
      const response = await ChatGPTInvoke(input);
      botMessage = createChatBotMessage(response);
    } catch (error) {
      console.log(error);
      botMessage = createChatBotMessage(
        "I'm having some trouble, try again later."
      );
    }

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleOtherInput,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;
