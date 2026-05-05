import type React from "react";
import type { ToDo } from "./types/todo";
import { Api } from "../utility/api";

type Props = {
    todo: ToDo, 
    onDelete: (id: string) => void
    onCompleted: (id: string) => void
}

export  const ToDoItem:React.FC<Props> = ({todo, onDelete, onCompleted}) => {
    const handleDelete = () => {
        Api
        .delete(`/todos/${todo.id}`)
        .then(() => {
            onDelete(todo.id);
        });
    }

    const handleCompleted = () => {
        Api
        .patch(`/todos/${todo.id}`, {
            completed: !todo.completed
        })
        .then(() => {
            onCompleted(todo.id);
        });
    }
    
    return (
        <tr className="">
            <td>{todo.text}</td>
            <td>
            <button 
            className="btn-completed" 
            onClick={handleCompleted}>
                {todo.completed ? "Cancel" : "Completed"}
                </button>
            <button 
            className="btn-delete" 
            onClick={handleDelete}>
                Delete
                </button>
            </td>
        </tr>
    );
}