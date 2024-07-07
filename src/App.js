import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import NoteEditor from './components/NoteEditor';
import NoteList from './components/NoteList';
import { connectWallet } from './utils/ethereum';

function App() {
  const [address, setAddress] = useState(null);
  const [secretPhrase, setSecretPhrase] = useState('');

  useEffect(() => {
    // Check if user is already connected
    connectWallet().then(setAddress).catch(console.error);
  }, []);

  const handleLogin = async (phrase) => {
    const addr = await connectWallet();
    setAddress(addr);
    setSecretPhrase(phrase);
  };

  if (!address) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="App">
      <NoteEditor secretPhrase={secretPhrase} />
      <NoteList secretPhrase={secretPhrase} />
    </div>
  );
}

export default App;