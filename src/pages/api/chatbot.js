import { vertexAI } from '@/lib/googleCloudClient';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { sessionId, message } = req.body;

  if (!sessionId || !message) {
    return res.status(400).json({ message: 'Missing sessionId or message in request body' });
  }

  const endpoint = process.env.GEMINI_ENDPOINT_URL;
  if (!endpoint) {
    return res.status(500).json({ message: 'GEMINI_ENDPOINT_URL environment variable not set.' });
  }

  const request = {
    endpoint,
    instances: [
      {
        content: `User query: ${message}`,
      },
    ],
    parameters: {
      temperature: 0.2,
      maxOutputTokens: 256,
      topP: 0.95,
      topK: 40,
    },
  };

  try {
    const [response] = await vertexAI.predict(request);
    const prediction = response.predictions[0];
    res.status(200).json({ fulfillmentText: prediction.content });
  } catch (error) {
    console.error('Error sending message to Gemini:', error);
    res.status(500).json({ message: 'Failed to get a response from the AI.' });
  }
}
