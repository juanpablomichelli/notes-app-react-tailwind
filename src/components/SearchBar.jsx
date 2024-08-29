import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; //Import component
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"; //Import icon
import { useEffect, useState } from "react";

export default function SearchBar({ setSearchValue }) {
  const [inputValue, setInputValue] = useState("");
  function handleChange(e) {
    setInputValue(e.target.value);
  }

  //Debouncing
  useEffect(() => {
    const setSearchTimer = setTimeout(() => {
      setSearchValue(inputValue);
    }, 100);

    return () => {
      clearTimeout(setSearchTimer);
    };
  }, [inputValue]);

  return (
    <div className="w-1/2 relative">
      <input
        type="text"
        placeholder="Search notes"
        className="p-2 w-full border-black border-2 rounded-md"
        onChange={handleChange}
        value={inputValue}
      ></input>
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        className="absolute top-1/2 right-4 translate-y-[-50%] "
      />
    </div>
  );
}
