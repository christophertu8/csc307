// src/MyApp.jsx
import Table from "./Table";
import Form from "./Form";
import React, { useState, useEffect } from "react";

export default MyApp;

function MyApp() {
  const [characters, setCharacters] = useState([]);

  function removeOneCharacter(index) {
    const userToDelete = characters[index];
  
    fetch(`http://localhost:8000/users/${userToDelete._id}`, {
      method: "DELETE"
    })
      .then((res) => {
        if (res.status === 204) {
          // Update frontend only if backend deletion succeeded
          const updated = characters.filter((_, i) => i !== index);
          setCharacters(updated);
        } else {
          throw new Error("Delete failed");
        }
      })
      .catch((error) => {
        console.log("DELETE failed:", error);
      });
  }
  

  function updateList(person) {
    postUser(person)
      .then((res) => {
        if (res.status === 201) {
          return res.json(); // get the created user w/ ID
        } else {
          throw new Error("Failed to add user");
        }
      })
      .then((newUser) => {
        setCharacters([...characters, newUser]);
      })
      .catch((error) => {
        console.log("POST failed:", error);
      });
  }
  

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }
  
  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function postUser(person) {
    const promise = fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(person)
    });
  
    return promise;
  }  

  return (
    <div className="container">
      <Table
        characterData={characters}
        removeCharacter={removeOneCharacter}
      />
      <Form handleSubmit={updateList} />
    </div>
  );
  
  
}
