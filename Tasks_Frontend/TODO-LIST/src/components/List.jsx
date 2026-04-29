import ToDoItem from "./Todo-item";

export default function List({todos, deleteTask, toggleTask}) {
    return (
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
    );
}