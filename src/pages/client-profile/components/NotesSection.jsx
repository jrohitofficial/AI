import React, { useState } from 'react';

const NotesSection = ({ notes: initialNotes = [] }) => {
  const defaultNotes = [
    { text: 'Requires LC for orders above Rs60k', author: 'Rajaesh K', date: 'Jan 20 2026' },
    { text: 'Requires LC for orders above Rs60k', author: 'Rajaesh K', date: 'Jan 20 2026' },
  ];

  const [notes, setNotes] = useState(initialNotes.length > 0 ? initialNotes : defaultNotes);
  const [isAdding, setIsAdding] = useState(false);
  const [newNoteText, setNewNoteText] = useState('');

  const handleAddNote = () => {
    if (newNoteText.trim()) {
      const newNote = {
        text: newNoteText,
        author: 'Current User',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };
      setNotes([...notes, newNote]);
      setNewNoteText('');
      setIsAdding(false);
    }
  };

  const handleCancel = () => {
    setNewNoteText('');
    setIsAdding(false);
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
        <h3 className="text-lg font-bold text-gray-900">Notes</h3>
      </div>
      <div className="space-y-2">
        {notes.map((note, idx) => (
          <div key={idx} className="bg-blue-50 rounded-lg p-3 border border-blue-200">
            <div className="text-sm font-medium text-gray-900">{note.text}</div>
            <div className="text-xs text-gray-500 mt-2">
              Added by <span className="font-semibold text-gray-700">{note.author}</span> · {note.date}
            </div>
          </div>
        ))}
      </div>
      
      {isAdding ? (
        <div className="mt-4 space-y-2">
          <textarea
            value={newNoteText}
            onChange={(e) => setNewNoteText(e.target.value)}
            placeholder="Enter your note..."
            className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
            rows="3"
            autoFocus
          />
          <div className="flex gap-2">
            <button
              onClick={handleAddNote}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save Note
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="mt-4 text-sm text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
        >
          + Add Note
        </button>
      )}
    </div>
  );
};

export default NotesSection;
