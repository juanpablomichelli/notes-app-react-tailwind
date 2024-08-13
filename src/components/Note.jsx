import NoteContextMenu from "./NoteContextMenu";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { NotesContext } from "../context/NotesContext";
import validFileType from "../utility/validFileType";
import NoteHeader from "./NoteHeader";
import NoteContent from "./NoteContent";

const INITIAL_EDIT_VALUE = { title: false, text: false };

export default function Note({ note, initialText, initialTitle }) {
  const [noteState, setNoteState] = useState({
    isContextMenuOpen: false,
    isEditing: INITIAL_EDIT_VALUE,
    enteredTitle: note.title,
    enteredText: note.text,
  });
  const [enteredTitle, setEnteredTitle] = useState(initialTitle);
  const [enteredText, setEnteredText] = useState(initialText);
  const { handleDeleteNote, handleUpdateNote } = useContext(NotesContext);

  const fileInputRef = useRef();
  const inputTitleRef = useRef(null);
  const inputTextRef = useRef(null);

  const handleContextMenuOpen = () => {
    setNoteState((prev) => {
      return { ...prev, isContextMenuOpen: !prev.isContextMenuOpen };
    });
  };
  const handleStopEditing = useCallback(
    (e = null) => {
      let isEditing = noteState.isEditing;
      if (e) {
        if (e.key === "Enter") {
          if (isEditing.title || isEditing.text) {
            const updatedNote = { ...note };
            if (isEditing.title) updatedNote.title = enteredTitle;
            if (isEditing.text) updatedNote.text = enteredText;
            handleUpdateNote(updatedNote, updatedNote.id);
          }
          setNoteState((prev) => {
            return { ...prev, isEditing: INITIAL_EDIT_VALUE };
          });
        }
      } else {
        if (isEditing.title || isEditing.text) {
          const updatedNote = { ...note };
          if (isEditing.title) updatedNote.title = enteredTitle;
          if (isEditing.text) updatedNote.text = enteredText;
          handleUpdateNote(updatedNote, updatedNote.id);
        }
        setNoteState((prev) => {
          return { ...prev, isEditing: INITIAL_EDIT_VALUE };
        });
      }
    },
    [enteredTitle, enteredText, noteState, note, handleUpdateNote]
  );

  const handleClickOutside = useCallback(
    (e) => {
      if (
        (inputTitleRef.current && !inputTitleRef.current.contains(e.target)) ||
        (inputTextRef.current && !inputTextRef.current.contains(e.target))
      ) {
        handleStopEditing();
      }
      // check if clicking outside contextmenu
    },
    [handleStopEditing]
  );

  const handleStartEdit = useCallback((element) => {
    setNoteState((prev) => {
      if (element === "title")
        return {
          ...prev,
          isEditing: { text: prev.isEditing.text, title: true },
        };
      if (element === "text")
        return {
          ...prev,
          isEditing: { title: prev.isEditing.title, text: true },
        };
    });
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
        } else alert(`${input.files[0].name} has an invalid file type`);
      } else alert("No files selected");
    },
    [note, handleUpdateNote]
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

  const editingProps = {
    isEditing: noteState.isEditing,
    handleStartEdit: handleStartEdit,
    handleStopEditing: handleStopEditing,
    handleInputChange: handleInputChange,
  };
  return (
    <article className="relative border-2 border-black max-w-48">
      <NoteHeader
        {...editingProps}
        title={note.title}
        inputTitleRef={inputTitleRef}
        enteredTitle={enteredTitle}
        OnContextMenuOpen={handleContextMenuOpen}
      />

      <NoteContent
        {...editingProps}
        text={note.text}
        inputTextRef={inputTextRef}
        enteredText={enteredText}
        imgSrc={note.imgSrc}
      />

      <NoteContextMenu
        onInsertImage={handleInsertImage}
        isOpen={noteState.isContextMenuOpen}
        onDelete={() => handleDeleteNote(note.id)}
        fileInputRef={fileInputRef}
      />
    </article>
  );
}
