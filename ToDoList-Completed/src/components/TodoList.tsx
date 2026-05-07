import React, { useEffect, useState } from "react"
import { AddToDo } from "./AddToDo"
import { FilterToDo } from "./FilterToDo"
import type { FilterType } from "./FilterToDo"
import { List } from "./List"
import type { ToDo } from "./types/todo"
import { Api } from "../utility/api"

export const ToDoList = () => {
    const [todos, setTodos] = useState<ToDo[]>([])
    const [filter, setFilter] = useState<FilterType>("all")

    useEffect(() => {
        Api.get<ToDo[]>("/todos").then(response => {
            setTodos(response.data)
        })
    }, [])

    const addToDo = (todo: ToDo) => {
        setTodos(prev => [...prev, todo])
    }

    const deleteToDo = (id: string) => {
        setTodos(prev => prev.filter(todo => todo.id !== id))
    }

    const toggleToDo = (id: string) => {
        setTodos(prev =>
            prev.map(todo =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        )
    }

    const filteredTodos = todos.filter(todo => {
        if (filter === "active") return !todo.completed
        if (filter === "completed") return todo.completed
        return true
    })

    const remaining = todos.filter(t => !t.completed).length

    return (
        <div className="todo-container">
            <h1>To-Do List</h1>
            <p className="todo-counter">{remaining} task{remaining !== 1 ? "s" : ""} remaining</p>
            <AddToDo onAdd={addToDo} />
            <FilterToDo filter={filter} onChange={setFilter} />
            <List
                todos={filteredTodos}
                onDelete={deleteToDo}
                onToggle={toggleToDo}
            />
        </div>
    )
}