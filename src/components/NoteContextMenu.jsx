export default function NoteContextMenu({
  isOpen,
  onDelete,
  onInsertImage,
  fileInputRef,
}) {
  return (
    <menu
      className={`absolute w-48 bg-gray-200 top-0 right-[-12rem] ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <li>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
        />
        <button onClick={onInsertImage}>Insert Image</button>
      </li>
      <li>
        <button>Insert List</button>
      </li>
      <li>
        <button>Change Background</button>
      </li>
      <li>
        <button onClick={onDelete}>Delete Note</button>
      </li>
    </menu>
  );
}
