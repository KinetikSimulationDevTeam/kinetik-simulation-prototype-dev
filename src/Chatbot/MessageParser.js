import React from "react";

// MessageParser component handles the logic of parsing user messages
const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    actions.handleOtherInput(message);  // message will be handled in ActionProvider
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
