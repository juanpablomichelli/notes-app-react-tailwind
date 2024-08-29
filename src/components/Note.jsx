import NoteContextMenu from "./NoteContextMenu";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { NotesContext } from "../context/NotesContext";
import validFileType from "../utility/validFileType";
import NoteHeader from "./NoteHeader";
import NoteContent from "./NoteContent";
import getBase64 from "../utility/convertToBase64";

export default function Note({ note, initialText, initialTitle }) {
  const [noteState, setNoteState] = useState({
    isContextMenuOpen: false,
    enteredTitle: note.title,
    enteredText: note.text,
  });
  const [enteredTitle, setEnteredTitle] = useState(initialTitle);
  const [enteredText, setEnteredText] = useState(initialText);
  const {
    handleDeleteNote,
    handleUpdateNote,
    handleNewlyAddedNote,
    handleTogglePin,
    handleFocusOut,
  } = useContext(NotesContext);

  const fileInputRef = useRef();
  const inputTitleRef = useRef(null);
  const inputTextRef = useRef(null);
  const menuRef = useRef(null);
  const menuToggleRef = useRef(null);

  const autoResizeTextArea = useCallback((textarea) => {
    textarea.style.height = "1.5rem";
    textarea.style.height = textarea.scrollHeight + "px";
  }, []);

  const handleToggleContextMenu = () => {
    setNoteState((prev) => {
      return { ...prev, isContextMenuOpen: !prev.isContextMenuOpen };
    });
  };

  const handleClickOutside = useCallback((e) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(e.target) &&
      !menuToggleRef.current.contains(e.target)
    ) {
      handleToggleContextMenu();
    }
  }, []);

  const createImgUrl = useCallback(
    (e) => {
      const input = e.target;

      if (input.files.length === 1) {
        //Validate file type
        if (validFileType(input.files[0])) {
          //create base64 from image
          getBase64(input.files[0], (base64Image) => {
            //create a img property on the Note object and assign the base64 to it
            let updatedNote = { ...note, imgSrc: base64Image };
            handleUpdateNote(updatedNote, note.id);
            handleToggleContextMenu();
          });
        } else alert(`${input.files[0].name} has an invalid file type`);
      } else alert("No files selected");
    },
    [note, handleUpdateNote]
  );

  // 📄 Handle Outside Clicks React https://dev.to/rashed_iqbal/how-to-handle-outside-clicks-in-react-with-typescript-4lmc
  useEffect(() => {
    const noteTitle = inputTitleRef.current;
    document.addEventListener("mouseup", handleClickOutside);
    document.addEventListener("touchend", handleClickOutside);
    noteTitle.addEventListener("focusout", () => handleFocusOut(note.id));

    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
      document.removeEventListener("touchend", handleClickOutside);
      noteTitle.removeEventListener("focusout", () => handleFocusOut(note.id));
    };
  }, [handleClickOutside, handleFocusOut]);

  useEffect(() => {
    handleNewlyAddedNote();
  }, []);

  function handleInputChange(e) {
    const { name, value } = e.target;
    const newNote = { ...note, [name]: value };

    if (name === "title") setEnteredTitle(value);
    if (name === "text") setEnteredText(value);

    handleUpdateNote(newNote, note.id);
  }

  function handleInsertImage() {
    // Open file picker from <input type"file> using the ref
    fileInputRef.current.click();
  }

  return (
    <article
      className={`note ${
        note.pinned ? "bg-blue-200" : "bg-orange-200"
      } flex flex-col gap-2 relative border-2 rounded-lg p-2 border-black w-full mr-auto ml-auto`}
    >
      <NoteHeader
        onChange={handleInputChange}
        title={note.title}
        inputTitleRef={inputTitleRef}
        enteredTitle={enteredTitle}
        onToggleContextMenu={handleToggleContextMenu}
        autoResizeTextArea={autoResizeTextArea}
        menuToggleRef={menuToggleRef}
        isNewNote={note.isNewNote}
        onTogglePin={() => handleTogglePin(note.id)}
        isPinned={note.pinned}
      />

      <NoteContent
        className={"flex flex-col gap-4"}
        onChange={handleInputChange}
        text={note.text}
        inputTextRef={inputTextRef}
        enteredText={enteredText}
        imgSrc={note.imgSrc}
        autoResizeTextArea={autoResizeTextArea}
        isPinned={note.pinned}
      />

      {noteState.isContextMenuOpen && (
        <NoteContextMenu
          onInsertImage={handleInsertImage}
          isOpen={noteState.isContextMenuOpen}
          onDelete={() => handleDeleteNote(note.id)}
          fileInputRef={fileInputRef}
          menuRef={menuRef}
          createImgUrl={createImgUrl}
        />
      )}
    </article>
  );
}
