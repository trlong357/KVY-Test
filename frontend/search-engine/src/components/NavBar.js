import React from "react";
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import Logo from "./Logo";
import useThemeSwitcher from "@/hooks/useThemeSwitcher";

function NavBar() {
  const [mode, setMode] = useThemeSwitcher();

  return (
    <nav className="py-4 mb-12 flex justify-between dark:text-white">
      <Logo />
      <ul className="flex items-center">
        <li>
          <button onClick={() => setMode(mode === "light" ? "dark" : "light")}>
            {mode === "light" ? (
              <BsFillMoonStarsFill
                className={
                  "fill-dark hover:text-yellow-400 cursor-pointer text-2xl"
                }
              />
            ) : (
              <BsFillSunFill
                className={
                  "fill-dark hover:text-yellow-400 cursor-pointer text-2xl"
                }
              />
            )}
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
