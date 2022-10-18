import React, { useState } from "react";
import * as API from "../BooksAPI";
import Shelf from "./Shelf";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function Search({ handleShelfUpdate, books }) {
  const [query, setquery] = useState("");
  const [searchBooksResult, setSearchBooksResult] = useState([]);
  function handleChange(e) {
    setquery(e.target.value);
    if (e.target.value !== "") {
      async function searchRequest() {
        const response = await API.search(e.target.value);
        if (!response["error"]) {
          const results = response.map((resultBook) => {
            resultBook["shelf"] = "none";
            return (
              books.find((book) => book.id === resultBook.id) || resultBook
            );
          });

          setSearchBooksResult(results);
        } else {
          setSearchBooksResult([]);
        }
      }
      searchRequest();
    } else {
      setSearchBooksResult([]);
    }
  }

  return (
    <>
      <div className="search-books">
        <div className="search-books-bar">
          <div className="search-books-input-wrapper">
            <input
              type="text"
              value={query}
              placeholder="Search by title, author, or ISBN"
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid"></ol>
        </div>
      </div>
      <div>
        <Shelf
          handleShelfUpdate={handleShelfUpdate}
          books={searchBooksResult}
          shelfName={"Search Results"}
        />
        <div className="back-search">
          <Link to={"/"} />
        </div>
      </div>
    </>
  );
}

Search.prototype = {
  handleShelfUpdate: PropTypes.func.isRequired,
  books: PropTypes.string.isRequired,
};
