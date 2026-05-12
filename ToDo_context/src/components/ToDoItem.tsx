import { useContext } from "react"
import type { ToDo } from "../context/types"
import { TodoContext } from "../context/context"

type Props = {
    todo: ToDo
}

export const ToDoItem: React.FC<Props> = ({ todo }) => {

    const context = useContext(TodoContext)
    if (!context) throw new Error("Out of Provider")

    return (
        <div className="d-flex justify-content-between align-items-center border rounded p-2 mb-2">

    <span
        style={{
            textDecoration: todo.completed ? "line-through" : "none",
            cursor: "pointer"
        }}
        onClick={() => context.toggleTodo(todo.id)}
    >
        {todo.text}
    </span>

    <button
        className="btn btn-danger btn-sm"
        onClick={() => context.removeTodo(todo.id)}
    >
        Delete
    </button>

</div>
    )
}