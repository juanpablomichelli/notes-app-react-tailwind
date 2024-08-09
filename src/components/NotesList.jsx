import Note from "./Note";

export default function NotesList({ notes }) {
  return (
    <ul>
      {notes.map((note) => (
        <li key={note.id}>
          <Note initialTitle={note.title} text={note.text} />
        </li>
      ))}
    </ul>
  );
}
