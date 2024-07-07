import React, { useState, useEffect } from 'react';
import { notesContract } from '../utils/ethereum';
import { decryptNote } from '../utils/crypto';

function NoteList({ secretPhrase }) {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    const count = await notesContract.getNoteCount();
    const loadedNotes = [];
    for (let i = 0; i < count; i++) {
      const [content, timestamp] = await notesContract.getNote(i);
      const decryptedContent = decryptNote(content, secretPhrase);
      loadedNotes.push({ content: decryptedContent, timestamp });
    }
    setNotes(loadedNotes);
  };

  return (
    <div>
      <h2>Your Notes</h2>
      <ul>
        {notes.map((note, index) => (
          <li key={index}>
            <p>{note.content}</p>
            <small>{new Date(note.timestamp * 1000).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NoteList;