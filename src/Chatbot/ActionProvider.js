import React from "react";
import ChatGPTInvoke from "./ChatGPTInvoke";
import { fetchQuestionResponse } from './fetchQuestionResponse.js';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const handleOtherInput = async (input) => {
    let botMessage;
    try {
      let response;

      if (/^(tactics:|tactic:|strategy:|strategies:)/i.test(input)) {
        // Remove the keyword from input and fetch question response
        const question = input.replace(/^(tactics:|tactic:|strategy:|strategies:)\s*/i, "");
        response = await fetchQuestionResponse(question);
      } else {
        // Otherwise, invoke ChatGPT
        response = await ChatGPTInvoke(input);
      }
      
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
