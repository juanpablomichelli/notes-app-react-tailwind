import { useContext } from "react";
import Note from "./Note";
import { NotesContext } from "../context/NotesContext";

export default function NotesList() {
  const { notes } = useContext(NotesContext);
  return (
    <ul>
      {notes.map((note) => (
        <li key={note.id}>
          <Note
            initialTitle={note.title}
            initialText={note.text}
            id={note.id}
          />
        </li>
      ))}
    </ul>
  );
}
