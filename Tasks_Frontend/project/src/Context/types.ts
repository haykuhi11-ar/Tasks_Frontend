export interface User {
    id: number,
    name: string,
    age: number,
    salary: number,
    image: string
}

export interface TypeContext {
    users : User[],
    addUser: (user:User) => void,
    deleteUser: (id: number) => void,
    salaryDown: (id:number) => void,
    salaryUp: (id: number) => void,
    filter: Filter,
    setFilter: (filter: Filter) => void,
}

export type Filter = "grid" | "table"