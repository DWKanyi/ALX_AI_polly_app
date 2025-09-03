import React from 'react';
import Navbar from '../components/navbar';
import '../styles/globals.css';

const Layout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
};

export default Layout;