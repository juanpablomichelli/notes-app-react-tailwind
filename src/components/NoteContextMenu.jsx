export default function NoteContextMenu({ isOpen }) {
  return (
    <menu
      className={`absolute w-48 bg-gray-200 top-0 right-[-12rem] ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <li>
        <button>Insert Image</button>
      </li>
      <li>
        <button>Insert List</button>
      </li>
      <li>
        <button>Change Background</button>
      </li>
      <li>
        <button>Delete Note</button>
      </li>
    </menu>
  );
}
