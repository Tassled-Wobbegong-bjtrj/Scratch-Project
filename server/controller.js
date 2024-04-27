// const { Configuration, OpenAIApi } = require('openai');
// const config = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY, // API Key is in .env file
// });
// const openai = new OpenAIApi(config);
// const runPrompt = async () => {
//   const prompt = 'What is 2 plus 2';
//   const response = await openai.createCompletion({
//     model: 'text-davinci-003',
//     prompt: prompt,
//     max_tokens: 2048,
//     temperature: 1,
//   });
//   console.log(response.data);
// };
// runPrompt();

const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // API Key is in .env file
});
// -------Option 1: using model 'gpt-3.5-turbo'----------------
async function runPrompt() {
  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: [
        {
          role: 'user',
          content:
            'Can you give me an activity to do and restaurant to eat for a date in the evening in New York City',
        },
      ],
      model: 'gpt-3.5-turbo',
    });
    const response = chatCompletion.choices[0].message.content;
    console.log(response, chatCompletion);
    return response;
  } catch (error) {
    console.error('Error:', error);
    return "Sorry, I couldn't get an answer.";
  }
}
runPrompt();

// // --------Option 2: using model 'text-davinci-003';--------------------
// const runPrompt = async (question) => {
//   try {
//     const response = await openai.createCompletion({
//       model: 'text-davinci-003',
//       prompt: `Question: ${question}\nAnswer:`,
//       max_tokens: 50,
//       temperature: 1,
//     });
//     console.log(response.data);
//     return response.data.choices[0].text.trim();
//   } catch (error) {
//     console.error('Error:', error);
//     return "Sorry, I couldn't get an answer.";
//   }
// };

// (async () => {
//   const question = 'Can you give me an activity to do and restaurant to eat for a date in the evening in New York City?';
//   const answer = await runPrompt(question);
//   console.log('Answer:', answer);
// })();
