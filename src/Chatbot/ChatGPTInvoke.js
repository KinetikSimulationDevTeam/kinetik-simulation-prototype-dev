import GetResponse from "./ChatGPTConfig";

// Function to interact with the ChatGPT API
const chatGptResponse = async (message) => {
  const response = await GetResponse(message);
  return response;
};

export default chatGptResponse;
