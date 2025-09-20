// This file will handle Google Cloud AI integrations
import { EndpointServiceClient } from '@google-cloud/aiplatform';
import { DocumentProcessorServiceClient } from '@google-cloud/documentai';
import { SessionsClient } from '@google-cloud/dialogflow';

const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID;
const keyFile = process.env.GOOGLE_CLOUD_KEY_FILE;

if (!projectId || !keyFile) {
  throw new Error('Missing Google Cloud environment variables');
}

// Vertex AI setup
export const vertexAI = new EndpointServiceClient({
  projectId,
  keyFilename: keyFile,
});

// Document AI setup
export const documentAI = new DocumentProcessorServiceClient({
  projectId,
  keyFilename: keyFile,
});

// Dialogflow setup
export const dialogflowClient = new SessionsClient({
  projectId,
  keyFilename: keyFile,
});