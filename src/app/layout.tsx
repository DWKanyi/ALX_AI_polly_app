import React from 'react';
import Navbar from '../components/navbar';
import '../styles/globals.css';
import { AuthProvider } from './auth/context/AuthContext';
import { Toaster } from '@/components/ui/toaster';

const Layout = ({ children }) => {
  return (
    <html lang="en" className="dark">
      <body>
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
};

export default Layout;