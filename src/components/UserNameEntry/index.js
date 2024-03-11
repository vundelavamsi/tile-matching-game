import React, { useState } from "react";

import './index.css'

const UserNameEntry = ({ onNameSubmit }) => {
  const [name, setName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onNameSubmit(name);
  };

  return (
    <div className="username-entry-container">
      <h1 className="game-name-heading">React Tiles</h1>
      <div className="form-container">
        <h1 className="game-name-heading">Enter Your Name</h1>
        <form onSubmit={handleSubmit} className="input-and-button-container">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Your Name"
            className="input-field"
          />
          <button type="submit" className="play-button">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default UserNameEntry;
