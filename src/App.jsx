import "./App.css";
import NoteAdd from "./components/NoteAdd";
import NotesList from "./components/NotesList";
import SearchBar from "./components/SearchBar";
import testNotes from "./test-notes";

function App() {
  // 📄 Date Docs https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
  const today = new Date().toDateString();

  return (
    <>
      <div
        id="page-container"
        className="min-h-screen m-0 grid grid-rows-[auto_1fr] max-w-[1024px] mr-auto ml-auto  bg-orange-100"
      >
        <header className="section">
          <h1 className="text-3xl font-bold">Notes App</h1>
          <span>{today}</span>
          <SearchBar />
        </header>
        <main className="section">
          <NotesList notes={testNotes} />
          <NoteAdd />
        </main>
      </div>
    </>
  );
}

export default App;
