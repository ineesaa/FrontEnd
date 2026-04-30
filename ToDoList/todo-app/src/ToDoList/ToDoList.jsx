import { useState } from "react";
import { AddToDo } from "./AddToDo";
import { List } from "./List";
import "./ToDoList.css";

export const ToDoList = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: "go to the gym", completed: false },
    { id: 2, text: "read a book", completed: false },
    { id: 3, text: "eat a burger", completed: true },
  ]);

  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text, completed: false }]);
  };

  const removeTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  return (
    <div className="todo-container">
      <h1 className="todo-title">My ToDo List</h1>

      <AddToDo onAdd={addTodo} />
      <List items={todos} onRemove={removeTodo} onToggle={toggleTodo} />
    </div>
  );
};
