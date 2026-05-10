import { useState } from "react";
import "./AddUser.css";

export default function AddUser({ addUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "" || email === "") {
      setError("Fill all fields");
      return;
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
    };

    addUser(newUser);

    setName("");
    setEmail("");
    setError("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add User</h3>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button type="submit">Add</button>
    </form>
  );
}