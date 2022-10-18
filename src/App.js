import { useEffect, useState } from "react";
import "./App.css";
import Shelf from "./components/Shelf";
import * as API from "./BooksAPI";
import Search from "./components/Search";
import { Route, Routes } from "react-router-dom";
import BooksCategories from "./components/BooksCategories";

function App() {
  const [books, setBooks] = useState([]);
  const [refesher, setRefesher] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const response = await API.getAll();
      setBooks(response);
    }
    fetchData();
  }, [refesher]);

  function handleShelfUpdate(e, book) {
    async function updateBook() {
      await API.update(book, e.target.value);
      setRefesher(!refesher);
    }
    updateBook();
  }
  return (
    <div className="app">
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <Routes>
            <Route
              exact
              path="/"
              element={
                <BooksCategories>
                  <Shelf
                    handleShelfUpdate={handleShelfUpdate}
                    books={books.filter(
                      (book) => book.shelf === "currentlyReading"
                    )}
                    shelfName={"Currently Reading"}
                  />
                  <Shelf
                    handleShelfUpdate={handleShelfUpdate}
                    books={books.filter((book) => book.shelf === "wantToRead")}
                    shelfName={"Want To Read"}
                  />
                  <Shelf
                    handleShelfUpdate={handleShelfUpdate}
                    books={books.filter((book) => book.shelf === "read")}
                    shelfName={"Read"}
                  />
                </BooksCategories>
              }
            />
            <Route
              path="/search"
              element={
                <Search handleShelfUpdate={handleShelfUpdate} books={books} />
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
