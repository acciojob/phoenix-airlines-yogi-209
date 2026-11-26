import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page" style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Welcome to Phoenix Airlines</h1>
      <p>Book domestic and international flights seamlessly.</p>
      <button onClick={() => navigate('/flight-search')}>
        Search Flights
      </button>
    </div>
  );
}
