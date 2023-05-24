import React from "react";

function SearchInput({ searchHandler }) {
  return (
    <div className="w-full flex flex-col">
      <div className="pb-8 text-center">
        <p className="text-4xl font-bold inline border-b-4 text-gray-600 border-pink-600 dark:text-gray-300">
          Search Engine
        </p>
      </div>
      <input
        onChange={searchHandler}
        className="rounded-2xl shadow-xl dark:bg-[#ccd6f6] dark:text-black text-white bg-gray-400 p-2 mb-3 placeholder-white dark:placeholder-black"
        type="text"
        placeholder="Nhập chữ cần tìm"
        name="name"
      />
    </div>
  );
}

export default SearchInput;
