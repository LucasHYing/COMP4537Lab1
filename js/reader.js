// Class responsible for reading and displaying notes
class NoteReader {
  constructor(displayElement, timestampElement) {
    // The element where notes will be displayed
    this.displayElement = displayElement;

    // The element where the last update time will be shown
    this.timestampElement = timestampElement;

    // Interval for updating notes (in milliseconds)
    this.updateInterval = 2000;

    // Start the automatic update process
    this.startAutoUpdate();
  }

  // Updates the display with notes from LocalStorage
  updateNotesDisplay() {
    // Clear current display
    this.displayElement.innerHTML = '';

    // Retrieve notes from LocalStorage, or set to empty array if none exist
    const notes = JSON.parse(localStorage.getItem('notes')) || [];

    // Create and append elements for each note
    notes.forEach(note => {
      const noteElement = document.createElement('div');
      noteElement.textContent = note.content;
      noteElement.classList.add('note'); // Add CSS class for styling
      this.displayElement.appendChild(noteElement);
    });

    // Update the timestamp of the last retrieval
    this.timestampElement.textContent = `updated at: ${new Date().toLocaleTimeString()}`;
  }

  // Starts the auto-update process to refresh notes display periodically
  startAutoUpdate() {
    // Perform initial update
    this.updateNotesDisplay();

    // Set interval to update display every 'updateInterval' milliseconds
    setInterval(() => this.updateNotesDisplay(), this.updateInterval);
  }
}

// When the DOM content is fully loaded, initialize NoteReader
document.addEventListener('DOMContentLoaded', function() {
  // Get the elements for displaying notes and the timestamp
  const notesDisplay = document.getElementById('notesDisplay');
  const lastRetrievedTime = document.getElementById('lastRetrievedTime');

  // Create a new NoteReader instance with the specified elements
  new NoteReader(notesDisplay, lastRetrievedTime);
});
