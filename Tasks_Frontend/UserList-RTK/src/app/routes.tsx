import { createBrowserRouter } from "react-router-dom"
import { UserList } from "../pages/UserList"
import { AddUser } from "../pages/AddUserPage"
import { EditUser } from "../pages/EditUserPage"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <UserList />, 
    },
    {
        path: "/add",
        element: <AddUser />
    },
    {
        path: "/edit/:id",
        element: <EditUser />
    }
]);