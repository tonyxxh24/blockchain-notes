import React, { useState } from 'react';
import { notesContract } from '../utils/ethereum';
import { encryptNote } from '../utils/crypto';

function NoteEditor({ secretPhrase }) {
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const encryptedContent = encryptNote(content, secretPhrase);
    await notesContract.createNote(encryptedContent);
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your note here..."
      />
      <button type="submit">Save Note</button>
    </form>
  );
}

export default NoteEditor;
