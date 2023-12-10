import GetResponse from "./ChatGPTConfig";

const chatGptResponse = async (message) => {
  const response = await GetResponse(message);
  return response;
};

export default chatGptResponse;
