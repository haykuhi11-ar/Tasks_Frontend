import { useContext } from "react";
import { TodoContext } from "../context/context";

export default function Filter() {
    const context = useContext(TodoContext);
    if (!context) throw new Error("Out of provider...");

    const { setFilter } = context;

    return (
        <div className="card shadow-sm border-0 rounded-4 p-3 mb-4">
            <h3 className="fs-5 fw-bold mb-3 text-dark">
                Filter
            </h3>
            <div className="bg-light p-1 rounded-pill d-flex gap-1 shadow-sm">
                <button
                    className="btn btn-outline-success rounded-pill px-3"
                    onClick={() => setFilter("active")}
                >
                    Active
                </button>
                <button
                    className="btn btn-outline-primary rounded-pill px-3"
                    onClick={() => setFilter("completed")}
                >
                    Completed
                </button>
                <button
                    className="btn btn-outline-dark rounded-pill px-3"
                    onClick={() => setFilter("all")}
                >
                    All
                </button>
            </div>

        </div>
    );
}