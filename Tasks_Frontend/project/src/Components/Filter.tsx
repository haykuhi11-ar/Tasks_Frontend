import { useContext } from "react";
import { UserContext } from "../Context/context";

export const Filter = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error("Out of provider");

    const {setFilter} = context;

    return (
        <div
            className="card shadow-sm border-0-color dark  rounded-4 p-3 mb-4 my-3 mx-auto"
            style={{ maxWidth: "350px" }}
        >

            <div className="bg-light p-2 rounded-pill d-flex gap-2 justify-content-center">
                <button
                    onClick={() => setFilter("grid")}
                    className="btn btn-outline-success rounded-pill px-3"
                >
                    Show Grid
                </button>
                <button
                    onClick={() => setFilter("table")}
                    className="btn btn-outline-success rounded-pill px-3"
                >
                    Show Table
                </button>
            </div>
        </div>
        
    );
}