import { createChatBotMessage } from "react-chatbot-kit";

const config = {
  initialMessages: [
    createChatBotMessage(`Welcome to the chatbot!`),
    createChatBotMessage(`I'm here to help you with your marketing questions.`),
  ],
};

export default config;
