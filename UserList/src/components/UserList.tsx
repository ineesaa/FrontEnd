import { useContext } from "react"
import { UserContext } from "./context/UserContext"
import { TableView } from "./TableView"
import { GridView } from "./GridView"

export const UserList = () => {

    const context = useContext(UserContext)

    if (!context) throw new Error("Out of provider")

    return (
        <div className="card p-3 shadow-sm">

            <div className="d-flex gap-2 mb-3">
                <button
                    className="btn btn-dark"
                    onClick={() => context.setView("table")}
                >
                    Table
                </button>

                <button
                    className="btn btn-secondary"
                    onClick={() => context.setView("grid")}
                >
                    Grid
                </button>
            </div>

            {context.view === "table"? <TableView /> : <GridView />
            }

        </div>
    )
}