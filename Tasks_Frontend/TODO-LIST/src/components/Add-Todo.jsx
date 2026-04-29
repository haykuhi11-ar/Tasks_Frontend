import { useState } from "react";

export default function AddToDo({ addTask }) {
    const [task, setTask] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!task.trim()) {
            setError("Task input cannot be empty");
            return;
        }

        addTask({
            id: Date.now(),
            title: task,
            completed: false
        });

        setTask("");
        setError("");
    }

    return (
        <>
            <form 
            className="input-group mb-3"
            onSubmit={handleSubmit}
            >
                    <input 
                        type="text"
                        className="form-control" 
                        placeholder="Enter your task"
                        value={task}
                        onChange={(e) => {
                            setTask(e.target.value)
                            setError("")
                        }}
                    />
                    
                    <button
                        type="submit"
                        className="btn btn-outline-dark" 
                    >
                        Add
                    </button>
            </form>
            {error && <div className="text-danger mt-2">{error}</div>}
        </>    
    );
}