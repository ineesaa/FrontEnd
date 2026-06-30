import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { deleteUser, getUsers, selectFilteredUsers } from "./usersSlice"
import styles from './Users.module.css'
import { FilterUsers } from "./FilterUsers"

export const Users = () => {
    const users = useAppSelector(selectFilteredUsers)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getUsers()).catch(() => {
            console.error("something went wrong!!!!")
        })
    }, [dispatch])

    const handleDelete = (id: number) => {
        dispatch(deleteUser(id)).catch(() => {
            console.error("delete failed!!!!")
        })
    }


    return (
        <div>
            <h1>Users {users.length}</h1>
            <FilterUsers />
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>name</th>
                        <th>gender</th>
                        <th>salary</th>
                        <th>actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(user =>
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.gender}</td>
                                <td>{user.salary} USD</td>
                                <td>
                                    <button onClick={() => handleDelete(user.id)}>X</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}