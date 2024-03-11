import React from "react";

import "./index.css";

const Tile = ({ eachTile, handleChoice, flipped }) => {
  const handleClick = () => {
    handleChoice(eachTile);
  };

  return (
    <div className="tile" onClick={handleClick}>
      <div className={flipped ? "flipped" : ""}>
        <img className="emoji front" src={eachTile.src} alt="card front" />
        <img
          className="emoji back"
          src="cover.png"
          onClick={handleClick}
          alt="card back"
        />
      </div>
    </div>
  );
};

export default Tile;
