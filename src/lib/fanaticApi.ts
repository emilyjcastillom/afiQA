import { supabase } from './supabaseClient';

export async function getRiddles() {
  const { data, error } = await supabase.functions.invoke('fanatic/todays-riddles', {
    method: 'GET',
  });

  if (error) {
    console.error('Error fetching today\'s riddles:', error);
    throw error;
  }

  return data;
}
