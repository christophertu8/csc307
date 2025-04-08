// src/MyApp.jsx
import Table from "./Table";
import Form from "./Form";

import React, { useState } from "react";

function Form() {
  const [person, setPerson] = useState({
    name: "",
    job: ""
  });
}
export default Form;

function MyApp() {
  const [characters, setCharacters] = useState([]);

  function removeOneCharacter(index) {
    const updated = characters.filter((character, i) => {
      return i !== index;
    });
    setCharacters(updated);
  }

  return (
    <div className="container">
      <Table
        characterData={characters}
        removeCharacter={removeOneCharacter}
      />
      <Form />
    </div>
  );
}
