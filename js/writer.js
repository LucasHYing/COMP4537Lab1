document.addEventListener('DOMContentLoaded', function() {
    const notesContainer = document.getElementById('notesContainer');
    const addButton = document.getElementById('addNote');
    const lastSavedTime = document.getElementById('lastSavedTime');
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
  
    function saveNotes() {
      localStorage.setItem('notes', JSON.stringify(notes));
      lastSavedTime.textContent = `stored at: ${new Date().toLocaleTimeString()}`;
    }
  
    function addNewNote() {
      const note = { content: '', id: Date.now() };
      notes.push(note);
      renderNotes();
      saveNotes();
    }
  
    function removeNote(noteId) {
      notes = notes.filter(note => note.id !== noteId);
      renderNotes();
      saveNotes();
    }
  
    function noteContentChanged(id, content) {
      const note = notes.find(note => note.id === id);
      if (note) {
        note.content = content;
        saveNotes();
      }
    }
  
    function renderNotes() {
      notesContainer.innerHTML = '';
      notes.forEach(note => {
        const noteElement = document.createElement('div');
        const textArea = document.createElement('textarea');
        const removeButton = document.createElement('button');
  
        textArea.value = note.content;
        textArea.addEventListener('input', (e) => noteContentChanged(note.id, e.target.value));
  
        removeButton.textContent = 'remove';
        removeButton.addEventListener('click', () => removeNote(note.id));
  
        noteElement.appendChild(textArea);
        noteElement.appendChild(removeButton);
        notesContainer.appendChild(noteElement);
      });
    }
  
    addButton.addEventListener('click', addNewNote);
    renderNotes();
  });
  