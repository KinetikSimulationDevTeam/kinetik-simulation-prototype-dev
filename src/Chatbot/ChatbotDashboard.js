import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import ChatBotIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import Chatbot from "react-chatbot-kit";
import config from "./Config";
import MessageParser from "./MessageParser";
import ActionProvider from "./ActionProvider";
import "react-chatbot-kit/build/main.css";
import "./ChatbotDashboard.css";

// ChatbotDashboard component handles the chatbot UI
const ChatbotDashboard = () => {
   //manage whether the chatbot is collapsed or expanded
  const [isCollapsed, setIsCollapsed] = useState(true);

  // Function to toggle the chatbot's collapsed state
  const toggleChatbot = () => {
    setIsCollapsed(!isCollapsed);
  };
   
  // Return the chatbot UI
  return (
    <Box className={isCollapsed ? "chatbot-icon" : "chatbot-expanded"}>
      {isCollapsed ? (
        <IconButton
          onClick={toggleChatbot}
          sx={{ position: "fixed", bottom: "4%", right: "2%" }}
        >
          <ChatBotIcon fontSize="large" />
        </IconButton>
      ) : (
        <Box sx={{ position: "fixed", bottom: "1%", right: "1%" }}>
          <IconButton
            onClick={toggleChatbot}
            sx={{
              position: "fixed",
              bottom: "465px",
              right: "20px",
              zIndex: "100",
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
          <Chatbot
            config={config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
            headerText="Chatbot"
          />
        </Box>
      )}
    </Box>
  );
};

export default ChatbotDashboard;
