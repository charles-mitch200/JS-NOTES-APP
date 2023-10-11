// Get HTML elements to JavaScript
const btnElem = document.getElementById("btn");
const appElem = document.getElementById("container");

// Gets notes from local storage
const getNotes = () => {
  return JSON.parse(localStorage.getItem("note-app") || "[]");
};

// Updates the notes
const updateNote = (id, content) => {
  // Get the notes from local storage
  const notes = getNotes();
  const target = notes.filter((note) => note.id == id)[0];
  //   Update content and save
  target.content = content;
  saveNote(notes);
};

// Deletes a note
const deleteNote = (id, element) => {
  // Get the notes from local storage
  const notes = getNotes().filter((note) => note.id !== id);
  saveNote(notes);
  //   Remove the element from the DOM
  appElem.removeChild(element);
};

const saveNote = (notes) => {
  localStorage.setItem("note-app", JSON.stringify(notes));
};

// Function to create a note
const createNoteElem = (id, content) => {
  // Create a new textarea and update the class and placeholder
  const element = document.createElement("textarea");
  element.classList.add("note");
  element.placeholder = "Empty note";
  element.value = content;

  element.addEventListener("dblclick", () => {
    const warning = confirm("Do you want to delete this note?");
    if (warning) {
      deleteNote(id, element);
    }
  });

  //   Update note in the local storage every time a user inputs something
  element.addEventListener("input", () => {
    updateNote(id, element.value);
  });

  return element;
};

// Function to add a note
const addNote = () => {
  const notes = getNotes();
  const noteObj = {
    id: Math.floor(Math.random() * 100000),
    content: "",
  };
  const noteElem = createNoteElem(noteObj.id, noteObj.content);
  appElem.insertBefore(noteElem, btnElem);

  notes.push(noteObj);

  //   Save note to local storage
  saveNote(notes);
};

btnElem.addEventListener("click", addNote);

// Render all notes in the local storage on the page
getNotes().forEach((note) => {
  const noteElem = createNoteElem(note.id, note.content);
  appElem.insertBefore(noteElem, btnElem);
});
