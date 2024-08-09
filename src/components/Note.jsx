import NoteContextMenu from "./NoteContextMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; //Import component
import {
  faThumbtack,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons"; //Import icon
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { NotesContext } from "../context/NotesContext";

const INITIAL_EDIT_VALUE = { title: false, text: false };

export default function Note({ initialTitle, initialText, id }) {
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(INITIAL_EDIT_VALUE);
  const [title, setTitle] = useState(initialTitle);
  const [text, setText] = useState(initialText);
  const [enteredTitle, setEnteredTitle] = useState(initialTitle);
  const [enteredText, setEnteredText] = useState(initialText);
  const { handleNoteDelete } = useContext(NotesContext);

  const inputTitleRef = useRef(null);
  const inputTextRef = useRef(null);

  const handleStopEditing = useCallback(
    (e = null) => {
      if (e) {
        if (e.key === "Enter") {
          isEditing.title && setTitle(enteredTitle);
          isEditing.text && setText(enteredText);
          setIsEditing(INITIAL_EDIT_VALUE);
        }
      } else {
        isEditing.title && setTitle(enteredTitle);
        isEditing.text && setText(enteredText);
        setIsEditing(INITIAL_EDIT_VALUE);
      }
    },
    [enteredTitle, enteredText, isEditing]
  );

  const handleClickOutside = useCallback(
    (e) => {
      if (
        (inputTitleRef.current && !inputTitleRef.current.contains(e.target)) ||
        (inputTextRef.current && !inputTextRef.current.contains(e.target))
      ) {
        handleStopEditing();
      }
    },
    [handleStopEditing]
  );

  const handleStartEdit = useCallback(
    (element) => {
      setIsEditing((prev) => {
        if (element === "title") return { ...prev, title: true };
        if (element === "text") return { ...prev, text: true };
      });
    },
    [setIsEditing]
  );

  // When clicking outside input, isEditing must be set to false
  // 📄 Handle Outside Clicks React https://dev.to/rashed_iqbal/how-to-handle-outside-clicks-in-react-with-typescript-4lmc
  useEffect(() => {
    document.addEventListener("mouseup", handleClickOutside);
    document.addEventListener("touchend", handleClickOutside);

    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
      document.removeEventListener("touchend", handleClickOutside);
    };
  }, [handleClickOutside]);

  function handleInputChange(e) {
    const { name, value } = e.target;
    if (name === "title") setEnteredTitle(value);
    if (name === "text") setEnteredText(value);
  }

  return (
    <article className="relative border-2 border-black max-w-48">
      <header>
        {!isEditing.title ? (
          <h2
            onClick={() => handleStartEdit("title")}
            className={`text-xl ${isEditing.title ? "hidden" : "block"}`}
          >
            {title}
          </h2>
        ) : (
          <input
            ref={inputTitleRef}
            onKeyUp={(e) => {
              handleStopEditing(e);
            }}
            onChange={(e) => handleInputChange(e)}
            type="text"
            name="title"
            value={enteredTitle}
            className={`${isEditing ? "block" : "hidden"}`}
          />
        )}

        <nav className="w-full bg-orange-200 flex gap-4">
          <button aria-label="Pin note">
            <FontAwesomeIcon icon={faThumbtack} />
          </button>
          <button
            aria-label="Open options menu"
            onClick={() => {
              setIsContextMenuOpen((prev) => !prev);
            }}
          >
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </button>
        </nav>
      </header>

      {!isEditing.text ? (
        <p onClick={() => handleStartEdit("text")}>{text}</p>
      ) : (
        <input
          ref={inputTextRef}
          onKeyUp={(e) => {
            handleStopEditing(e);
          }}
          onChange={(e) => handleInputChange(e)}
          type="text"
          name="text"
          value={enteredText}
        />
      )}

      <NoteContextMenu
        isOpen={isContextMenuOpen}
        onDelete={() => handleNoteDelete(id)}
      />
    </article>
  );
}
