import { vertexAI } from '@/lib/googleCloudClient';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { resumeText } = req.body;

  if (!resumeText) {
    return res.status(400).json({ message: 'Missing resumeText in request body' });
  }

  const request = {
    endpoint: 'projects/gemini-project/locations/us/endpoints/gemini-pro', // Replace with your Gemini endpoint
    instances: [
      {
        content: `Analyze the following resume and provide a summary, strengths, and areas for improvement: ${resumeText}`,
      },
    ],
    parameters: {
      temperature: 0.2,
      maxOutputTokens: 1024,
      topP: 0.95,
      topK: 40,
    },
  };

  try {
    const [response] = await vertexAI.predict(request);
    const prediction = response.predictions[0];
    // Assuming the model returns a JSON string with summary, strengths, and improvements.
    res.status(200).json(JSON.parse(prediction.content));
  } catch (error) {
    console.error('Error analyzing resume with Gemini:', error);
    res.status(500).json({ message: 'Failed to get a response from the AI.' });
  }
}
