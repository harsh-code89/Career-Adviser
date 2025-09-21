// This file handles Google Cloud AI integrations.
// Ensure the following environment variables are set in your deployment environment (e.g., Vercel):
// GOOGLE_CLOUD_PROJECT_ID: Your Google Cloud project ID.
// GOOGLE_CLOUD_KEY_FILE: The base64-encoded service account key JSON file.

import { EndpointServiceClient } from '@google-cloud/aiplatform';
import { DocumentProcessorServiceClient } from '@google-cloud/documentai';

const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID;
const keyFile = process.env.GOOGLE_CLOUD_KEY_FILE;

if (!projectId || !keyFile) {
  console.warn('Google Cloud environment variables not found. AI features will not work.');
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
