import { useContext } from "react"
import type { User } from "../types/types"
import { UserContext } from "./context/UserContext"

type Props = {
    user: User
}

export const UserItem: React.FC<Props> = ({ user }) => {

    const context = useContext(UserContext)

    if (!context) throw new Error("Out of provider")

    return (
        <>
            <td>{user.name}</td>
            <td>{user.salary}</td>
            <td>{user.age}</td>

            <td className="d-flex gap-2">

                <button
                    className="btn btn-success btn-sm"
                    onClick={() => context.salaryUp(user.id)}
                >
                    +
                </button>

                <button
                    className="btn btn-warning btn-sm"
                    onClick={() => context.salaryDown(user.id)}
                >
                    -
                </button>

                <button
                    className="btn btn-danger btn-sm"
                    onClick={() => context.deleteUser(user.id)}
                >
                    Delete
                </button>

            </td>
        </>
    )
}