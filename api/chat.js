import { Configuration, OpenAI } from 'openai';

export default async function handler(req, res) {
  const { message } = req.body; // Get the message from the body of the request
  
  try {
    // Make a request to the OpenAI API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`, // Use your OpenAI API key from environment variables
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // Use the GPT-3.5 model
        messages: [
          {
            role: "system",
            content: "You are Nixy, a friendly assistant for Baionyx, helping users understand microplastic filters for roads."
          },
          { role: "user", content: message } // Message from the user
        ]
      })
    });

    // Parse the response from OpenAI
    const data = await response.json();
    
    // Respond with the chatbot's reply
    res.status(200).json({ reply: data.choices?.[0]?.message?.content || "Sorry, I didn’t get that." });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Something went wrong." });
  }
}