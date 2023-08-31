import * as React from "react";
import "./NewFooter.css";

function NewFooter() {
  const toggleDarkMode = () => {
    console.log("bonjours");
    return null;
  };
  return (
    <>
      <div className="footer-wrapper">
        <div className="footer-left-side">
          <span>copyright miniz</span>
        </div>
        <div className="footer-right-side">
          <span onClick={toggleDarkMode}>dark mode</span>
        </div>
      </div>
    </>
  );
}

export default NewFooter;
