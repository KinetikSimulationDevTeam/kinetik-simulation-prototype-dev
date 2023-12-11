import React from "react";
import ChatGPTInvoke from "./ChatGPTInvoke";
import { fetchQuestionResponse } from './RecommendationInvoke.js';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const handleOtherInput = async (input) => {
    let botMessage;
    try {
      let response;

      if (/^(tactics:|tactic:|strategy:|strategies:)/i.test(input)) {  // message starts with specified keywords
        const question = input.replace(/^(tactics:|tactic:|strategy:|strategies:)\s*/i, "");  // Remove the keyword from input and fetch question response
        response = await fetchQuestionResponse(question);
      } else {   
        response = await ChatGPTInvoke(input);  // Otherwise, invoke ChatGPT
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