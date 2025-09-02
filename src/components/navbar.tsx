"use client"

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/auth/context/AuthContext';
import { Button } from './ui/button';

const Navbar = () => {
  const { session, signOut } = useAuth();

  return (
    <nav>
      <ul>
        {session ? (
          <>
            <li>
              <p>{session.user.email}</p>
            </li>
            <li>
              <Button onClick={signOut}>Sign Out</Button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/auth/login">Login</Link>
            </li>
            <li>
              <Link href="/auth/register">Register</Link>
            </li>
          </>
        )}
        <li>
          <Link href="/polls/create">Create Poll</Link>
        </li>
        <li>
          <Link href="/polls/view">View Polls</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;