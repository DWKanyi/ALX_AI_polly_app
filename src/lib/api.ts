import { Poll, PollOption } from '@/types';
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

// Helper function to map Supabase data (with nested poll_options) to our Poll type
const mapSupabaseDataToPoll = (data: any): Poll => {
  return {
    id: data.id,
    userId: data.user_id,
    title: data.title,
    description: data.description,
    isMultiple: data.is_multiple,
    expiresAt: data.expires_at,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
    options: Array.isArray(data.poll_options)
      ? data.poll_options.map((o: any) => ({
          id: o.id,
          pollId: o.poll_id,
          label: o.label,
          orderIndex: o.order_index,
        }))
      : undefined,
  };
};

export const fetchPolls = async (): Promise<Poll[]> => {
  const client = getSupabaseClient();
  const { data, error } = await client
    .from('polls')
    .select('id,user_id,title,description,is_multiple,expires_at,created_at,updated_at,poll_options(id,poll_id,label,order_index)')
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
    .select('id,user_id,title,description,is_multiple,expires_at,created_at,updated_at,poll_options(id,poll_id,label,order_index)')
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

export const createPoll = async (
  input: {
    title: string;
    description?: string | null;
    isMultiple?: boolean;
    expiresAt?: string | null;
    options: { label: string }[];
  }
): Promise<Poll> => {
  const client = getSupabaseClient();
  const { data: auth } = await client.auth.getUser();
  const userId = auth.user?.id;
  if (!userId) throw new Error('Not authenticated');

  const { data: poll, error: pollError } = await client
    .from('polls')
    .insert([
      {
        user_id: userId,
        title: input.title,
        description: input.description ?? null,
        is_multiple: input.isMultiple ?? false,
        expires_at: input.expiresAt ?? null,
      },
    ])
    .select('id,user_id,title,description,is_multiple,expires_at,created_at,updated_at')
    .single();

  if (pollError) {
    console.error('Supabase API Error [createPoll:poll]:', pollError.message);
    throw new Error(`Failed to create poll: ${pollError.message}`);
  }

  if (input.options?.length) {
    const optionsPayload = input.options.map((o, index) => ({
      poll_id: poll.id,
      label: o.label,
      order_index: index,
    }));
    const { error: optionsError } = await client
      .from('poll_options')
      .insert(optionsPayload);
    if (optionsError) {
      console.error('Supabase API Error [createPoll:options]:', optionsError.message);
      throw new Error(`Failed to create poll options: ${optionsError.message}`);
    }
  }

  const { data: final } = await client
    .from('polls')
    .select('id,user_id,title,description,is_multiple,expires_at,created_at,updated_at,poll_options(id,poll_id,label,order_index)')
    .eq('id', poll.id)
    .single();

  return mapSupabaseDataToPoll(final);
};
