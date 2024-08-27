import { useEffect, useLayoutEffect, useState } from "react";

export default function NoteContextMenu({
  isOpen,
  onDelete,
  onInsertImage,
  fileInputRef,
  menuRef,
  createImgUrl,
}) {
  const [contextMenuWidth, setContextMenuWidth] = useState(0);

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

  useLayoutEffect(() => {
    if (isOpen && menuRef.current) {
      setContextMenuWidth(() => {
        return menuRef.current.offsetWidth;
      });
    }
  }, []);

  let menuStyle = { right: `-${contextMenuWidth}px` };
  const liClass = "hover:bg-orange-200 pl-2";
  const menuClass = `absolute w-full min-w-[150px] bg-orange-100 border-2 border-black rounded-lg top-[-2px] z-10 text-sm md:text-base`;
  return (
    <>
      {isOpen && (
        <menu ref={menuRef} className={menuClass} style={menuStyle}>
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
