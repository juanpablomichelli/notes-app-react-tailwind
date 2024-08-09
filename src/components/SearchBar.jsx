import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; //Import component
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"; //Import icon

export default function SearchBar() {
  return (
    <div className="w-1/2 relative bg-orange-400">
      <input
        type="text"
        placeholder="Search notes"
        className="p-2 w-full border-black border-2 rounded-md"
      ></input>
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        className="absolute top-1/2 right-4 translate-y-[-50%] "
      />
    </div>
  );
}
