import { useEffect, useState } from 'react';
import { PollCard } from '@/components/ui/pollCard'; // Assuming you have a PollCard component
import { fetchPolls } from '@/lib/api'; // Assuming you have an API utility for fetching polls

const ViewPollsPage = () => {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPolls = async () => {
      try {
        const data = await fetchPolls();
        setPolls(data);
      } catch (error) {
        console.error('Failed to fetch polls:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPolls();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>View Polls</h1>
      {polls.length === 0 ? (
        <p>No polls available.</p>
      ) : (
        <div>
          {polls.map((poll) => (
            <PollCard key={poll.id} poll={poll} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewPollsPage;