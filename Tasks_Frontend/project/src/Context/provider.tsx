import { useState } from "react";
import type { Filter, User } from "./types";
import { UserContext } from "./context";

type Props = {
    children: React.ReactElement
}
export const ContextProvider:React.FC<Props> = ({children}) => {
    const [users, setUsers] = useState<User[]>([
        { id: 101, name: 'James', age: 56, salary: 1200, image: ''},
        { id: 102, name: 'Jorj', age: 34, salary: 4200, image: ''},
        { id: 105, name: 'Annet', age: 23, salary: 2200, image: ''}
    ]);

    const [filter, setFilter] = useState<Filter>("table");

    const addUser = (user: User) => {
        const newUser = {
            ...user,
            id: Math.max(...users.map(user => user.id)) + 1,
        }
        setUsers([...users, newUser]);
    }

    const deleteUser = (id: number) => {
        setUsers(prevUsers => prevUsers.filter(users => users.id !== id));
    }

    const salaryDown = (id: number) => {
        setUsers(prevUsers => 
            prevUsers.map(user => 
                user.id === id 
                ? {...user, salary: user.salary - 100}
                : user
            )
        )
    }

    const salaryUp = (id: number) => {
        setUsers(prevUsers => 
            prevUsers.map(user => 
                user.id === id 
                ? {...user, salary: user.salary + 100}
                : user
            )
        )
    }

    return (
        <UserContext.Provider value={{
            users,
            addUser,
            deleteUser,
            salaryDown,
            salaryUp,
            filter,
            setFilter
        }}>
            {children}
        </UserContext.Provider>
    );
}