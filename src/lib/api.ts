import { Poll } from '@/components/ui/pollCard';
import { createClient } from '@/lib/supabase';
import { SupabaseClient } from '@supabase/supabase-js';

// Create a single, memoized Supabase client instance
let supabase: SupabaseClient;

function getSupabaseClient() {
  if (!supabase) {
    supabase = createClient();
  }
  return supabase;
}

// Helper function to map Supabase data to our Poll type
const mapSupabaseDataToPoll = (data: any): Poll => {
  if (!data) return null;
  return {
    id: data.id,
    title: data.title,
    description: data.description,
    options: data.options || [],
    votes: data.votes || 0,
    category: data.category,
    createdAt: data.created_at,
    expiresAt: data.expires_at,
    isActive: data.is_active,
  };
};

export const fetchPolls = async (): Promise<Poll[]> => {
  const client = getSupabaseClient();
  const { data, error } = await client
    .from('polls')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Supabase API Error [fetchPolls]:', error.message);
    throw new Error(`Failed to fetch polls: ${error.message}`);
  }

  return data ? data.map(mapSupabaseDataToPoll) : [];
};

export const fetchPollById = async (id: string): Promise<Poll | null> => {
  const client = getSupabaseClient();
  const { data, error } = await client
    .from('polls')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    // It's common for .single() to fail if no row is found.
    // We'll log it but return null instead of throwing an error.
    console.warn(`Supabase API Warning [fetchPollById for id: ${id}]:`, error.message);
    return null;
  }

  return mapSupabaseDataToPoll(data);
};

export const createPoll = async (pollData: Omit<Poll, 'id' | 'votes' | 'createdAt' | 'isActive'>): Promise<Poll> => {
  const client = getSupabaseClient();
  const { data, error } = await client
    .from('polls')
    .insert([
      {
        title: pollData.title,
        description: pollData.description,
        options: pollData.options,
        category: pollData.category,
        expires_at: pollData.expiresAt,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error('Supabase API Error [createPoll]:', error.message);
    throw new Error(`Failed to create poll: ${error.message}`);
  }

  return mapSupabaseDataToPoll(data);
};
