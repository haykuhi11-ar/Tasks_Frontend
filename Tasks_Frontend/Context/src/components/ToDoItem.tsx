import type React from "react";
import type { ToDo } from "../context/types";
import { useContext } from "react";
import { TodoContext } from "../context/context";

type Props = {
    todo: ToDo
}

export const ToDoItem: React.FC<Props> = ({ todo }) => {
    const context = useContext(TodoContext);
    if (!context) throw new Error("Out of provider");

    return (
        <div className="card shadow-sm border-0 rounded-4 mb-3">
            <div className="card-body d-flex justify-content-between align-items-center">
                <h3 className="fs-6 fw-semibold text-truncate mb-0 me-3">
                    {todo.text}
                </h3>
                <div className="d-flex justify-content-between align-items-center gap-3 p-3 border rounded-4 mb-3 shadow-sm">
                    <button
                        className="btn btn-danger btn-sm"
                        onClick={() => context.removeTodo(todo.id)}
                    >
                        Delete
                    </button>
                    <button
                        className="btn btn-success btn-sm"
                        onClick={() => context.completedTodo(todo.id)}>
                        {todo.completed ? "Cancel" : "Completed"}
                    </button>
                </div>
            </div>
        </div>

    );
}