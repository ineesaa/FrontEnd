export interface ToDo {
    id: number
    text: string
    completed: boolean
}

export type FilterType = "all" | "completed" | "active"

export interface ContextType {
    todos: ToDo[]
    addTodo: (text: string) => void
    removeTodo: (id: number) => void
    toggleTodo: (id: number) => void
    filter: FilterType
    setFilter: (value: FilterType) => void
}