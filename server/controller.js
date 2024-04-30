
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


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // API Key is stored in .env file in root
});

// -------Option 1: using model 'gpt-3.5-turbo'----------------

//Function to get activities using OpenAPI - not currently used as middleware
async function getActivities(city, type, cravings) {

  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: [
        {

          role: "user",

          content: `Hey chatGPT, could you give us a good evening date idea with an ${type} activity and a high end ${cravings} spot in ${city}? 
          Make sure to include specific addresses`,

        },
        { role : 'assistant',
          content : answer}
      ],
      model: "gpt-3.5-turbo",
    });

    const response = chatCompletion.choices[0].message.content; // // if we didnt have contentstring message: "String"
    // {message: "string"}
    console.log("response", response);
    console.log("chatCompletion", chatCompletion);
    return response;

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
};
