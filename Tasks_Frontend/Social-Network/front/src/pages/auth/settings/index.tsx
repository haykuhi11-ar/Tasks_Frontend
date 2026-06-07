import { useState } from "react";
import { PrivacyForm } from "./components/PrivacyForm";
import { PasswordForm } from "./components/PassworForm";

export const Settings = () => {
    const [showPasswordForm, setShowPasswordForm] = useState(false);

    return (
        <div className="flex justify-center py-10 px-4">
            <div
                className="
                    w-full max-w-3xl
                    bg-white/10
                    backdrop-blur-xl
                    border border-white/10
                    rounded-3xl
                    p-8
                    shadow-2xl
                "
            >
                <h1
                    className="
                        text-4xl
                        font-bold
                        text-center
                        bg-gradient-to-r
                        from-blue-400
                        via-cyan-400
                        to-blue-600
                        bg-clip-text
                        text-transparent
                    "
                >
                    Settings
                </h1>

                <p className="text-center text-white/60 mt-2">
                    Manage your account preferences
                </p>

                <div className="mt-10 space-y-6">
                    <div
                        className="
                            bg-white/5
                            border border-white/10
                            rounded-2xl
                            owerflow-hidden
                        "
                    >
                        <button
                            type="button"
                            onClick={() => setShowPasswordForm(prev => !prev)}
                            className="
                                w-full
                                flex
                                items-center
                                justify-between
                                p-6
                                text-left
                            "
                        >
                            <div className="flex items-center gap-3 mb-5">
                                <span className="text-2xl">🔒</span>

                                <div>
                                    <h2 className="text-xl font-semibold text-white">
                                        Change Password
                                    </h2>

                                    <p className="text-sm text-white/60">
                                        Update your password to keep your account secure.
                                    </p>
                                </div>
                            </div>

                            <span
                                className={`
                text-white text-2xl transition-transform duration-300
                ${showPasswordForm ? "rotate-180" : ""}
            `}
                            >
                                ⌄
                            </span>
                        </button>

                        {showPasswordForm && (
                            <div className="px-6 pb-6 border-t border-white/10">
                                <div className="pt-6">
                                    <PasswordForm />
                                </div>
                            </div>
                        )}
                    </div>

                    <PrivacyForm />
                </div>
            </div>
        </div>
    );
};