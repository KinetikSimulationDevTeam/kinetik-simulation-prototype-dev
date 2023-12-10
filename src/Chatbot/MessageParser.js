import React from "react";

// MessageParser component handles the logic of parsing user messages
const MessageParser = ({ children, actions }) => {
  const parse = (message) => {

    if (message.includes("tactic") || message.includes("strategy")) {
      console.log("tactic");
    } else {
      //if messages are not about tactics or strategies, handle them with handleOtherInput function (chatgpt API)
      actions.handleOtherInput(message);
    }
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions,
        });
      })}
    </div>
  );
};

export default MessageParser;
