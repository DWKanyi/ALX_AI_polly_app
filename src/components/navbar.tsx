"use client"

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/auth/context/AuthContext';
import { Button } from './ui/button';
import { Vote } from 'lucide-react';

const Navbar = () => {
  const { session, signOut } = useAuth();

  return (
    <nav className="flex items-center justify-between p-4 border-b border-border">
      <Link href="/" className="flex items-center gap-2">
        <Vote className="w-8 h-8 text-primary" />
        <span className="text-xl font-bold">ALX Polly</span>
      </Link>
      <div className="flex items-center gap-4">
        <Link href="/polls/create">
          <Button variant="ghost">Create Poll</Button>
        </Link>
        <Link href="/polls/view">
          <Button variant="ghost">View Polls</Button>
        </Link>
        {session ? (
          <div className="flex items-center gap-4">
            <p className="text-sm text-muted-foreground">{session.user.email}</p>
            <Button onClick={signOut} variant="secondary">Sign Out</Button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link href="/auth/login">
              <Button>Login</Button>
            </Link>
            <Link href="/auth/register">
              <Button variant="secondary">Register</Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;