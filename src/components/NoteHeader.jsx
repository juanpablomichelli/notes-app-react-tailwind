import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; //Import component
import {
  faThumbtack,
  faThumbTackSlash,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons"; //Import icon
import { useEffect } from "react";

export default function NoteHeader({
  onChange,
  inputTitleRef,
  enteredTitle,
  onToggleContextMenu,
  autoResizeTextArea,
  menuToggleRef,
  isNewNote,
  onTogglePin,
  isPinned,
}) {
  useEffect(() => {
    const textarea = inputTitleRef.current;

    if (textarea) {
      const handleInput = () => autoResizeTextArea(textarea);

      // Attach the event listener
      textarea.addEventListener("input", handleInput);

      // Call it once to resize based on initial content
      autoResizeTextArea(textarea);

      // Cleanup the event listener on unmount
      return () => {
        textarea.removeEventListener("input", handleInput);
      };
    }
  }, [inputTitleRef.current]);
  return (
    <header className="flex flex-col gap-2 font-semibold">
      <nav className="flex gap-4 justify-between ">
        <button onClick={onTogglePin} aria-label="Pin note">
          {isPinned ? (
            <FontAwesomeIcon icon={faThumbTackSlash} />
          ) : (
            <FontAwesomeIcon icon={faThumbtack} />
          )}
        </button>
        <button
          id="toggle-menu"
          aria-label="Open options menu"
          onClick={onToggleContextMenu}
          ref={menuToggleRef}
        >
          <FontAwesomeIcon icon={faEllipsisVertical} />
        </button>
      </nav>
      <textarea
        ref={inputTitleRef}
        onChange={onChange}
        type="text"
        name="title"
        value={enteredTitle}
        className="w-full outline-none overflow-hidden resize-none bg-orange-200 text-lg"
        autoFocus={isNewNote}
      />
    </header>
  );
}
