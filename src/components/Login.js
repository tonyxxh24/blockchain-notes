import React, { useState } from 'react';

function Login({ onLogin }) {
  const [secretPhrase, setSecretPhrase] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(secretPhrase);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="password"
        value={secretPhrase}
        onChange={(e) => setSecretPhrase(e.target.value)}
        placeholder="Enter your secret phrase"
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;