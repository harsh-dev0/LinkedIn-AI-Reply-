export const fetchAIResponse = async (input: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Simulate an API call with a timeout
    setTimeout(() => {
      if (input) {
        // Generate a dynamic AI response based on the input
        const response = generateAIResponse(input);
        resolve(response);
      } else {
        // Reject the promise if the input is invalid
        reject(new Error("Invalid input"));
      }
    }, 1000); // Delay to simulate response time
  });
};

// Helper function to generate a dynamic AI response
const generateAIResponse = (input: string): string => {
  // Convert input to lowercase for easier matching
  const lowerInput = input.toLowerCase();

  // Define responses based on keywords in the input
  if (lowerInput.includes("hello") || lowerInput.includes("hi")) {
    return "Hello! How can I assist you today?";
  } else if (lowerInput.includes("how are you")) {
    return "I'm just a program, but I'm here and ready to help! How about you?";
  } else if (lowerInput.includes("thank you")) {
    return "You're welcome! Let me know if there's anything else I can do for you.";
  } else if (lowerInput.includes("weather")) {
    return "I'm not connected to a weather service, but I recommend checking a reliable weather app for the latest updates!";
  } else if (lowerInput.includes("joke")) {
    return "Sure! Here's a joke: Why don’t programmers like nature? It has too many bugs. 😄";
  } else if (lowerInput.includes("help")) {
    return "Of course! I can assist with general questions, provide explanations, or even tell you a joke. What do you need help with?";
  } else if (lowerInput.includes("time")) {
    return `The current time is ${new Date().toLocaleTimeString()}.`;
  } else if (lowerInput.includes("date")) {
    return `Today's date is ${new Date().toLocaleDateString()}.`;
  } else if (lowerInput.includes("tell me about yourself")) {
    return "I'm an AI assistant designed to help answer your questions and provide useful information. How can I assist you today?";
  } else if (lowerInput.includes("quote")) {
    return "Here's a motivational quote for you: 'The only limit to our realization of tomorrow is our doubts of today.' – Franklin D. Roosevelt";
  } else if (lowerInput.includes("fact")) {
    return "Did you know? Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible!";
  } else {
    // Default response if no specific keyword is matched
    return "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.";
  }
};

// For OpenAI API key
// const fetchAIResponseWithOpenAI = async (input: string): Promise<string> => {
//   const apiKey = "YOUR_OPENAI_API_KEY"; // Replace with your actual OpenAI API key
//   const response = await fetch("https://api.openai.com/v1/completions", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": `Bearer ${apiKey}`,
//     },
//     body: JSON.stringify({
//       model: "gpt-3.5-turbo",
//       prompt: input,
//       max_tokens: 150,
//     }),
//   });
//   const data = await response.json();
//   return data.choices[0].text.trim();
// };