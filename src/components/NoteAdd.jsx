import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; //Import component
import { faPlus } from "@fortawesome/free-solid-svg-icons"; //Import icon

export default function NoteAdd() {
  return (
    <section className="w-full bg-orange-300 flex justify-center items-center">
      <button>
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </section>
  );
}
