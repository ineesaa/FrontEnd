import { useEffect, useState } from "react";
import UserList from "./UserList";
import AddUser from "./AddUser";
import "./App.css";

export default function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const addUser = (user) => {
    setUsers([...users, user]);
  };

  return (
    <div>
      <AddUser addUser={addUser} />
      <UserList users={users} deleteUser={deleteUser} />
    </div>
  );
}