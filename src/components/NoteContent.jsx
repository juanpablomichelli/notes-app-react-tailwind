export default function NoteContent({
  isEditing,
  handleStartEdit,
  text,
  inputTextRef,
  handleStopEditing,
  handleInputChange,
  enteredText,
  imgSrc,
  ...props
}) {
  return (
    <>
      <div {...props}>
        {!isEditing.text ? (
          <p className="break-words" onClick={() => handleStartEdit("text")}>{text}</p>
        ) : (
          <input
            ref={inputTextRef}
            onKeyUp={(e) => {
              handleStopEditing(e);
            }}
            onChange={(e) => handleInputChange(e)}
            type="text"
            name="text"
            value={enteredText}
          />
        )}
        {imgSrc && <img src={imgSrc} />}
      </div>
    </>
  );
}
