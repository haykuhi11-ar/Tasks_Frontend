import { Link, useNavigate, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectUserById, updateUser } from "../features/users/UsersSlice";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { User } from "../types/user";
import style from "./EditUserPage.module.css";

export const EditUser = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const userEdit = useAppSelector((state) => {
        return selectUserById(state, id!)
    });

    const { register, handleSubmit, reset, formState: { errors } } = useForm<User>()

    useEffect(() => {
        if (userEdit) {
            reset(userEdit);
        }
    }, [userEdit, reset]);

    const onSubmit = (data: User) => {
        if (id) {
            const updateData = {
                ...data,
                age: Number(data.age)
            };

            dispatch(updateUser({ id: Number(id), userData: updateData }))
                .unwrap()
                .then(() => { navigate("/") });
        }
    }
    if (!userEdit) {
        return <h1 className={style.noUsers}>User not found</h1>
    }

    return (
        <div className={style.container}>
            <h2 className={style.title}>{userEdit.fullName}</h2>
            <p className={style.subtext}>@{userEdit.username}</p>

            <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={style.field}>
                    <label className={style.label} htmlFor="fullName">Full Name</label>
                    <input
                        className={style.input}
                        id="fullName"
                        type="text"
                        {...register("fullName", { required: "Full name is required" })}
                    />
                    {errors.fullName && <p className={style.error}>{errors.fullName.message}</p>}
                </div>

                <div className={style.field}>
                    <label className={style.label} htmlFor="username">Username</label>
                    <input
                        className={style.input}
                        id="username"
                        type="text"
                        {...register("username", { required: "Username is required" })}
                    />
                    {errors.username && <p className={style.error}>{errors.username.message}</p>}
                </div>

                <div className={style.field}>
                    <label className={style.label} htmlFor="email">Email</label>
                    <input
                        className={style.input}
                        id="email"
                        type="text"
                        {...register("email", { required: "Email is required" })}
                    />
                    {errors.email && <p className={style.error}>{errors.email.message}</p>}
                </div>

                <div className={style.field}>
                    <label className={style.label} htmlFor="age">Age</label>
                    <input
                        className={style.input}
                        id="age"
                        type="number"
                        {...register("age", { required: "Age is required" })}
                    />
                    {errors.age && <p className={style.error}>{errors.age.message}</p>}
                </div>

                <div className={style.field}>
                    <label className={style.label} htmlFor="address">Address</label>
                    <input
                        className={style.input}
                        id="address"
                        type="text"
                        {...register("address", { required: "" })}
                    />
                    {errors.address && <p className={style.error}>{errors.address.message}</p>}
                </div>

                <div className={style.actions}>
                    <button className={style.submitBtn} type="submit"> Save </button>
                    <button className={style.cancelBtn} type="button" onClick={() => reset()}> Cancel </button>
                </div>
            </form>
            <Link className={style.link} to={"/"} >User List</Link>
        </div>
    )
}