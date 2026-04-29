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

    const deleteAll = () => {
        setTodos([]);
    }

    const completeAll = () => {
        setTodos(prev => 
            prev.map(task => ({
                ...task,
                completed: true
            }))
        );
    }

    const revertAll = () => {
        setTodos(prev => 
            prev.map(task => ({
                ...task,
                completed: false
            }))
        );
    }


    return (
        <>
            <AddToDo addTask={addTask} />
            <List 
                todos={todos}
                deleteTask={deleteTask}
                toggleTask={toggleTask}
                deleteAll={deleteAll}
                completeAll={completeAll}
                revertAll={revertAll}
            />
        </>
    );
}