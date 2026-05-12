import { useContext } from "react"
import { TodoContext } from "../context/context"
import { ToDoItem } from "./ToDoItem"

export const List = () => {

    const context = useContext(TodoContext)
    if (!context) throw new Error("Out of provider")

    const filteredTodos = context.todos.filter(todo => {
        if (context.filter === "completed") return todo.completed
        if (context.filter === "active") return !todo.completed
        return true
    })

    return (
        <div>
            <h3>List</h3>

            {filteredTodos.map(todo => (
                <ToDoItem
                    key={todo.id}
                    todo={todo}
                />
            ))}

        </div>
    )
}