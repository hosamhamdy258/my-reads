import React from "react";
import { Link } from "react-router-dom";

export default function BooksCategories({ children }) {
  return (
    <div>
      {children}
      <div className="open-search">
        <Link to={"/search"} />
      </div>
    </div>
  );
}
