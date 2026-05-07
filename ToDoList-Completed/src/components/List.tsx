import React from "react"
import { ToDoItem } from "./ToDoItem"
import type { ToDo } from "./types/todo"

type Props = {
    todos: ToDo[]
    onDelete: (id: string) => void
    onToggle: (id: string) => void
}

export const List: React.FC<Props> = ({ todos, onDelete, onToggle }) => {
    if (todos.length === 0) {
        return <p className="empty-list">No tasks found.</p>
    }

    return (
        <div className="todo-list">
            {todos.map(todo =>
                <ToDoItem
                    key={todo.id}
                    todo={todo}
                    onDelete={onDelete}
                    onToggle={onToggle}
                />
            )}
        </div>
    )
}