import React from "react";
import { BsFillMoonStarsFill } from "react-icons/bs";

function NavBar({ setDarkMode }) {
  return (
    <nav className="py-10 mb-12 flex justify-between dark:text-white">
      <h1 className="font-burtons text-xl">Search Engine</h1>
      <ul className="flex items-center">
        <li>
          <BsFillMoonStarsFill
            onClick={setDarkMode}
            className="dark:hover:text-yellow-400 cursor-pointer text-2xl"
          />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
