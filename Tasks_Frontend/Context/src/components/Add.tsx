import React, { useContext, useState } from "react";
import { TodoContext } from "../context/context";

export default function Add() {
    const [text, setText] = useState("");
    
    const context = useContext(TodoContext);
    if (!context) {
        throw new Error("Out of provider...");
    }

    const {addTodo, error, setError} = context;

    const handleSubmit = (event:React.ChangeEvent)  => {
        event.preventDefault();
        
        addTodo(text);
        setText("");
    }
    return (
        <form
            className="bg-white shadow rounded-4 p-4 mb-4"
            onSubmit={handleSubmit}>
            <div>
                <label className="form-label fw-semibold">Add ToDo</label>
                <input
                    className="form-control shadow-sm"
                    type="text"
                    placeholder="Enter your task..."
                    value={text}
                    onChange={e => {
                        setText(e.target.value)
                        if (error) setError(null)
                    }}
                />
            </div>
            {error && <p className="alert alert-warning border-0 shadow-sm rounded-4 d-flex align-items-center gap-2 mb-3">{error}</p>}

            <button
                type="submit"
                className="btn btn-outline-dark rounded-pill px-4 fw-semibold my-3"
            >
                Add
            </button>
        </form>
    );
}