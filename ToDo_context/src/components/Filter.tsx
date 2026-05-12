import { useContext } from "react"
import { TodoContext } from "../context/context"

export const Filter = () => {

    const context = useContext(TodoContext)
    if (!context) throw new Error("Out of provider")

    return (
        <div className="d-flex justify-content-center gap-2 mb-3">
        <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => context.setFilter("all")}
        >
            All
        </button>
    
        <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => context.setFilter("active")}
        >
            Active
        </button>
    
        <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => context.setFilter("completed")}
        >
            Completed
        </button>
    </div>
    )
}