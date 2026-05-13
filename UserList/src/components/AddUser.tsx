import { useContext } from "react";
import { useForm} from "react-hook-form";
import { UserContext } from "./context/UserContext";


type FormValues = {
    name: string,
    salary: number,
    age: number

}

export const AddUser = () => {
    const context = useContext(UserContext)
    if(!context) throw new Error("Out of provider")
        const {
            register,
            handleSubmit,
            reset,
            formState: {errors}
        } = useForm<FormValues>()
    const onSubmit = (data: FormValues) => {
        context.addUser(data)
        reset()
    }
    return (
        <div className="card p-3 shadow-sm mb-4">

            <h3 className="mb-3">Add User</h3>

            <form onSubmit={handleSubmit(onSubmit)}>

                <input
                    className="form-control mb-2"
                    placeholder="Name"
                    {...register("name", {
                        required: "Name is required",
                        minLength: {
                            value: 3,
                            message: "Minimum 3 characters"
                        }
                    })}
                />

                {errors.name && (
                    <p className="text-danger">
                        {errors.name.message}
                    </p>
                )}
                <input
                type="number"
                    className="form-control mb-2"
                    placeholder="Salary"
                    {...register("salary", {
                        required: "Salary is required",
                        min: {
                            value: 1000,
                            message: "Minimum salary is 1000"
                        }
                    })}
                />

                {errors.salary && (
                    <p className="text-danger">
                        {errors.salary.message}
                    </p>
                )}

                <input
                type="number"
                className="form-control mb-3"
                    placeholder="Age"
                    {...register("age", {
                        required: "Age is required",
                        min: {
                            value: 18,
                            message: "Minimum age is 18"
                        }
                    })}
                />

                {errors.age && (
                <p className="text-danger">
                        {errors.age.message}
                    </p>
                )}
                <button className="btn btn-primary w-100">
                    Add User
                </button>
            </form>
        </div>
    )


}