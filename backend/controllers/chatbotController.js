const Flight = require('../models/Flight');

const SYSTEM_CONTEXT = `You are "Sky", the friendly AI travel assistant for SkyJourney, a premium airline based in Bengaluru, India.
You help users with: booking flights, checking flight status, baggage policy, cancellations, refunds, and general travel questions.
Keep replies SHORT (2-4 sentences max), warm, and helpful. Use simple language.
If the user asks about flights between two cities (e.g. "flights from Bengaluru to Delhi" or "show me flights to Goa"), use the searchFlights tool to look up real, live results before replying — never make up flight numbers or prices yourself.
After getting tool results, summarize them naturally in your own words (airline, time, price) — don't just dump raw data.
If asked about specific personal bookings, politely direct them to the "My Bookings" page since you don't have access to personal account data.
If asked something completely unrelated to travel/flights, gently redirect back to how you can help with their journey.
Never mention you are powered by Gemini or any other model name. You are "Sky" from SkyJourney.`;

const searchFlightsTool = {
  functionDeclarations: [
    {
      name: 'searchFlights',
      description: 'Search for real available flights between two cities on SkyJourney',
      parameters: {
        type: 'object',
        properties: {
          source: { type: 'string', description: 'Departure city, e.g. Bengaluru' },
          destination: { type: 'string', description: 'Arrival city, e.g. Delhi' },
        },
        required: ['source', 'destination'],
      },
    },
  ],
};

async function runFlightSearch(source, destination) {
  const flights = await Flight.find({
    source: new RegExp(source, 'i'),
    destination: new RegExp(destination, 'i'),
    status: 'scheduled',
    availableSeats: { $gt: 0 },
  })
    .sort({ price: 1 })
    .limit(4);

  return flights.map((f) => ({
    airline: f.airline,
    flightNumber: f.flightNumber,
    source: f.source,
    destination: f.destination,
    departureTime: f.departureTime,
    price: f.price,
    availableSeats: f.availableSeats,
  }));
}

exports.chatWithBot = async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) return res.status(400).json({ message: 'Message is required' });

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      return res.status(200).json({
        reply: "Hi! I'm Sky, your SkyJourney assistant. ✈️ (Note: AI is not yet configured by the admin — add a free Gemini API key in backend/.env to enable me fully!)",
        configured: false,
      });
    }

    const contents = [];
    if (Array.isArray(history)) {
      history.slice(-6).forEach((h) => {
        contents.push({ role: h.role === 'bot' ? 'model' : 'user', parts: [{ text: h.text }] });
      });
    }
    contents.push({ role: 'user', parts: [{ text: message }] });

    const callGemini = (currentContents) =>
      fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: currentContents,
            systemInstruction: { parts: [{ text: SYSTEM_CONTEXT }] },
            tools: [searchFlightsTool],
            generationConfig: { maxOutputTokens: 300, temperature: 0.7 },
          }),
        }
      );

    let response = await callGemini(contents);
    let data = await response.json();

    if (!response.ok) {
      console.error('Gemini API error status:', response.status);
      console.error('Gemini API error body:', JSON.stringify(data));
      return res.status(200).json({
        reply: "I'm having a little trouble connecting right now. Please try again in a moment, or check My Bookings for account help!",
        configured: true,
        error: true,
      });
    }

    let candidate = data?.candidates?.[0];
    const functionCallPart = candidate?.content?.parts?.find((p) => p.functionCall);

    if (functionCallPart) {
      const { name, args } = functionCallPart.functionCall;
      let toolResult = [];

      if (name === 'searchFlights') {
        toolResult = await runFlightSearch(args.source, args.destination);
      }

      // Feed the function result back to Gemini for a natural-language summary
      contents.push({ role: 'model', parts: [{ functionCall: functionCallPart.functionCall }] });
      contents.push({
        role: 'user',
        parts: [{ functionResponse: { name, response: { flights: toolResult } } }],
      });

      response = await callGemini(contents);
      data = await response.json();
      candidate = data?.candidates?.[0];
    }

    const reply =
      candidate?.content?.parts?.find((p) => p.text)?.text ||
      "I'm not sure how to answer that — could you rephrase?";

    res.json({ reply, configured: true });
  } catch (error) {
    console.error('Chatbot error:', error);
    res.status(500).json({ message: 'Chatbot service error', error: error.message });
  }
};

exports.quickFlightSearch = async (req, res) => {
  try {
    const { source, destination } = req.query;
    if (!source || !destination) return res.json({ flights: [] });
    const flights = await runFlightSearch(source, destination);
    res.json({ flights });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
