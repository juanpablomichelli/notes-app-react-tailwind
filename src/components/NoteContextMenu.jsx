import { useEffect } from "react";

export default function NoteContextMenu({
  isOpen,
  onDelete,
  onInsertImage,
  fileInputRef,
  menuRef,
  createImgUrl,
}) {
  useEffect(() => {
    let fileRef = fileInputRef.current;
    const handleChange = (e) => {
      createImgUrl(e);
    };
    if (fileRef) fileRef.addEventListener("change", handleChange);

    return () => {
      if (fileRef) fileRef.removeEventListener("change", handleChange);
    };
  }, [createImgUrl, fileInputRef]);

  const liClass = "hover:bg-orange-200 pl-2";
  return (
    <>
      {isOpen && (
        <menu
          ref={menuRef}
          className="absolute w-full bg-orange-100 border-2 border-black rounded-lg top-[-10px] right-[-12rem] z-10"
        >
          <li className={liClass}>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
            />
            <button onClick={onInsertImage}>Insert Image</button>
          </li>
          <li className={liClass}>
            <button>Insert List</button>
          </li>
          <li className={liClass}>
            <button>Change Background</button>
          </li>
          <li className={liClass}>
            <button onClick={onDelete}>Delete Note</button>
          </li>
        </menu>
      )}
    </>
  );
}
