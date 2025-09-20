import { supabase } from '@/lib/supabaseClient';

export async function uploadResume(userId, file) {
  const fileName = `${userId}/${file.name}`;

  const { data, error } = await supabase.storage
    .from('resumes')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: true,
    });

  if (error) throw error;
  return data;
}

export async function getResumeUrl(userId, fileName) {
  const { data, error } = await supabase.storage
    .from('resumes')
    .getPublicUrl(`${userId}/${fileName}`);

  if (error) throw error;
  return data.publicUrl;
}