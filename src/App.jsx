import "./App.css";
import NoteAdd from "./components/NoteAdd";
import NotesList from "./components/NotesList";
import SearchBar from "./components/SearchBar";
import { NotesProvider } from "./context/NotesContext";

function App() {
  // 📄 Date Docs https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
  const today = new Date().toDateString();

  return (
    <NotesProvider>
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
          <NotesList/>
          <NoteAdd />
        </main>
      </div>
    </NotesProvider>
  );
}

export default App;
