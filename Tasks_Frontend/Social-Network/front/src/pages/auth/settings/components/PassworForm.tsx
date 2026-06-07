import { useForm, type SubmitHandler } from "react-hook-form"
import { validatePassword } from "../../../../helpers/validatePassword";
import type { Context } from "../../../../helpers/types";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useState } from "react";
import { http } from "../../../../config/api";
import openEye from "../../../../helpers/icon/view.png";
import closeEye from "../../../../helpers/icon/hide.png";

type PasswordForm = {
    currentPassword: string,
    newPassword: string
}

export const PasswordForm = () => {
    const { handleSubmit, register, formState: { errors } } = useForm<PasswordForm>();
    const { user } = useOutletContext<Context>();
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const handleNewPassword: SubmitHandler<PasswordForm> = (data) => {
        setError('');

        if (data.currentPassword !== user.password) {
            setError("Wrong current password");
            return;
        }

        if (data.newPassword === user.password) return;

        http
            .patch('/account/settings/password', data)
            .then(() => navigate('/'))
            .catch(err => console.log(err));
    }

    return (
        <form onSubmit={handleSubmit(handleNewPassword)} className="space-y-4">

            {/* CURRENT PASSWORD */}
            <div className="relative">
                <input
                    type={showCurrentPassword ? "text" : "password"}
                    {...register("currentPassword")}
                    placeholder="Current password"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-10 text-white placeholder:text-white/40 focus:outline-none focus:border-blue-500"
                />

                <button
                    type="button"
                    onClick={() => setShowCurrentPassword(prev => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                    <img
                        src={showCurrentPassword ? closeEye : openEye}
                        alt="toggle"
                        className="w-5 h-5 opacity-70 hover:opacity-100 transition"
                    />
                </button>
            </div>

            {error && <p className="text-sm text-pink-400">{error}</p>}

            {/* NEW PASSWORD */}
            <div className="relative">
                <input
                    type={showNewPassword ? "text" : "password"}
                    {...register("newPassword", {
                        validate: (value) => validatePassword(value, user.username)
                    })}
                    placeholder="New password"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-10 text-white placeholder:text-white/40 focus:outline-none focus:border-blue-500"
                />

                <button
                    type="button"
                    onClick={() => setShowNewPassword(prev => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                    <img
                        src={showNewPassword ? closeEye : openEye}
                        alt="toggle"
                        className="w-5 h-5 opacity-70 hover:opacity-100 transition"
                    />
                </button>
            </div>

            {errors.newPassword && (
                <p className="text-sm text-pink-400">
                    {errors.newPassword.message}
                </p>
            )}

            <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold"
            >
                Save Password
            </button>
        </form>
    );
}