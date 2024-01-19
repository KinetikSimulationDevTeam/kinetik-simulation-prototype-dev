import { createChatBotMessage } from "react-chatbot-kit";

//Initial configuration for the chatbot
const config = {
  initialMessages: [
    createChatBotMessage(`Welcome to the Kinetik! I'm here to help you with your marketing questions. If you want to ask about tactics or strategies, type "tactic" or "strategy" following with your question.`)
    
  ]
};

export default config;
