import NoteContextMenu from "./NoteContextMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; //Import component
import {
  faThumbtack,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons"; //Import icon
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { NotesContext } from "../context/NotesContext";

const INITIAL_EDIT_VALUE = { title: false, text: false };
const fileTypes = [
  "image/apng",
  "image/bmp",
  "image/gif",
  "image/jpeg",
  "image/pjpeg",
  "image/png",
  "image/svg+xml",
  "image/tiff",
  "image/webp",
  "image/x-icon",
];

export default function Note({ initialTitle, initialText, id, imgSrc }) {
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(INITIAL_EDIT_VALUE);
  const [title, setTitle] = useState(initialTitle);
  const [text, setText] = useState(initialText);
  const [enteredTitle, setEnteredTitle] = useState(initialTitle);
  const [enteredText, setEnteredText] = useState(initialText);
  const { handleNoteDelete, setNotes } = useContext(NotesContext);
  const fileInputRef = useRef();

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

  function validFileType(file) {
    return fileTypes.includes(file.type);
  }
  const createImgUrl = useCallback(
    (e) => {
      const input = e.target;

      if (input.files.length === 1) {
        console.log("A file has been selected");
        //Validate file type
        if (validFileType(input.files[0])) {
          console.log("Valid file type");
          //create URL from image
          const imgURL = URL.createObjectURL(input.files[0]);
          //create a img property on the Note object and assign this url to it
          setNotes((prev) => {
            let updatedNotes = [...prev];
            let idx = updatedNotes.findIndex((note) => note.id === id);
            updatedNotes[idx].imgSrc = imgURL;
            console.log({ ...updatedNotes[idx] });
            console.log("Image url: " + updatedNotes[idx].imgSrc);
            return updatedNotes;
          });
        } else alert(`${input.files[0].name} has an invalid file type`);
      } else alert("No files selected");
    },
    [id, setNotes]
  );

  useEffect(() => {
    fileInputRef.current.addEventListener("change", (e) => {
      createImgUrl(e);
    });
  }, [createImgUrl]);

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

  function handleInsertImage() {
    // Open file picker from <input type"file> using the ref
    fileInputRef.current.click();

    // the idea should be to convert it to a url and pass it as a prop of the note.
    // then the note will consume that url and render -AFTER the already inserted text -the image if there is any
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
      {imgSrc && <img src={imgSrc} />}

      <NoteContextMenu
        onInsertImage={handleInsertImage}
        isOpen={isContextMenuOpen}
        onDelete={() => handleNoteDelete(id)}
        fileInputRef={fileInputRef}
      />
    </article>
  );
}
