import { useContext } from "react"
import { UserContext } from "../Context/context"
import avatar from "../Components/UserImages/user-circles-set_78370-4704.avif"

export const ShowGrid = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error("Out of provider...");

    const { users, deleteUser, salaryDown, salaryUp } = context;

    return (
        <div className="container mt-4">
            <div className="d-flex flex-wrap gap-4 justify-content-center">
                {
                    users.map(user =>
                        <div
                            className="card shadow h-100 border-0 rounded-4"
                            key={user.id}>

                            <img
                                src={avatar}
                                alt={user.name}
                                className="card-img-top p-3 rounded-circle"
                                style={{
                                    width: "160px",
                                    height: "160px",
                                    objectFit: "cover",
                                    margin: "0 auto"
                                }}
                            />

                            <div className="card-body text-center">
                                <h3 className="card-title fs-4 fw-bold">{user.name}</h3>

                                <p className="card-text mb-1">Age: {user.age}</p>
                                <p className="card-text mb-3">Salary: {user.salary}</p>

                                <div className="d-flex justify-content-center gap-2">
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => deleteUser(user.id)}
                                    >
                                        x
                                    </button>

                                    <button
                                        className="btn btn-success btn-sm"
                                        onClick={() => salaryUp(user.id)}
                                    >
                                        +
                                    </button>

                                    <button
                                        className="btn btn-dark btn-sm"
                                        onClick={() => salaryDown(user.id)}
                                    >
                                        -
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}