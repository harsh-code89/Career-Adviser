import { vertexAI, documentAI, dialogflowClient } from '@/lib/googleCloudClient';

export default async function handler(req, res) {
  try {
    // Test Vertex AI
    const vertexTest = await vertexAI.predict({
      endpoint: 'test-endpoint',
      instances: [{ content: 'Test input for Vertex AI' }],
    });

    // Test Document AI
    const documentTest = await documentAI.processDocument({
      name: 'projects/test-project/locations/us/processors/test-processor',
      rawDocument: { content: 'Test document content', mimeType: 'text/plain' },
    });

    // Test Dialogflow
    const sessionPath = dialogflowClient.projectAgentSessionPath(
      'test-project',
      'test-session'
    );
    const dialogflowTest = await dialogflowClient.detectIntent({
      session: sessionPath,
      queryInput: {
        text: { text: 'Test query for Dialogflow', languageCode: 'en-US' },
      },
    });

    res.status(200).json({
      vertexAI: vertexTest,
      documentAI: documentTest,
      dialogflow: dialogflowTest,
    });
  } catch (error) {
    console.error('Integration test failed:', error);
    res.status(500).json({ error: 'Integration test failed', details: error });
  }
}