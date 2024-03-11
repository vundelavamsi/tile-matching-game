import React from "react";
import Tile from "../Tile";
import "./index.css";

const GameBoard = ({ tiles, name, score, mins, secs, handleChoice, choiceOne, choiceTwo }) => {



  return (
    <div className="game-board">
      <h1 className="game-heading">Mahajong Game</h1>
      <div className="score-and-timer-container">
        <p className="details">Score: {score}</p>
        <p className="details">Time: {mins}:{secs}</p>
      </div>
      <div className="tiles-container">
        <div className="welcome-name-contanier details">
          <p>Welcome {name} 👏👏</p>
        </div>
        <div className="all-tiles-container">
          {tiles.map(eachTile => (
            <Tile 
                key={eachTile.id} 
                eachTile={eachTile} 
                handleChoice={handleChoice} 
                flipped={eachTile === choiceOne || eachTile === choiceTwo || eachTile.matched}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
