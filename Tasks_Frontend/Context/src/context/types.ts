export interface ToDo {
    id: number,
    text: string,
    completed: boolean
}

export type Filter = "active" | "completed" | "all"

export interface ContextType {
    todos: ToDo[],
    removeTodo: (id:number) => void
    addTodo: (text: string) => void
    completedTodo: (id: number) => void
    filter: Filter
    setFilter: (filter: Filter) => void
    error: string | null
    setError: (error: string | null) => void
}