import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; //Import component
import { faPlus } from "@fortawesome/free-solid-svg-icons"; //Import icon
import { useContext } from "react";
import { NotesContext } from "../context/NotesContext";

export default function NoteAdd() {
  const { handleAddNote } = useContext(NotesContext);
  return (
    <section className="w-full flex justify-center items-center">
      <button onClick={handleAddNote} className="w-24 h-8 bg-orange-500 rounded-md">
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </section>
  );
}
