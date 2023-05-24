import React from "react";

function FunctionButton({ className, title, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`${className} px-4 py-2 flex-1 rounded-xl`}
    >
      {title}
    </button>
  );
}

export default FunctionButton;
