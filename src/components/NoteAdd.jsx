import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; //Import component
import { faPlus } from "@fortawesome/free-solid-svg-icons"; //Import icon
import { useContext } from "react";
import { NotesContext } from "../context/NotesContext";

export default function NoteAdd() {
  const { handleAddNote } = useContext(NotesContext);
  return (
    <section className="w-full flex justify-center items-center bg-orange-100 fixed bottom-0 left-0 p-4">
      <button
        onClick={handleAddNote}
        className="w-24 h-8 bg-orange-300 rounded-md border-black border-2"
      >
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </section>
  );
}
