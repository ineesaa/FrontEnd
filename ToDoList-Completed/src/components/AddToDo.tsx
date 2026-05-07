import React, { useState } from "react"
import { Api } from "../utility/api"
import type { ToDo } from "./types/todo"

type Props = {
    onAdd: (todo: ToDo) => void
}

export const AddToDo: React.FC<Props> = ({ onAdd }) => {
    const [text, setText] = useState("")

    const handleAdd = () => {
        const trimmed = text.trim()
        if (!trimmed) return

        const newTodo = {
            text: trimmed,
            completed: false,
        }

        Api.post<ToDo>("/todos", newTodo).then((response) => {
            onAdd(response.data)
            setText("")
        })
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") handleAdd()
    }

    return (
        <div className="add-todo">
            <input
                type="text"
                placeholder="Add a new task..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <button onClick={handleAdd} disabled={!text.trim()}>
                Add
            </button>
        </div>
    )
}