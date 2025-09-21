import { vertexAI } from '@/lib/googleCloudClient';

export async function sendMessageToChatbot(sessionId, message) {
  const request = {
    endpoint: 'projects/gemini-project/locations/us/endpoints/gemini-pro', // Replace with your Gemini endpoint
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
    return {
      fulfillmentText: prediction.content,
    };
  } catch (error) {
    console.error('Error sending message to Gemini:', error);
    throw new Error('Failed to get a response from the AI. Please try again later.');
  }
}