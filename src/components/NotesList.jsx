import { useContext } from "react";
import Note from "./Note";
import { NotesContext } from "../context/NotesContext";

export default function NotesList() {
  const { notes } = useContext(NotesContext);

  return (
    <ul>
      {notes.map((note) => (
        <li key={note.id}>
          <Note note={note} initialTitle={note.title} initialText={note.text} />
        </li>
      ))}
    </ul>
  );
}
