import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; //Import component
import { faPlus } from "@fortawesome/free-solid-svg-icons"; //Import icon
import { useContext } from "react";
import { NotesContext } from "../context/NotesContext";

export default function NoteAdd() {
  const { handleAddNote } = useContext(NotesContext);
  return (
    <section className="w-full bg-orange-300 flex justify-center items-center">
      <button onClick={handleAddNote}>
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </section>
  );
}
