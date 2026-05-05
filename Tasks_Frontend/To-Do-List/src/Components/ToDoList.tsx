import { useEffect, useState } from "react";
import { AddToDo } from "./AddToDo";
import { FilterToDo } from "./FilterToDo";
import { List } from "./List";
import type { ToDo } from "./types/todo";
import { Api } from "../utility/api";

export  const ToDoList = () => {
    const [todos, setTodos] = useState<ToDo[]>([]);
    const [nextId, setNextId] = useState(110);
    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')


    useEffect(() => {
        Api.get<ToDo[]>("/todos")
        .then(response => {
            setTodos(response.data)
        }
        )
    },[]);

    const filteredToDos = todos.filter(todo => {
            if (filter === 'active') return !todo.completed;
            if (filter === 'completed') return todo.completed;
            return true;
    });
        
    const deleteToDo = (id: string) => {
        setTodos(prev => prev.filter(todo => todo.id !== id));
    }

    const addToDo = (newTodo: Omit<ToDo, "id">) => {
        const todoWithId = {
            ...newTodo,
            id: `${nextId}`
        }

        setTodos(prev => [...prev, todoWithId]);
        setNextId(prev => prev + 1);
    }

    const completedToDo = (id: string) => {
        setTodos(prev => 
            prev.map(todo => 
                todo.id === id ? {...todo, completed: !todo.completed} : todo
        ));
    }

    return (
        <div>
            <h1 className="h1">ToDoList</h1>
            <AddToDo 
            addToDo={addToDo}
            />
            <FilterToDo 
            onFilter={setFilter}
            />
            <List 
                todos={filteredToDos}
                onDelete={deleteToDo}
                onCompleted={completedToDo}
            />
        </div>
    );
}