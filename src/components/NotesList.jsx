import { useContext } from "react";
import Note from "./Note";
import { NotesContext } from "../context/NotesContext";

export default function NotesList() {
  const { notes } = useContext(NotesContext);

  return (
    <ul className="grid md:grid-cols-4 grid-cols-2 gap-4 bg-yellow-400 max-w-full">
      {notes.map((note) => (
        <li key={note.id}>
          <Note note={note} initialTitle={note.title} initialText={note.text} />
        </li>
      ))}
    </ul>
  );
}
