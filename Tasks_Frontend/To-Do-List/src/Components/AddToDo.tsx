import type React from "react";
import type { ToDo } from "./types/todo";
import { useState } from "react";
import { Api } from "../utility/api";

type Props = {
    addToDo: (todo: Omit<ToDo, "id">) => void
}

export  const AddToDo:React.FC<Props> = ({addToDo}) => {
    const [todo, setToDo] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.ChangeEvent) => {
        e.preventDefault();

        if (!todo.trim()) {
            setError("Task input cannot be empty");
            return;
        }

        addToDo({
            text: todo,
            completed: false
        });

        setToDo("");
        setError(null);

        try {
            await Api.post("/todos", {
                text: todo,
                completed: false
            });
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label className="label">AddToDo</label>
            <div>
                <input
                    type="text"
                    className="input"
                    placeholder="Enter your task"
                    value={todo}
                    onChange={(e) => {
                        setToDo(e.target.value);
                        if (error) setError(null)
                    }}

                />
                <button
                    type="submit"
                    className="add-btn"
                >
                    Add
                </button>
            </div>
            {error && <p className="err">{error}</p>}
        </form>
    );
}