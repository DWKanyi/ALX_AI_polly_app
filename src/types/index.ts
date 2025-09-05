export interface User {
  id: string;
  email: string;
}

export interface PollOption {
  id: string;
  pollId: string;
  label: string;
  orderIndex: number;
}

export interface Poll {
  id: string;
  userId: string;
  title: string;
  description?: string | null;
  isMultiple: boolean;
  expiresAt?: string | null;
  createdAt: string;
  updatedAt: string;
  options?: PollOption[];
}

export interface PollWithCounts extends Poll {
  totalVotes?: number;
  optionCounts?: { optionId: string; count: number }[];
}