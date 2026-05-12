import React, { useRef, useState } from "react"
import type { ToDo } from "./types"
import { TodoContext } from "./context";
import type { Filter } from "./types"

type Props = {
    children: React.ReactElement
}

export const ToDoService:React.FC<Props> = ({children}) => {
    const [todos, setTodos] = useState<ToDo[]>([
        { id: 101, text: "Go to the gym", completed: false},
        { id: 102, text: "Read a book", completed: true},
        { id: 103, text: "Watch a film", completed: false},

    ]);

    const [filter, setFilter] = useState<Filter>("all");
    const [error, setError] = useState<string | null>(null);

    let nextId = useRef(105);

    const removeTodo = (id:number) => {
        setTodos(todos.filter(todo => todo.id !== id));
    }

    const addTodo = (text: string) => {
        if (!text.trim()) {
            setError("Task input cannot be empty");
            return;
        }
        const newTodo = {
            id: nextId.current++,
            text: text,
            completed: false
        };
        setTodos(todos => [...todos, newTodo]);
        setError(null);
    }

    const completedTodo = (id: number) => {
        setTodos(todos => 
            todos.map(todo => 
                todo.id === id ? {...todo, completed: !todo.completed} : todo
            )
        );
    }

    return (
        <TodoContext.Provider 
        value={{todos, 
                removeTodo, 
                addTodo, 
                completedTodo, 
                filter, 
                setFilter, 
                error,
                setError
                }}>
            {children}
        </TodoContext.Provider> 
    );        
}