import { supabase } from '@/lib/supabaseClient';
import { vertexAI } from '@/lib/googleCloudClient';

export async function getCareerPaths(userId) {
  // Fetch user profile from Supabase
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (profileError) throw profileError;

  // Use Vertex AI to generate career path suggestions
  const request = {
    endpoint: 'projects/gemini-project/locations/us/endpoints/career-paths',
    instances: [{
      goals: profile.goals,
      skills: profile.skills,
      education: profile.education,
    }],
  };

  const [response] = await vertexAI.predict(request);
  return response.predictions;
}