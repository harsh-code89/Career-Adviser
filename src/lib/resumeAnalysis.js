import { documentAI, vertexAI } from '@/lib/googleCloudClient';

export async function parseResume(fileContent) {
  const request = {
    name: 'projects/gemini-project/locations/us/processors/resume-parser',
    rawDocument: {
      content: fileContent,
      mimeType: 'application/pdf',
    },
  };

  const [response] = await documentAI.processDocument(request);
  return response.document;
}

export async function analyzeResume(resumeText) {
  const request = {
    endpoint: 'projects/gemini-project/locations/us/endpoints/resume-analysis',
    instances: [{ content: resumeText }],
  };

  const [response] = await vertexAI.predict(request);
  return response.predictions;
}