import React from 'react';
import Link from 'next/link';

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link href="/auth/login">Login</Link>
                </li>
                <li>
                    <Link href="/auth/register">Register</Link>
                </li>
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