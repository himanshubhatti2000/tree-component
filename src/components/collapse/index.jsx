import "./style.css";
import { useState } from "react";

const Collapse = ({ title, children }) => {
  const [isContentVisible, setIsContentVisible] = useState(false);

  return (
    <div>
      <div className="title-btn-container">
        <button
          className="toggle-btn"
          onClick={() => setIsContentVisible(!isContentVisible)}
        >
          {isContentVisible ? "-" : "+"}
        </button>
        &nbsp;{title}
      </div>
      {isContentVisible && <div>{children}</div>}
    </div>
  );
};

export default Collapse;
