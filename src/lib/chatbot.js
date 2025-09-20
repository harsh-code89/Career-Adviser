import { dialogflowClient } from '@/lib/googleCloudClient';

export async function sendMessageToChatbot(sessionId, message) {
  const sessionPath = dialogflowClient.projectAgentSessionPath(
    'gemini-project',
    sessionId
  );

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode: 'en-US',
      },
    },
  };

  const [response] = await dialogflowClient.detectIntent(request);
  return response.queryResult;
}