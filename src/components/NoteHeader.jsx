import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; //Import component
import {
  faThumbtack,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons"; //Import icon

export default function NoteHeader({
  isEditing,
  handleStartEdit,
  title,
  inputTitleRef,
  handleStopEditing,
  handleInputChange,
  enteredTitle,
  OnContextMenuOpen,
}) {
  return (
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
        />
      )}

      <nav className="w-full bg-orange-200 flex gap-4">
        <button aria-label="Pin note">
          <FontAwesomeIcon icon={faThumbtack} />
        </button>
        <button aria-label="Open options menu" onClick={OnContextMenuOpen}>
          <FontAwesomeIcon icon={faEllipsisVertical} />
        </button>
      </nav>
    </header>
  );
}
