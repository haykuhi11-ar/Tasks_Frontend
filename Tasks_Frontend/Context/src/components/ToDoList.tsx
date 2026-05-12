import { useContext } from "react";
import Add from "./Add";
import Filter from "./Filter";
import List from "./List";
import { TodoContext } from "../context/context";

export default function ToDoList() {
    const context = useContext(TodoContext);
    if (!context) throw new Error("Out of provider...");

    return (
        <div>
            <h1 className="display-3 text-center fw-bold my-4">
                ToDoList
            </h1>
            <Add />
            <Filter />
            <List />
        </div>
    );
}