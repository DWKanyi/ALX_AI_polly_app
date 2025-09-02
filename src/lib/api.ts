import { Poll } from '@/components/ui/pollCard';

// Mock data for development
const mockPolls: Poll[] = [
  {
    id: '1',
    title: 'What\'s your favorite programming language in 2024?',
    description: 'Help us understand the current trends in software development',
    options: ['JavaScript', 'Python', 'TypeScript', 'Rust', 'Go', 'Java'],
    votes: 1247,
    category: 'Technology',
    createdAt: '2024-01-15T10:00:00Z',
    expiresAt: '2024-12-31T23:59:59Z',
    isActive: true
  },
  {
    id: '2',
    title: 'Best remote work setup for productivity?',
    description: 'Share your insights on remote work environments',
    options: ['Home office', 'Co-working space', 'Coffee shop', 'Library'],
    votes: 892,
    category: 'Lifestyle',
    createdAt: '2024-01-10T14:30:00Z',
    expiresAt: '2024-12-15T23:59:59Z',
    isActive: true
  },
  {
    id: '3',
    title: 'Most anticipated movie release this year?',
    description: 'Vote for the movie you\'re most excited to watch',
    options: ['Dune: Part Two', 'Avengers: Secret Wars', 'The Batman 2', 'Spider-Man 4'],
    votes: 2156,
    category: 'Entertainment',
    createdAt: '2024-01-05T09:15:00Z',
    expiresAt: '2024-11-30T23:59:59Z',
    isActive: true
  },
  {
    id: '4',
    title: 'Preferred way to learn new skills?',
    description: 'How do you usually acquire new knowledge and skills?',
    options: ['Online courses', 'Books', 'YouTube tutorials', 'Hands-on practice', 'Bootcamps'],
    votes: 1543,
    category: 'Education',
    createdAt: '2024-01-20T16:45:00Z',
    expiresAt: '2024-12-20T23:59:59Z',
    isActive: true
  }
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchPolls = async (): Promise<Poll[]> => {
  // Simulate network delay
  await delay(800);
  return mockPolls;
};

export const fetchPollById = async (id: string): Promise<Poll | null> => {
  await delay(500);
  return mockPolls.find(poll => poll.id === id) || null;
};

export const createPoll = async (pollData: Omit<Poll, 'id' | 'votes' | 'createdAt'>): Promise<Poll> => {
  await delay(1000);
  const newPoll: Poll = {
    ...pollData,
    id: Math.random().toString(36).substr(2, 9),
    votes: 0,
    createdAt: new Date().toISOString(),
  };
  mockPolls.push(newPoll);
  return newPoll;
};
