"use client"

import { useEffect, useState } from 'react';
import { PollCard, Poll } from '@/components/ui/pollCard';
import { fetchPolls } from '@/lib/api';

const ViewPollsPage = () => {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPolls = async () => {
      try {
        const fetchedPolls = await fetchPolls();
        setPolls(fetchedPolls);
      } catch (error) {
        console.error('Error fetching polls:', error);
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
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {polls.map((poll) => (
            <PollCard key={poll.id} poll={poll} />
          ))}
        </div>
        
        {polls.length === 0 && (
          <div className="text-center text-gray-300">
            <p>No polls available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewPollsPage;
