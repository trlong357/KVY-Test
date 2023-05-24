import React from "react";

function SearchInput({ searchHandler }) {
  return (
    <div className="w-full flex flex-col">
      <div className="pb-8 text-center">
        <p className="text-4xl font-bold inline border-b-4 border-pink-600 text-gray-300">
          Search Engine
        </p>
      </div>
      <input
        onChange={searchHandler}
        className="bg-[#ccd6f6] p-2 mb-3"
        type="text"
        placeholder="Nhập chữ cần tìm"
        name="name"
      />
    </div>
  );
}

export default SearchInput;
