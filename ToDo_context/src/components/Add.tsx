import { useState, useContext } from "react"
import { TodoContext } from "../context/context"

export const Add = () => {

    const [text, setText] = useState("")
    const context = useContext(TodoContext)

    if (!context) throw new Error("Out of provider")

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()

        if (!text.trim()) return

        context.addTodo(text)
        setText("")
    }

    return (
        <div>
            <h3>Add</h3>
            <form onSubmit={handleSubmit} className="d-flex gap-2 mb-3">
    <input
        className="form-control"
        type="text"
        placeholder="Enter todo..."
        value={text}
        onChange={(e) => setText(e.target.value)}
    />
    <button className="btn btn-primary">
        Add
    </button>
</form>
        </div>
    )
}