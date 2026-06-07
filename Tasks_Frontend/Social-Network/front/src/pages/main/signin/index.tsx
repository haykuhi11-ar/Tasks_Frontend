import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import type { User } from "../../../helpers/types";
import { http } from "../../../config/api";
import axios from "axios";
import { useState } from "react";
import openEye from "../../../helpers/icon/view.png";
import closeEye from "../../../helpers/icon/hide.png";

type AuthUser = Pick<User, 'username' | 'password'>

export const Signin = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<AuthUser>();
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin: SubmitHandler<AuthUser> = (data) => {
        http
            .post<{ token: string }>("/auth/signin", data)
            .then(response => {
                localStorage.setItem("token", response.data.token);
                navigate('/profile');
            })
            .catch(err => {
                if (axios.isAxiosError(err)) {
                    const responseData = err.response?.data as { message?: string } | undefined;
                    setError(responseData?.message || "Please try again.");
                } else {
                    setError("Internal server error.");
                }
            }); 
    }
    return (
        <div className="relative min-h-screen flex items-center justify-center 
                  bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 px-4 overflow-hidden">

            {/* glow */}
            <div className="absolute w-[550px] h-[550px] bg-pink-500/50 rounded-full blur-[150px] top-[-120px] left-[-120px]" />
            <div className="absolute w-[550px] h-[550px] bg-blue-500/50 rounded-full blur-[150px] bottom-[-140px] right-[-140px]" />

            {/* Card */}
            <form
            onSubmit={handleSubmit(handleLogin)}
                className="relative z-10 w-full max-w-md p-10 rounded-3xl
                 bg-white/10 backdrop-blur-3xl
                 border border-white/25
                 shadow-[0_25px_100px_rgba(0,0,0,0.7)]"
            >

                <h1 className="text-4xl font-semibold text-center text-white mb-8 tracking-wide">
                    Welcome Back
                </h1>

                <div className="flex flex-col gap-5">
                    {error && <p className="text-sm text-pink-400 mt-1 flex items-center gap-1 animate-pulse">{error}</p>}

                    {/* Username */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-white/80">
                            Username
                        </label>

                        <input
                            type="text"
                            placeholder="Enter your username"
                            className="px-4 py-3 rounded-xl bg-white/10 border border-white/20
                                text-white placeholder-white/40
                                focus:outline-none focus:ring-4 focus:ring-pink-500/80
                                focus:border-pink-400
                                transition"
                       {...register("username", {required: "Please fill username."})}
                        />
                        {errors.username && <p className="text-sm text-pink-400 mt-1 flex items-center gap-1 animate-pulse">{errors.username.message}</p>}
                    </div>

                    {/* Password */}
                    <div className="flex flex-col gap-2 relative">
                        <label className="text-sm text-white/80">
                            Password
                        </label>

                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className="px-4 py-3 pr-10 rounded-xl bg-white/10 border border-white/20
                                text-white placeholder-white/40
                                focus:outline-none focus:ring-4 focus:ring-blue-500/80
                                focus:border-blue-400
                                transition"
                            {...register("password", { required: "Please fill password." })}
                        />

                        {/* EYE BUTTON */}
                        <button
                            type="button"
                            onClick={() => setShowPassword(prev => !prev)}
                            className="absolute right-3 top-[68%] -translate-y-1/2"
                        >
                            <img
                                src={showPassword ? closeEye : openEye}
                                alt="toggle password visibility"
                                className="w-5 h-5 opacity-70 hover:opacity-100 transition"
                            />
                        </button>

                        {errors.password && (
                            <p className="text-sm text-pink-400 mt-1 flex items-center gap-1 animate-pulse">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* SIGN IN BUTTON */}
                    <button
                        type="submit"
                        className="mt-4 py-3 rounded-xl font-semibold text-white
                            bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500
                            hover:scale-[1.03] active:scale-[0.98]
                            transition-all duration-300
                            shadow-[0_15px_50px_rgba(236,72,153,0.35)]"
                    >
                        Sign In
                    </button>

                </div>

                {/* Link */}
                <div className="mt-6 text-center text-white/70 text-sm">
                    <p>Don’t have an account?</p>

                    <Link
                        to="/signup"
                        className="inline-block mt-2 text-pink-400 font-medium
                     hover:text-blue-400 transition-colors duration-300
                     relative after:content-[''] after:block after:h-[2px]
                     after:bg-gradient-to-r after:from-pink-500 after:to-blue-500
                     after:scale-x-0 hover:after:scale-x-100
                     after:transition-transform after:duration-300"
                    >
                        Create account →
                    </Link>
                </div>
            </form>
        </div>
    );
};