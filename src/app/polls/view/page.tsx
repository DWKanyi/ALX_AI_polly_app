"use client"

import { useEffect, useState } from 'react';
import { PollCard } from '@/components/ui/pollCard';
import { type Poll } from '@/types';
import withAuth from '@/app/auth/withAuth';

const ViewPollsPage = () => {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPolls = async () => {
      try {
        const res = await fetch('/api/polls', { cache: 'no-store' });
        if (!res.ok) throw new Error(`Failed to load polls (${res.status})`);
        const data = await res.json();
        setPolls(data);
      } catch (e: any) {
        setError(e?.message || 'Failed to load polls');
      } finally {
        setLoading(false);
      }
    };
    loadPolls();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading polls...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            All <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Polls</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore and participate in polls from our community
          </p>
        </div>

        {error && (
          <div className="text-center text-red-400 mb-6">{error}</div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {polls.map((poll) => (
            <PollCard key={poll.id} poll={poll} />
          ))}
        </div>

        {polls.length === 0 && !error && (
          <div className="text-center text-gray-300">
            <p>No polls available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default withAuth(ViewPollsPage);
