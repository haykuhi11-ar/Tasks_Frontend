import type React from "react";
import type { ToDo } from "./types/todo";
import { ToDoItem } from "./ToDoItem";

type Props = {
    todos: ToDo[]
    onDelete: (id: string) => void
    onCompleted: (id: string) => void
}

export  const List:React.FC<Props> = ({todos, onDelete, onCompleted}) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Task</th>
                    <th>Action</th>
                </tr>
            </thead>

            <tbody>
                {
                    todos.map(todo => 
                        <ToDoItem 
                        key={todo.id} 
                        todo={todo}
                        onDelete={onDelete}
                        onCompleted={onCompleted}
                        />
                    )
                }
            </tbody>
        </table>
    );
}