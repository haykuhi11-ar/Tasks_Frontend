import { useEffect, useState } from "react";
import AddToDo from "./Add-Todo";
import List from "./List";
import axios from "axios";

export default function ToDoList(){
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        axios
        .get("https://jsonplaceholder.typicode.com/todos?_limit=10")
        .then(response => setTodos(response.data));
    }, []);

    const addTask = (task) => {
        setTodos([...todos, task]);
    }

    const deleteTask = (id) => {
        setTodos(todos.filter(task => task.id !== id));
    }

    const toggleTask = (id) => {
        setTodos(todos.map(task => 
            task.id === id ? {...task, completed: !task.completed} : task
        ));
    }


    return (
        <>
            <AddToDo addTask={addTask} />
            <List 
                todos={todos}
                deleteTask={deleteTask}
                toggleTask={toggleTask}
            />
        </>
    );
}