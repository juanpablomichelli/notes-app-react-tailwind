export default function NoteContent({
  isEditing,
  handleStartEdit,
  text,
  inputTextRef,
  handleStopEditing,
  handleInputChange,
  enteredText,
  imgSrc,
}) {
  return (
    <>
      {!isEditing.text ? (
        <p onClick={() => handleStartEdit("text")}>{text}</p>
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
    </>
  );
}
