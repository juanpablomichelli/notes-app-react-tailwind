import { createContext, useState } from "react";
import testNotes from "../test-notes";

export const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([...testNotes]);

  const handleAddNote = () => {
    // This can be a note class with a constructor
    let id = Math.random() * 1000;
    let newNote = {
      id: id,
      title: "Add a title",
      text: "Add your text here!",
      pinned: false,
      background: "",
      imgSrc: undefined,
    };

    setNotes((prev) => {
      return [newNote, ...prev];
    });
  };
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
      value={{ notes, handleDeleteNote, handleUpdateNote, handleAddNote }}
    >
      {children}
    </NotesContext.Provider>
  );
};
