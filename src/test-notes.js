const testNotes = Array.from({ length: 5 }, (v, i) => ({
  id: i + 1, // Incremental ID starting from 1
  title: `Test Note ${i + 1}`,
  text: `Test note description ${i + 1} Test note description Test note description Test note description Test note description Test note description Test note description Test note description Test note description`,
  pinned: false,
  background: "",
  imgSrc: undefined,
}));
export default testNotes;
