export interface User {
  id: string;
  username: string;
  email: string;
}

export interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  createdAt: Date;
  createdBy: User;
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}