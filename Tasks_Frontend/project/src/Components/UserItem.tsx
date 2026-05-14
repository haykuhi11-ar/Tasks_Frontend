import React, { useContext } from "react";
import { UserContext } from "../Context/context";
import type { User } from "../Context/types";

type Props = {
    user: User
}
export const UserItem: React.FC<Props> = ({ user }) => {
    const context = useContext(UserContext);
    if (!context) throw new Error("Out of provider...");

    const { deleteUser, salaryDown, salaryUp } = context;

    return (
        <tr>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.age}</td>
            <td>{user.salary} $</td>
            <td className="d-flex gap-2">
                <button 
                className="btn btn-success btn-sm"
                onClick={() => salaryUp(user.id)}>Salary up</button>
                <button 
                className="btn btn-dark btn-sm"
                onClick={() => salaryDown(user.id)}>Salary down</button>
                <button 
                className="btn btn-danger btn-sm"
                onClick={() => deleteUser(user.id)}>Delete</button>
            </td>
        </tr>
    );
}