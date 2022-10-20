import React from 'react';
import { Link } from 'react-router-dom';

const First = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h2>
        You Should <Link to="/login">Login</Link> To Continue
      </h2>
    </div>
  );
};

export default First;
