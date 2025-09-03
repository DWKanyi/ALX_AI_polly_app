import { Poll } from '@/components/ui/pollCard';
import { createClient } from '@/lib/supabase';

const supabase = createClient();

export const fetchPolls = async (): Promise<Poll[]> => {
  const { data, error } = await supabase
    .from('polls')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching polls:', error);
    throw new Error(error.message);
  }

  // The data from Supabase might not match the Poll type exactly.
  // We need to map it to ensure type safety.
  return data.map((poll: any) => ({
    id: poll.id,
    title: poll.title,
    description: poll.description,
    options: poll.options || [],
    votes: poll.votes || 0,
    category: poll.category,
    createdAt: poll.created_at,
    expiresAt: poll.expires_at,
    isActive: poll.is_active,
  }));
};

export const fetchPollById = async (id: string): Promise<Poll | null> => {
  const { data, error } = await supabase
    .from('polls')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(`Error fetching poll with id ${id}:`, error);
    return null;
  }
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

export const createPoll = async (pollData: Omit<Poll, 'id' | 'votes' | 'createdAt' | 'isActive'>): Promise<Poll> => {
  const { data, error } = await supabase
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
    console.error('Error creating poll:', error);
    throw new Error(error.message);
  }

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
