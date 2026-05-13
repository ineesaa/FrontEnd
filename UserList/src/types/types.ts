export interface User {
    id: number
    name : string
    salary : number
    age : number
}


export type ViewType = "table" | "grid"


export interface ContextType {
    users: User[]
    view: ViewType
    addUser: (user: Omit<User, "id">) => void
    deleteUser: (id: number) => void
    salaryUp: (id:number) => void
    salaryDown: (id:number) => void
    setView: (view: ViewType) => void
}