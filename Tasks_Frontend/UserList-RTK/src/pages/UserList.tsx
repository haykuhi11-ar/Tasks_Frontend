import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { useEffect } from "react";
import { deleteUser, getUsers } from "../features/users/UsersSlice";
import style from "./UserList.module.css";

export const UserList = () => {
    const dispatch = useAppDispatch();
    const { users, loading, error } = useAppSelector((state) => state.users);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    const handleDelete = (e: React.MouseEvent, id: number) => {
        e.stopPropagation();
        dispatch(deleteUser(id));

        if (loading) {
            <p className={style.loading}>Loading...</p>
        }

        if (error) {
            <h1 className={style.title}>Error 404: Something went wrong</h1>
        }
    }

    return <div className={style.container}>
        {users && users.length ? (
            <div className={style.tableContainer}>
                <h1 className={style.title}>User List</h1>

                <table className={style.table}>
                    <thead>
                        <tr>
                            <th>Full Name</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Address</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(user => (
                                <tr
                                    key={user.id}
                                    className={style.tableRow}
                                    onClick={() => navigate(`/edit/${user.id}`)}
                                >
                                    <td>{user.fullName}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.age}</td>
                                    <td>{user.address}</td>
                                    <td>
                                        <button className={style.deleteBtn} onClick={(e) => handleDelete(e, user.id)}>X</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>) : (<p className={style.noUsers}>No users found</p>)}
        <Link className={style.addLink} to="/add">
            + Add New User
        </Link>
    </div>
}