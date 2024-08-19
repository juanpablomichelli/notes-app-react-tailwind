import NoteContextMenu from "./NoteContextMenu";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { NotesContext } from "../context/NotesContext";
import validFileType from "../utility/validFileType";
import NoteHeader from "./NoteHeader";
import NoteContent from "./NoteContent";

export default function Note({ note, initialText, initialTitle }) {
  const [noteState, setNoteState] = useState({
    isContextMenuOpen: false,
    enteredTitle: note.title,
    enteredText: note.text,
  });
  const [enteredTitle, setEnteredTitle] = useState(initialTitle);
  const [enteredText, setEnteredText] = useState(initialText);
  const { handleDeleteNote, handleUpdateNote } = useContext(NotesContext);

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
        console.log("A file has been selected");
        //Validate file type
        if (validFileType(input.files[0])) {
          console.log("Valid file type");
          //create URL from image
          const imgURL = URL.createObjectURL(input.files[0]);
          //create a img property on the Note object and assign this url to it
          let updatedNote = { ...note, imgSrc: imgURL };
          handleUpdateNote(updatedNote, note.id);
          handleToggleContextMenu();
        } else alert(`${input.files[0].name} has an invalid file type`);
      } else alert("No files selected");
    },
    [note, handleUpdateNote]
  );

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
  }

  return (
    <article className="flex flex-col gap-2 relative border-2 rounded-lg p-2 bg-orange-200 border-black max-w-48">
      <NoteHeader
        onChange={handleInputChange}
        title={note.title}
        inputTitleRef={inputTitleRef}
        enteredTitle={enteredTitle}
        onToggleContextMenu={handleToggleContextMenu}
        autoResizeTextArea={autoResizeTextArea}
        menuToggleRef={menuToggleRef}
      />

      <NoteContent
        className={"flex flex-col gap-4"}
        onChange={handleInputChange}
        text={note.text}
        inputTextRef={inputTextRef}
        enteredText={enteredText}
        imgSrc={note.imgSrc}
        autoResizeTextArea={autoResizeTextArea}
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
