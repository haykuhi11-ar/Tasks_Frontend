'use client'

import { User } from "@/app/(helpers)/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function AddUser() {
    const [message, setMessage] = useState("");
    const { register, handleSubmit, formState: { errors } } = useForm<Partial <User>>();
    const router = useRouter();

    const handleUserData = async (data: Partial<User>) => {
        try {
            await axios
                .post("/api/users", data)
            router.push('/');

        } catch (err) {
            if (axios.isAxiosError(err)) {
                setMessage(err.response?.data.message);
            }
        }
    };

    return (
        <div className="flex justify-center items-center mt-16 px-4">
            <div
                className="
                    w-full max-w-2xl
                    p-10
                    rounded-3xl
                    border border-yellow-500/20
                    bg-black/30
                    backdrop-blur-xl
                    shadow-[0_8px_32px_rgba(255,193,7,0.15)]
                    "
            >
                <h3 className="text-4xl font-bold text-yellow-300 text-center mb-10">
                    Add User
                </h3>

                <form 
                    className="space-y-6"
                    onSubmit={handleSubmit(handleUserData)}
                    >
                    <input
                        type="text"
                        {...register("firstName", {required: "First name is required"})}
                        placeholder="First Name"
                        className="
                            w-full
                            px-5 py-4
                            text-lg
                            rounded-2xl
                            bg-zinc-900/60
                            border border-yellow-500/20
                            text-white
                            placeholder:text-zinc-500
                            outline-none
                            transition-all
                            focus:border-yellow-400
                            focus:ring-2
                            focus:ring-yellow-400/20
                        "
                    />
                    {errors?.firstName && (
                        <p className="text-red-400 text-sm mt-1">
                            {errors.firstName.message}
                        </p>
                    )}

                    <input
                        type="text"
                        {...register("lastName", { required: "Last name is required" })}
                        placeholder="Last Name"
                        className="
                            w-full
                            px-5 py-4
                            text-lg
                            rounded-2xl
                            bg-zinc-900/60
                            border border-yellow-500/20
                            text-white
                            placeholder:text-zinc-500
                            outline-none
                            transition-all
                            focus:border-yellow-400
                            focus:ring-2
                            focus:ring-yellow-400/20
                        "
                    />
                    {errors?.lastName && (
                        <p className="text-red-400 text-sm mt-1">
                            {errors.lastName.message}
                        </p>
                    )}

                    <input
                        type="text"
                        {...register("position", {required: "Position is required"})}
                        placeholder="Position"
                        className="
                            w-full
                            px-5 py-4
                            text-lg
                            rounded-2xl
                            bg-zinc-900/60
                            border border-yellow-500/20
                            text-white
                            placeholder:text-zinc-500
                            outline-none
                            transition-all
                            focus:border-yellow-400
                            focus:ring-2
                            focus:ring-yellow-400/20
                        "
                    />
                    {errors?.position && (
                        <p className="text-red-400 text-sm mt-1">
                            {errors.position.message}
                        </p>
                    )}

                    <input
                        type="number"
                        {...register("salary", {required: "Salary is required", valueAsNumber: true})}
                        placeholder="Salary"
                        className="
                            w-full
                            px-5 py-4
                            text-lg
                            rounded-2xl
                            bg-zinc-900/60
                            border border-yellow-500/20
                            text-white
                            placeholder:text-zinc-500
                            outline-none
                            transition-all
                            focus:border-yellow-400
                            focus:ring-2
                            focus:ring-yellow-400/20
                        "
                    />
                    {errors?.salary && (
                        <p className="text-red-400 text-sm mt-1">
                            {errors.salary.message}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="
                            w-full
                            py-4
                            text-lg
                            font-bold
                            rounded-2xl
                            bg-gradient-to-r
                            from-yellow-500
                            via-amber-400
                            to-yellow-500
                            text-black
                            transition-all
                            duration-300
                            hover:scale-[1.02]
                            hover:shadow-[0_0_30px_rgba(255,193,7,0.5)]
                        "
                    >
                        Save User
                    </button>
                    {message && (
                        <p className="mt-4 rounded-xl bg-yellow-500/10 py-3 text-center text-yellow-300 border border-yellow-500/20">
                            {message}
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
}