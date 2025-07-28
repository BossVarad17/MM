import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const headerStyle: React.CSSProperties = {
    background: '#1a1a1a',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #333',
  };

  const navStyle: React.CSSProperties = {
    display: 'flex',
    gap: '1rem',
  };

  const linkStyle: React.CSSProperties = {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1rem',
  };
  
  return (
    <header style={headerStyle}>
      <h1 style={{ color: '#007bff', margin: 0 }}>MechaMind+</h1>
      <nav style={navStyle}>
        <Link to="/" style={linkStyle}>Dashboard</Link>
        <Link to="/chat" style={linkStyle}>AI Chat</Link>
      </nav>
    </header>
  );
};

export default Header;
