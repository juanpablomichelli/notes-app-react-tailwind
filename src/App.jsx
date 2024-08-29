import { useState } from "react";
import "./App.css";
import NoteAdd from "./components/NoteAdd";
import NotesList from "./components/NotesList";
import SearchBar from "./components/SearchBar";
import { NotesProvider } from "./context/NotesContext";

function App() {
  // 📄 Date Docs https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
  const today = new Date().toDateString();

  const [searchValue, setSearchValue] = useState("");

  return (
    <NotesProvider>
      <div
        id="page-container"
        className="min-h-screen m-0 grid grid-rows-[auto_1fr] max-w-[1024px] mr-auto ml-auto bg-orange-100 gap-2"
      >
        <header className="section flex flex-col items-center gap-2">
          <h1 className="text-3xl font-bold">Notes App</h1>
          <span className="text-orange-500">{today}</span>
          <SearchBar setSearchValue={setSearchValue} />
        </header>
        <main className="section flex flex-col gap-8">
          <NotesList searchValue={searchValue} />
          <NoteAdd />
        </main>
        <div className="h-16"></div>
      </div>
    </NotesProvider>
  );
}

export default App;
