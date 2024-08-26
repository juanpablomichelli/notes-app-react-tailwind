import { useContext } from "react";
import Note from "./Note";
import { NotesContext } from "../context/NotesContext";
import LoadingSpinner from "./LoadingSpinner";

export default function NotesList() {
  const { notes, isLoading } = useContext(NotesContext);

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <ul className="grid md:grid-cols-4 grid-cols-2 gap-4 max-w-full">
          {notes.length ? (
            notes.map((note) => (
              <li key={note.id}>
                <Note
                  note={note}
                  initialTitle={note.title}
                  initialText={note.text}
                />
              </li>
            ))
          ) : (
            <p className="p-4 mr-auto ml-auto md:col-span-4 col-span-2">
              Start by adding a note!
            </p>
          )}
        </ul>
      )}
    </>
  );
}
