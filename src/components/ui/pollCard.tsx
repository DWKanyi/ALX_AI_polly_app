"use client"

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Clock, BarChart3 } from 'lucide-react';
import Link from 'next/link';

export interface Poll {
  id: string;
  title: string;
  description: string;
  options: string[];
  votes: number;
  category: string;
  createdAt: string;
  expiresAt?: string;
  isActive: boolean;
}

interface PollCardProps {
  poll: Poll;
}

export const PollCard: React.FC<PollCardProps> = ({ poll }) => {
  const timeLeft = poll.expiresAt ? 
    new Date(poll.expiresAt).getTime() - new Date().getTime() : null;
  
  const formatTimeLeft = (ms: number) => {
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days} days left`;
    if (hours > 0) return `${hours} hours left`;
    return 'Ending soon';
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
            {poll.category}
          </Badge>
          {timeLeft && timeLeft > 0 && (
            <div className="flex items-center text-gray-300 text-sm">
              <Clock className="w-4 h-4 mr-1" />
              {formatTimeLeft(timeLeft)}
            </div>
          )}
        </div>
        <CardTitle className="text-white text-lg leading-tight">
          {poll.title}
        </CardTitle>
        <CardDescription className="text-gray-300">
          {poll.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {/* Poll options preview */}
          <div className="space-y-2">
            {poll.options.slice(0, 3).map((option, index) => (
              <div key={index} className="text-sm text-gray-300 bg-white/5 rounded px-3 py-2">
                • {option}
              </div>
            ))}
            {poll.options.length > 3 && (
              <div className="text-sm text-gray-400">
                +{poll.options.length - 3} more options
              </div>
            )}
          </div>
          
          {/* Stats and actions */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <div className="flex items-center text-gray-300">
              <Users className="w-4 h-4 mr-2" />
              <span className="font-semibold">{poll.votes.toLocaleString()}</span>
              <span className="ml-1">votes</span>
            </div>
            <div className="flex space-x-2">
              <Link href={`/polls/results/${poll.id}`}>
                <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  <BarChart3 className="w-4 h-4 mr-1" />
                  Results
                </Button>
              </Link>
              <Link href={`/polls/${poll.id}`}>
                <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-0">
                  Vote Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
