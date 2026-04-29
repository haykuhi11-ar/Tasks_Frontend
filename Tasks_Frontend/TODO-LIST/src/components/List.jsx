import ToDoItem from "./Todo-item";

export default function List({
    todos, 
    deleteTask, 
    toggleTask, 
    deleteAll, 
    completeAll, 
    revertAll}) {
    return (
        <>
            <table className="table table-dark table-striped my-4">
                <thead>
                    <tr>
                        <th>Tasks</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map(todo => (
                            <ToDoItem 
                            key={todo.id}
                            task={todo}
                            deleteTask={deleteTask}
                            toggleTask={toggleTask}
                            />
                    ))}
                </tbody>
            </table>

            <div className="mb-3 d-flex gap-2">
                <button className="btn btn-danger" onClick={() => deleteAll()}>
                    Delete All
                </button>

                <button className="btn btn-success" onClick={() => completeAll()}>
                    Complete All
                </button>

                <button className="btn btn-secondary" onClick={() => revertAll()}>
                    Revert All
                </button>
            </div>
        </>
    );
}