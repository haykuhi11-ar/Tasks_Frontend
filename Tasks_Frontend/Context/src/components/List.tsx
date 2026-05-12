import { useContext } from "react";
import { TodoContext } from "../context/context";
import { ToDoItem } from "./ToDoItem";

export default function List() {
    const context = useContext(TodoContext);
    if (!context) throw new Error("Out of provider...");

    const { todos, filter } = context;

    const filteredTodos = todos.filter(todo => {
        switch (filter) {
            case "active":
                return !todo.completed;
            case "completed":
                return todo.completed;
            default:
                return true;
        }
    });

    return (
        <div className="d-flex flex-column gap-3 mt-4">
            {
                filteredTodos.map(todo => (
                    <ToDoItem
                        key={todo.id}
                        todo={todo}
                    />
                ))}
        </div>
    );
}