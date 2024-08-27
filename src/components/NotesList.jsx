import { useContext } from "react";
import Note from "./Note";
import { NotesContext } from "../context/NotesContext";
import LoadingSpinner from "./LoadingSpinner";
import Masonry from "react-masonry-css";

export default function NotesList() {
  const { notes, isLoading } = useContext(NotesContext);

  const breakpointColumnsObj = {
    default: 4,
    840: 3,
    640: 2,
    425: 1,
  };

  const items = notes.map((note) => (
    <li key={note.id} className="list-none w-full">
      <Note note={note} initialTitle={note.title} initialText={note.text} />
    </li>
  ));

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : notes.length ? (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex w-full gap-4"
          columnClassName="flex flex-col gap-4 items-center"
        >
          {items}
        </Masonry>
      ) : (
        <p className="p-4 mr-auto ml-auto md:col-span-4 col-span-2">
          Start by adding a note!
        </p>
      )}
    </>
  );
}
