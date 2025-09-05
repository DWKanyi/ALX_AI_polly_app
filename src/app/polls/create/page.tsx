"use client"

import withAuth from '@/app/auth/withAuth';
import CreatePollForm from '@/components/forms/CreatePollForm';

const CreatePollPage = () => {
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Create a New Poll</h1>
      <CreatePollForm />
    </div>
  );
};

export default withAuth(CreatePollPage);