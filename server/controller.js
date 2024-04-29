// //  ❤️❤️ ❤️❤️ ❤️❤️
// // const { Configuration, OpenAIApi } = require('openai');
// // const config = new Configuration({
// //   apiKey: process.env.OPENAI_API_KEY, // API Key is in .env file
// // });
// // const openai = new OpenAIApi(config);
// // const runPrompt = async () => {
// //   const prompt = 'What is 2 plus 2';
// //   const response = await openai.createCompletion({
// //     model: 'text-davinci-003',
// //     prompt: prompt,
// //     max_tokens: 2048,
// //     temperature: 1,
// //   });
// //   console.log(response.data);
// // };
// // runPrompt();

// const OpenAI = require('openai');
// require('dotenv').config();

// const openai = new OpenAI({
//   // apiKey: , // API Key is in .env file
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

const OpenAI = require("openai");
require("dotenv").config();


// const openai = new OpenAI({
//   // apiKey: , // API Key is in .env file
// });

// -------Option 1: using model 'gpt-3.5-turbo'----------------
//Function to get activities using OpenAPI
async function getActivities(req,res,next) {
  const {question, answer} = req.body;
  console.log(question);
  console.log(answer);
  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: [
        {

          role: "user",
          content: `Can you give me 2 activiies to do ${
            indoorOutdoor === "indoor" ? "indoors" : "outdoors"
          } in ${location} for a date?`,

        },
        { role : 'assistant',
          content : answer}
      ],
      model: "gpt-3.5-turbo",
    });
    const response = chatCompletion.choices[0].message.content;
    console.log(response, chatCompletion);
    //res.locals.activties = response;
    return next();
  } catch (error) {

    console.error('Error:', error);
    next(error);
    return "Sorry, I couldn't get an answer.";
  }
}

// Function to get restaurant options using OpenAI API
async function getRestaurants(craving) {
  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          //we need access to the location chosen here
          content: `I'm craving ${craving}, could you suggest 2 restaurants? 1 casual and 1 high end in this ${location}`,
        },
      ],
      model: "gpt-3.5-turbo",
    });

    // Extract restaurant suggestions from OpenAI API response
    const response = chatCompletion.choices[0].message.content;
    console.log(response); // Log the response for debugging

    return response;
  } catch (error) {
    console.error("Error:", error);
    return "Sorry, I couldn't get restaurant suggestions.";
  }
}

// // --------Option 2: using model 'text-davinci-003';--------------------
// const runPrompt = async (question) => {
//   try {
//     const chatCompletion = await openai.chat.completions.create({
//       messages: [
//         {
//           role: 'user',
//           content:question,

//             //`Can you give me 2 activiies to do ${req.body.onAnswer} in ${req.body.prevAnswer} for a date? please return as a list as json form`,
//         },
//         { role : 'assistant',
//           content : answer}
//       ],
//       model: 'gpt-3.5-turbo',
//     });
//     const response = chatCompletion.choices[0].message.content;
//     console.log(response, chatCompletion);
//     //res.locals.activties = response;
//     return next();
//   } catch (error) {
//     console.error('Error:', error);
//     next(error);
//     return "Sorry, I couldn't get an answer.";
//   }
// }

// // Function to get restaurant options using OpenAI API
// async function getRestaurants(craving) {
//   try {
//     const chatCompletion = await openai.chat.completions.create({
//       messages: [
//         {
//           role: 'user',
//           //we need access to the location chosen here
//           content: `I'm craving ${craving}, could you suggest 2 restaurants? 1 casual and 1 high end in this ${location}`,
//         },
//       ],
//       model: 'gpt-3.5-turbo',
//     });

// (async () => {
//   const question = 'Can you give me an activity to do and restaurant to eat for a date in the evening in New York City?';
//   const answer = await runPrompt(question);
//   console.log('Answer:', answer);
// })();

module.exports = {
  getActivities,
  getRestaurants,
};
