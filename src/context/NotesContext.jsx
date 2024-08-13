import { createContext, useState } from "react";
import testNotes from "../test-notes";

export const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([...testNotes]);

  const handleDeleteNote = (id) => {
    alert("Note will be deleted! Are you sure you want to continue?");
    setNotes((prev) => {
      return [...prev.filter((note) => note.id !== id)];
    });
  };

  const handleUpdateNote = (updatedNote, id) => {
    setNotes((prev) => {
      let idx = prev.findIndex((note) => note.id === id);
      if (idx >= 0) {
        const newNotes = [...prev];
        newNotes[idx] = { ...updatedNote };
        return newNotes;
      }
      return prev;
    });
  };

  return (
    <NotesContext.Provider
      value={{ notes, handleDeleteNote, handleUpdateNote }}
    >
      {children}
    </NotesContext.Provider>
  );
};
