import { useEffect, useLayoutEffect, useState } from "react";

export default function NoteContextMenu({
  isOpen,
  onDelete,
  onInsertImage,
  fileInputRef,
  menuRef,
  createImgUrl,
}) {
  const [contextMenuStyle, setContextMenuStyle] = useState({
    right: 0,
    left: 0,
  });

  //Determine menu position depending on which side of page the note is
  useLayoutEffect(() => {
    //get vw
    let vw = window.innerWidth;
    console.log(vw);
    //get x position of note or x position of menu's left client rect
    let menuRight = menuRef.current.getBoundingClientRect().right;

    setContextMenuStyle(() => {
      if (menuRight > vw / 1.5) {
        return {
          right: "initial",
          left: "-20px",
        };
      } else {
        return {
          right: `-${menuRef.current.offsetWidth}px`,
          left: "initial",
        };
      }
    });
  }, [menuRef]);

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
  const menuClass = `absolute w-full min-w-[150px] bg-orange-100 outline outline-2 outline-black rounded-lg top-[-2px] z-10 text-sm md:text-base`;
  return (
    <>
      {isOpen && (
        <menu ref={menuRef} className={menuClass} style={contextMenuStyle}>
          <li className={liClass}>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
            />
            <button onClick={onInsertImage} className="w-full text-left">
              Insert Image
            </button>
          </li>
          <li className={liClass}>
            <button onClick={onDelete} className="w-full text-left">
              Delete Note
            </button>
          </li>
        </menu>
      )}
    </>
  );
}
