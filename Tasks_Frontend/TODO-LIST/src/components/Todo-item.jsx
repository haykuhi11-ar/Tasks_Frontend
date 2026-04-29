export default function ToDoItem({task, deleteTask, toggleTask}) {
    return (
        <tr>
            <td>{task.title}</td>
            <td>
                <button 
                    className="btn btn-success btn-sm me-2"
                    onClick={() => toggleTask(task.id)}>
                        {task.completed ? "Undo" : "Done"}
                </button>

                <button 
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteTask(task.id)}>
                        Delete
                </button>
            </td>
        </tr>
    );
}