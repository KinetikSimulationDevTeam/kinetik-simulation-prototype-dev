import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "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",
  dangerouslyAllowBrowser: true,
});

const GetResponse = async (input) => {
  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: input }],
  });

  return chatCompletion.choices[0].message.content;
};

export default GetResponse;
