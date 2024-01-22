//I disclose the usage of chatGPT for this file
// Class representing each note
class Note {
  constructor(id, content) {
    this.id = id;
    this.content = content;
  }

  // Creates the HTML elements for each note
  createElement() {
    // Create the main note element
    const noteElement = document.createElement('div');
    noteElement.id = `note-${this.id}`;

    // Create the textarea for the note content
    const textArea = document.createElement('textarea');
    textArea.value = this.content;

    // Event listener to update content and save on input
    textArea.addEventListener('input', () => {
      this.content = textArea.value;
      this.save();
    });

    // Create a remove button for the note
    const removeButton = document.createElement('button');
    removeButton.textContent = 'remove';

    // Event listener to handle note removal
    removeButton.addEventListener('click', () => {
      this.remove();
    });

    // Append elements to noteElement
    noteElement.appendChild(textArea);
    noteElement.appendChild(removeButton);

    return noteElement;
  }

  // Save the current state of the note to LocalStorage
  save() {
    // Retrieve existing notes or initialize an empty array
    const notes = JSON.parse(localStorage.getItem('notes')) || [];

    // Update the note if it exists, otherwise add it
    const noteIndex = notes.findIndex(note => note.id === this.id);
    if (noteIndex >= 0) {
      notes[noteIndex].content = this.content;
    } else {
      notes.push({ id: this.id, content: this.content });
    }

    // Save the updated notes array to LocalStorage
    localStorage.setItem('notes', JSON.stringify(notes));

    // Update the last saved time display
    document.getElementById('lastSavedTime').textContent = `stored at: ${new Date().toLocaleTimeString()}`;
  }

  // Remove the note from LocalStorage and the DOM
  remove() {
    // Retrieve existing notes
    const notes = JSON.parse(localStorage.getItem('notes')) || [];

    // Filter out the current note
    const newNotes = notes.filter(note => note.id !== this.id);

    // Save the updated array to LocalStorage
    localStorage.setItem('notes', JSON.stringify(newNotes));

    // Remove the note element from the DOM
    document.getElementById(`note-${this.id}`).remove();
  }
}

// Class to manage note creation and rendering
class NoteManager {
  constructor(container) {
    this.container = container;
    this.loadNotes();
  }

  // Load and display existing notes from LocalStorage
  loadNotes() {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.forEach(noteData => {
      const note = new Note(noteData.id, noteData.content);
      this.container.appendChild(note.createElement());
    });
  }

  // Add a new note
  addNote() {
    const newNote = new Note(Date.now(), '');
    this.container.appendChild(newNote.createElement());
    newNote.save(); // Save the new note to LocalStorage
  }
}

// Initialization code executed after DOM content is loaded
document.addEventListener('DOMContentLoaded', function() {
  const notesContainer = document.getElementById('notesContainer');
  const addButton = document.getElementById('addNote');
  const noteManager = new NoteManager(notesContainer);

  // Event listener for the Add button
  addButton.addEventListener('click', () => noteManager.addNote());
});
