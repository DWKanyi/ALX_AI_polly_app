import React from 'react';
import Navbar from '../components/navbar';
import '../styles/globals.css';
import { AuthProvider } from './auth/context/AuthContext';

const Layout = ({ children }) => {
  return (
    <html lang="en" className="dark">
      <body>
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
};

export default Layout;