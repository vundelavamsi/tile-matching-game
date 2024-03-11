import React, { useState, useEffect } from "react";
import UserNameEntry from "./components/UserNameEntry";
import GameBoard from "./components/GameBoard";
import SuccessScreen from "./components/SuccessScreen";
import "./App.css";

const initialTiles = [
  {
    src:
      "https://assets.ccbp.in/frontend/react-js/face-with-stuck-out-tongue-img.png",
    matched: false,
  },
  {
    src:
      "https://assets.ccbp.in/frontend/react-js/face-with-head-bandage-img.png",
    matched: false,
  },
  {
    src:
      "https://assets.ccbp.in/frontend/react-js/face-with-hugs-img.png",
    matched: false,
  },
  {
    src:
      "https://assets.ccbp.in/frontend/react-js/face-with-laughing-img.png",
    matched: false,
  },
  // {
  //   src:
  //     "https://assets.ccbp.in/frontend/react-js/face-with-laughing-with-hand-infront-mouth-img.png",
  //   matched: false,
  // },
  // {
  //   src:
  //     "https://assets.ccbp.in/frontend/react-js/face-with-mask-img.png",
  //   matched: false,
  // },
  // {
  //   src:
  //     "https://assets.ccbp.in/frontend/react-js/face-with-silence-img.png",
  //   matched: false,
  // },
  // {
  //   src:
  //     "https://assets.ccbp.in/frontend/react-js/face-with-stuck-out-tongue-and-winking-eye-img.png",
  //   matched: false,
  // },
];

const App = () => {
  const [userName, setUserName] = useState("");
  const [tiles, setTiles] = useState([]);
  const [score, setScore] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);
  const [mins, setMins] = useState(0);
  const [secs, setSecs] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [flippedTiles, setFlippedTiles] = useState([]);
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)


  useEffect(() => {
    if (userName) {
      initalizeGame();
    }
  }, [userName]);

  useEffect(() => {
    checkGameOver();
  }, [tiles]);

  const initalizeGame = () => {
    const shuffledTiles = [...initialTiles, ...initialTiles]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({...card, id: Math.random()}))

    setChoiceOne(null);
    setChoiceTwo(null);

    setTiles(shuffledTiles)
    setScore(0)

    const startTime = Date.now();
    const timerInterval = setInterval(() => {
      const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
      setTimeTaken(elapsedTime);
    }, 1000);

  };

  useEffect(() => {
    const minutes = Math.floor(timeTaken / 60).toString().padStart(2, '0');
    const seconds = (timeTaken % 60).toString().padStart(2, '0');
    setMins(minutes)
    setSecs(seconds)
  }, [timeTaken]);

  // Handle a choice
  const handleChoice = (eachTile) => {
    choiceOne ? setChoiceTwo(eachTile) : setChoiceOne(eachTile)
  }

  //Compare 2 Selected Tiles
  useEffect(() => {
    if(choiceOne && choiceTwo) {
      if(choiceOne.src === choiceTwo.src) {
        setTiles(prevTiles => {
          return prevTiles.map(eachTile => {
            if(eachTile.src === choiceOne.src) {
              return {...eachTile, matched: true}
            }
            else {
              return eachTile
            }
          })
        })
        setTimeout(() => resetTurn(+1), 1000)
      }
      else {
        setTimeout(() => resetTurn(-1), 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  const resetTurn = (a) => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setScore(prevScore => prevScore + a)
  }

  const handleNameSubmit = (name) => {
    setUserName(name);
  };

  const checkGameOver = () => {
    const allTilesMatched = tiles.every((tile) => tile.matched);
    if (allTilesMatched) {
      setGameOver(true);
    }
  };

  return (
    <div className="app">
      {!userName ? (
        <UserNameEntry onNameSubmit={handleNameSubmit} />
      ) : (
        <>
          {!gameOver ? (
            <>
              <SuccessScreen score={score} timeTaken={timeTaken} />
            </>
          ) : (
            <>
            <GameBoard
                tiles={tiles} 
                handleChoice={handleChoice} 
                name={userName} 
                score={score} 
                mins={mins}
                secs={secs}  
                choiceOne={choiceOne}
                choiceTwo={choiceTwo}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default App;
