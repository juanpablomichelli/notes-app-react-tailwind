import NoteContextMenu from "./NoteContextMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; //Import component
import {
  faThumbtack,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons"; //Import icon
import { useEffect, useRef, useState } from "react";

export default function Note({ initialTitle, text }) {
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const [enteredValue, setEnteredValue] = useState(initialTitle);

  const inputRef = useRef(null);
  const titleRef = useRef(null);

  // When clicking outside input, isEditing must be set to false
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        console.log("Input exists!");
        handleStopEditing();
      }
    };
    document.addEventListener("mouseup", handleClickOutside);
    document.addEventListener("touchend", handleClickOutside);

    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
      document.removeEventListener("touchend", handleClickOutside);
    };
  }, [handleStopEditing]);

  function handleStartTitleEdit() {
    setIsEditing(true);
  }
  function handleStopEditing(e = null) {
    if (e) {
      if (e.key === "Enter" || e.KeyCode === 13) {
        setTitle(enteredValue);
        setIsEditing(false);
      }
    } else {
      setTitle(enteredValue);
      setIsEditing(false);
    }
  }
  function handleInputChange(e) {
    setEnteredValue(e.target.value);
  }
  return (
    <article className="relative border-2 border-black max-w-48">
      <header>
        {!isEditing ? (
          <h2
            ref={titleRef}
            onClick={handleStartTitleEdit}
            className={`text-xl ${isEditing ? "hidden" : "block"}`}
          >
            {title}
          </h2>
        ) : (
          <input
            ref={inputRef}
            onKeyUp={(e) => {
              handleStopEditing(e);
            }}
            onChange={(e) => handleInputChange(e)}
            type="text"
            value={enteredValue}
            className={`${isEditing ? "block" : "hidden"}`}
          />
        )}

        <nav className="w-full bg-orange-200 flex gap-4">
          <button>
            <FontAwesomeIcon icon={faThumbtack} />
          </button>
          <button
            onClick={() => {
              setIsContextMenuOpen((prev) => !prev);
            }}
          >
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </button>
        </nav>
      </header>

      <p>{text}</p>

      <NoteContextMenu isOpen={isContextMenuOpen} />
    </article>
  );
}
