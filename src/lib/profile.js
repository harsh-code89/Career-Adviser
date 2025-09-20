import { supabase } from '@/lib/supabaseClient';

export async function createUserProfile(userId, profileData) {
  const { data, error } = await supabase
    .from('profiles')
    .insert([{ user_id: userId, ...profileData }]);

  if (error) throw error;
  return data;
}

export async function getUserProfile(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) throw error;
  return data;
}

export async function updateUserProfile(userId, profileData) {
  const { data, error } = await supabase
    .from('profiles')
    .update(profileData)
    .eq('user_id', userId);

  if (error) throw error;
  return data;
}