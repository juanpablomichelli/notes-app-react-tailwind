import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; //Import component
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"; //Import icon

export default function SearchBar() {
  function searchBarFunc(){
    //steps

    /* 
    1 - User enters value
    2 - Input listens for value change
      2.1 - will it listen for note title, text or both? 
    3 - Results are revealed in real-time
    
    
    */
    console.log("search-bar")
  }
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
