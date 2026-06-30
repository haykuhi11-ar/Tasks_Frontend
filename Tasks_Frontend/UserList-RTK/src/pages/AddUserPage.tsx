import { Link } from "react-router-dom";
import { useAppDispatch } from "../app/hooks"
import { useForm } from "react-hook-form";
import { User } from "../types/user";
import { addUser } from "../features/users/UsersSlice";
import style from "./AddUserPage.module.css";

export const AddUser = () => {
    const dispatch = useAppDispatch();

    const { register, reset, handleSubmit, formState: { errors } } = useForm<User>();

    const onSubmit = (data: User) => {
        const newUser = {
            ...data,
            age: Number(data.age)
        };

        if (newUser) {
            dispatch(addUser(newUser))
                .unwrap()
                .then(() => reset());
        }
    }

    return (
        <div className={style.container}>
            <h2 className={style.title}>Add User</h2>

            <form className={style.form} onSubmit={handleSubmit(onSubmit)} >
                <div className={style.field}>
                    <label className={style.label}>Full Name</label>
                    <input
                        className={style.input}
                        type="text"
                        {...register("fullName", { required: "Full name is required" })}
                    />
                    {errors.fullName && <p className={style.error}>{errors.fullName.message}</p>}
                </div>

                <div className={style.field}>
                    <label className={style.label}>Username</label>
                    <input
                        className={style.input}
                        type="text"
                        {...register("username", { required: "Username is required" })}
                    />
                    {errors.username && <p className={style.error}>{errors.username.message}</p>}
                </div>

                <div className={style.field}>
                    <label className={style.label}>Email</label>
                    <input
                        className={style.input}
                        type="text"
                        {...register("email", { required: "Email is required" })}
                    />
                    {errors.email && <p className={style.error}>{errors.email.message}</p>}
                </div>

                <div className={style.field}>
                    <label className={style.label}>Age</label>
                    <input
                        className={style.input}
                        type="number"
                        {...register("age", { required: "Age is required" })}
                    />
                    {errors.age && <p className={style.error}>{errors.age.message}</p>}
                </div>

                <div className={style.field}>
                    <label className={style.label}>Address</label>
                    <input
                        className={style.input}
                        type="text"
                        {...register("address", { required: "" })}
                    />
                    {errors.address && <p className={style.error}>{errors.address.message}</p>}
                </div>

                <div className={style.actions}>
                    <button className={style.submitBtn} type="submit">Add</button>
                    <button className={style.cancelBtn} type="button" onClick={() => reset()}>Cancel</button>
                </div>
            </form>
            <Link className={style.link} to={"/"} >User List</Link>
        </div>
    )
}