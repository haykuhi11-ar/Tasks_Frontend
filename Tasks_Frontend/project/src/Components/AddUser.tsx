import { useContext } from "react";
import { UserContext } from "../Context/context";
import { useForm } from "react-hook-form";
import type { User } from "../Context/types";

export const AddUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error("Out of provider...");

    const { addUser } = context;
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm<User>();

    const onSubmit = (data: User) => {
        addUser(data);
        reset();
    }

    return (
        <div
            className="card shadow border-0 rounded-4 p-4 mx-auto my-3 mt-4"
            style={{ maxWidth: "400px" }}
        >
            <h3 className="text-center mb-4 fw-bold">Add User</h3>

            <form
                className="d-flex flex-column gap-3"
                onSubmit={handleSubmit(onSubmit)}>
                <input
                    className="form-control rounded-3"
                    type="text"
                    placeholder="Name"
                    {...register("name", { required: "Name is required" })}
                />

                {errors.name && <p className="text-danger small mt-1 mb-0">{errors.name.message}</p>}

                <input
                    className="form-control rounded-3"
                    type="number"
                    placeholder="Age"
                    {...register("age", {
                        required: "Age is required",
                        min: {
                            value: 16,
                            message: "Age must be > 16"
                        }
                    })}
                />
                {errors.age && <p className="text-danger small mt-1 mb-0">
                    {errors.age.message}
                </p>}

                <input
                    className="form-control rounded-3"
                    type="number"
                    placeholder="Salary"
                    {...register("salary", {
                        required: "Salary is required",
                        min: {
                            value: 500,
                            message: "Salary must be > 500"
                        }
                    })}
                />
                {errors.salary && <p className="text-danger small mt-1 mb-0">
                    {errors.salary.message}
                </p>}

                <button
                    className="btn btn-dark rounded-3 fw-semibold"
                    type="submit"
                >
                    Add
                </button>
            </form>
        </div>
    );
}