// src/Form.jsx
import React, { useState } from "react";

function Form(props) {
  const [person, setPerson] = useState({
    name: "",
    job: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setPerson((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  function submitForm(event) {
    event.preventDefault(); // Prevent page reload
    props.handleSubmit(person); // Call parent handler with user data
    setPerson({ name: "", job: "" }); // Reset form
  }

  return (
    <form onSubmit={submitForm}>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        id="name"
        value={person.name}
        onChange={handleChange}
      />
      <label htmlFor="job">Job</label>
      <input
        type="text"
        name="job"
        id="job"
        value={person.job}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default Form;
