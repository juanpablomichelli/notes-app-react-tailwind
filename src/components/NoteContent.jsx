import { useEffect } from "react";

export default function NoteContent({
  inputTextRef,
  onChange,
  enteredText,
  imgSrc,
  autoResizeTextArea,
  isPinned,
  ...props
}) {
  useEffect(() => {
    const textarea = inputTextRef.current;

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
  }, [inputTextRef.current]);
  return (
    <>
      <div {...props}>
        <textarea
          ref={inputTextRef}
          onChange={onChange}
          type="text"
          name="text"
          value={enteredText}
          className={`${
            isPinned
              ? "bg-blue-200 placeholder:text-blue-400"
              : "bg-orange-200 placeholder:text-orange-400"
          } overflow-hidden outline-none resize-none`}
          placeholder="Start writing your note!"
        />
        {imgSrc && <img src={imgSrc} />}
      </div>
    </>
  );
}
