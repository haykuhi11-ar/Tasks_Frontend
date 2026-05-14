import { useContext } from "react";
import { AddUser } from "./AddUser";
import { Filter } from "./Filter";
import { UserContext } from "../Context/context";
import { ShowGrid } from "./ShowGrid";
import { ShowTable } from "./ShowTable";

export const UserList = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error("Out of provider");

    const { filter } = context;
    return (
        <>
            <div className="text-center mb-4">
                <h1>User List</h1>
            </div>
            <div className="card shadow-sm p-4 mb-4 border-0 rounded-4">
                <AddUser />
            </div>
            <div className="card shadow-sm p-4 mb-4 border-0 rounded-4">
                <Filter />
            </div>
            {
                filter === "grid"
                    ? <ShowGrid />
                    : <ShowTable />
            }
        </>

    );
}