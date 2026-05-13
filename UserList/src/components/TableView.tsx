import { useContext } from "react";
import { UserContext } from "./context/UserContext";
import { UserItem } from "./UserItem";

export const TableView = ()=>{
    const context = useContext(UserContext)
    if(!context) throw new Error("out of provider")
        return (
            <table className="table table-boarded table-stripped">
                <thead>
                    <tr>

                        <th>Name</th>
                        <th>Salary</th>
                        <th>Age</th>
                        <th>Actions</th>

                    </tr>
                </thead>
                <tbody>{
                    context.users.map(user => (
                        <tr key={user.id}>
                            <UserItem user={user} />
                        </tr>
                    ))
                    }</tbody>
            </table>
            
        )
}