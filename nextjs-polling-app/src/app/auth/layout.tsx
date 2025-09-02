import React from 'react';

const AuthLayout = ({ children }) => {
    return (
        <div className="auth-layout">
            <header>
                <h1>Welcome to the Polling App</h1>
            </header>
            <main>{children}</main>
            <footer>
                <p>&copy; {new Date().getFullYear()} Polling App</p>
            </footer>
        </div>
    );
};

export default AuthLayout;