import { useState } from "react"
import { ToDo, FilterType } from "./types"
import { TodoContext } from "./context"

type Props = {
    children: React.ReactNode
}

export const ToDoService: React.FC<Props> = ({ children }) => {

    const [todos, setTodos] = useState<ToDo[]>([
        { id: 101, text: "Go to the gym", completed: false },
        { id: 102, text: "Read a book", completed: true },
        { id: 103, text: "Watch a film", completed: false },
    ])

    const [filter, setFilter] = useState<FilterType>("all")

    const addTodo = (text: string) => {
        const newTodo: ToDo = {
            id: Date.now(),
            text,
            completed: false
        }
        setTodos(prev => [...prev, newTodo])
    }

    const removeTodo = (id: number) => {
        setTodos(prev => prev.filter(todo => todo.id !== id))
    }

    const toggleTodo = (id: number) => {
        setTodos(prev =>
            prev.map(todo =>
                todo.id === id
                    ? { ...todo, completed: !todo.completed }
                    : todo
            )
        )
    }

    return (
        <TodoContext.Provider value={{
            todos,
            addTodo,
            removeTodo,
            toggleTodo,
            filter,
            setFilter
        }}>
            {children}
        </TodoContext.Provider>
    )
}