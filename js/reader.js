document.addEventListener('DOMContentLoaded', function() {
    const notesDisplay = document.getElementById('notesDisplay');
    const lastRetrievedTime = document.getElementById('lastRetrievedTime');
  
    function updateNotesDisplay() {
      notesDisplay.innerHTML = '';
      const notes = JSON.parse(localStorage.getItem('notes')) || [];
      notes.forEach(note => {
        const noteElement = document.createElement('div');
        noteElement.textContent = note.content;
        noteElement.classList.add('note');
        notesDisplay.appendChild(noteElement);
      });
      lastRetrievedTime.textContent = `updated at: ${new Date().toLocaleTimeString()}`;
    }
  
    setInterval(updateNotesDisplay, 2000);
  });
  