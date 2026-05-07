import React from "react"
import { ToDo } from "./types/todo"
import { Api } from "../utility/api"

type Props = {
    todo: ToDo
    onDelete: (id: string) => void
    onToggle: (id: string) => void
}

export const ToDoItem: React.FC<Props> = ({ todo, onDelete, onToggle }) => {

    const handleDelete = () => {
        Api.delete(`/todos/${todo.id}`).then(() => {
            onDelete(todo.id)
        })
    }

    const handleToggle = () => {
        Api.patch(`/todos/${todo.id}`, { completed: !todo.completed }).then(() => {
            onToggle(todo.id)
        })
    }

    return (
        <div className={`todo-item ${todo.completed ? "completed" : ""}`}>
            <span className="todo-text">{todo.text}</span>
            <div className="todo-actions">
                <button
                    className={`btn-toggle ${todo.completed ? "cancel" : "complete"}`}
                    onClick={handleToggle}
                >
                    {todo.completed ? "Cancel" : "Complete"}
                </button>
                <button className="btn-delete" onClick={handleDelete}>
                    Delete
                </button>
            </div>
        </div>
    )
}