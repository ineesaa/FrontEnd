import { useContext } from "react"
import { Add } from "./Add"
import { Filter } from "./Filter"
import { List } from "./List"
import { TodoContext } from "../context/context"

export const ToDoList = () => {
    const context = useContext(TodoContext)
    if (!context) throw new Error("Out of Provider....")
        return (
            <div className="container d-flex justify-content-center align-items-center vh-100">
                <div className="card shadow-lg p-4 w-100"
                     style={{ maxWidth: "500px", borderRadius: "20px" }}>
    
                    <h2 className="text-center mb-4">ToDo List</h2>
    
                    <Add />
                    <Filter />
                    <List />
    
                </div>
            </div>
        )
}