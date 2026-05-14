import { useContext } from "react";
import { UserContext } from "../Context/context";
import { UserItem } from "./UserItem";

export const ShowTable = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error("Out of provider...");

    const { users } = context;
    return (
        <div className="mx-auto" style={{ maxWidth: "800px" }}>
            <table className="table table-striped table-bordered table-hover shadow">
                <thead className="table-dark">
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Salary</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody >
                    {
                        users.map(user =>
                            <UserItem
                                key={user.id}
                                user={user}
                            />
                        )
                    }
                </tbody>
            </table>
        </div>
    );
}