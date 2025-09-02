"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import withAuth from '@/app/auth/withAuth';

const CreatePollPage = () => {
  const [pollTitle, setPollTitle] = useState('');
  const [pollOptions, setPollOptions] = useState(['']);

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...pollOptions];
    newOptions[index] = value;
    setPollOptions(newOptions);
  };

  const addOption = () => {
    setPollOptions([...pollOptions, '']);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle poll creation logic here
    console.log('Poll Created:', { title: pollTitle, options: pollOptions });
  };

  return (
    <div>
      <h1>Create a New Poll</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Poll Title:
            <input
              type="text"
              value={pollTitle}
              onChange={(e) => setPollTitle(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <h2>Poll Options</h2>
          {pollOptions.map((option, index) => (
            <div key={index}>
              <label>
                Option {index + 1}:
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  required
                />
              </label>
            </div>
          ))}
          <Button onClick={addOption}>Add Option</Button>
        </div>
        <Button type="submit">Create Poll</Button>
      </form>
    </div>
  );
};

export default withAuth(CreatePollPage);