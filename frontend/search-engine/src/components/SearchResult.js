import React from "react";

function SearchResult({ text }) {
  return (
    <div className="dark:text-black dark:bg-white text-white bg-gray-700 rounded-xl flex-1 text-center p-4 ">
      {text}
    </div>
  );
}

export default SearchResult;
