import { useContext } from "react";
import { UserContext } from "./context/UserContext";
export const GridView = () =>  {
    const context = useContext(UserContext);
    if(!context) throw new Error ("Out of privider")

        return (

            <div className="row">
                {
                    context.users.map(user => (
                        <div className="col-md-4 mb-4" key={user.id}>
                            <div className="card shadow-lg border-0 h-100"
                            style={{borderRadius: "20px"}}>
                                <img src="user.image"
                                alt="user.name"
                                className="card-img-top"
                                style={{
                                    height:"250px",
                                    objectFit: "cover",
                                    borderTopLeftRadius: "20px",
                                    borderTopRightRadius: "20px"
                                }}/>
                                <div className="card-body text-center">
                                    <h4>{user.name}</h4>
                                    <p className="mb-1">
                                    <strong>Salary:</strong> {user.salary }
                                    </p>
                                    <p className="mb-1">
                                    <strong>Age:</strong> {user.age }
                                    </p>

                                    <div className="d-flex jutify-content-center gap-2">
                                    <button className="btn btn-success btn-sm"
                                    onClick={() => context.salaryUp(user.id)}
                                    >
                                        +
                                    </button>
                                    <button className="btn btn-success btn-sm"
                                    onClick={() => context.salaryDown(user.id)}
                                    >
                                        -
                                    </button>
                                    <button className="btn btn-success btn-sm"
                                    onClick={() => context.deleteUser(user.id)}
                                    >
                                        X
                                    </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        ) 
}