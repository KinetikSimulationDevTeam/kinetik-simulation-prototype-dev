import React from "react";

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    if (message.includes("tactic") || message.includes("strategy")) {
      console.log("tactic");
    } else {
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
