import React, { useState } from "react"
import type { ContextType, User, ViewType } from "../../types/types"

export const UserContext = React.createContext<ContextType | undefined>(undefined)
type Props = {
    children: React.ReactNode
}
export const UserProvider: React.FC<Props> = ({children}) => {
    const [view, setView] = useState<ViewType>("table")

    const [users, setUsers] = useState<User[]> ([
        { id : 1, name: "Anna", salary: 200000, age: 22},
        {id: 2, name: "Karen", salary: 210000, age: 20},
        {id: 3, name: "Mane", salary: 250000, age: 23},

        
    ])

    const addUser = (user: Omit<User, "id">) => {
        setUsers(prev => [
            ...prev,
            {
                    ...user,
                    id: Date.now()
            }
            
        ])
    }
    const deleteUser = (id: number) => {
        setUsers(prev => prev.filter(user => user.id !== id ))
        
    }
    const salaryUp = (id: number) => {
        setUsers(prev => prev.map(user => user.id === id ? {...user, salary: user.salary + 10000} : user))
    }

    const salaryDown = (id: number) => {
        setUsers(prev => prev.map(user => user.id === id ? {...user, salary: user.salary - 10000} : user)) 
    }

    return (
        <UserContext.Provider
            value={{
                users,
                view,
                addUser,
                deleteUser,
                salaryUp,
                salaryDown,
                setView
            }}
        >
            {children}
        </UserContext.Provider>
    )

}



