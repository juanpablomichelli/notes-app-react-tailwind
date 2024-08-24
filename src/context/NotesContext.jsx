import { createContext, useState } from "react";
import testNotes from "../test-notes";

export const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([...testNotes]);

  const getIndex = (array, id) => {
    let idx = array.findIndex((note) => note.id === id);
    return idx;
  };

  const handleAddNote = () => {
    // This can be a note class with a constructor
    let id = Math.random() * 1000;
    let newNote = {
      id: id,
      title: "",
      text: "Add your text here!",
      pinned: false,
      background: "",
      imgSrc: undefined,
      //this needs to be set to false once the note is added because if we persist them, it will get autofocused when we refresh
      isNewNote: true,
    };

    setNotes((prev) => {
      return [newNote, ...prev];
    });
  };

  const handleNewlyAddedNote = () => {
    if (notes.length > 0) {
      const updatedNotes = notes.map((note) => {
        return note.isNewNote ? { ...note, isNewNote: false } : note;
      });
      setNotes(updatedNotes);
    }
  };
  const handleDeleteNote = (id) => {
    alert("Note will be deleted! Are you sure you want to continue?");
    setNotes((prev) => {
      return [...prev.filter((note) => note.id !== id)];
    });
  };

  const handleUpdateNote = (updatedNote, id) => {
    setNotes((prev) => {
      let idx = getIndex(prev, id);
      if (idx >= 0) {
        const newNotes = [...prev];
        newNotes[idx] = { ...updatedNote };
        return newNotes;
      }
      return prev;
    });
  };

  const handleTogglePin = (id) => {
    setNotes((prev) => {
      //search idx of clicked note
      let idx = getIndex(prev, id);
      if (idx >= 0) {
        //toggle 'pinned' property
        let updatedNote = { ...prev[idx], pinned: !prev[idx].pinned };
        let newNotes = [...prev];
        newNotes.splice(idx, 1);

        //if pinned, add it to the top of the array | else add it as the last element
        if (updatedNote.pinned) newNotes.unshift(updatedNote);
        else newNotes.push(updatedNote);

        return [...newNotes];
      }
      return prev;
    });
  };

  const handleFocusOut = (id) => {
    if (id) {
      setNotes((prev) => {
        let newNotes = [...prev];

        //get note
        let idx = getIndex(prev, id);

        // is first item in array & there are 1 or more pinned notes
        const isPinnedNotes =
          prev.filter((note) => note.pinned !== false).length > 0;

        if (idx === 0 && isPinnedNotes) {
          //then send the note after the last pinned note
          const lastIdx = prev.findLastIndex((note) => note.pinned === true);
          const note = newNotes.shift();
          newNotes.splice(lastIdx, 0, note);
          return newNotes;
        } else return prev;
      });
    }
  };

  const ctxValue = {
    notes,
    handleDeleteNote,
    handleUpdateNote,
    handleAddNote,
    handleNewlyAddedNote,
    handleTogglePin,
    handleFocusOut,
  };

  return (
    <NotesContext.Provider value={ctxValue}>{children}</NotesContext.Provider>
  );
};
