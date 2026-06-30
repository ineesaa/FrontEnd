export type User = {
    id: number
    name: string
    gender: string
    salary: number
}

export type filters = "all" | "male" | "female"

export type State = {
    users: User[]
    currentFilter: filters
}
