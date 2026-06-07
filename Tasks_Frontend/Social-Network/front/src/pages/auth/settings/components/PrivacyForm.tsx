import { useOutletContext } from "react-router-dom";
import type { Context } from "../../../../helpers/types";
import { http } from "../../../../config/api";

export const PrivacyForm = () => {
    const { user, setUser } = useOutletContext<Context>();

    const isPrivateHandler = () => {
        http
            .patch<{ isAccountPrivate: boolean }>("/account/privacy", {
                isAccountPrivate: !user.isAccountPrivate
            })
            .then(response => {
                setUser({
                    ...user, 
                    isAccountPrivate: response.data.isAccountPrivate
                });
            }) 
            .catch(() => {
                console.error("Failed to update privacy settings");
            })
    }
    
    return (
        <div
            className="
                            bg-white/5
                            border border-white/10
                            rounded-2xl
                            p-6
                        "
        >
            <div className="flex items-center gap-3">
                <span className="text-2xl">👁️</span>

                <div>
                    <h2 className="text-xl font-semibold text-white">
                        Privacy Settings
                    </h2>

                    <p className="text-sm text-white/60">
                        Control who can see your profile and content.
                    </p>
                </div>
            </div>

            <div
                className="
                                mt-6
                                flex items-center
                                justify-between
                                bg-white/5
                                rounded-xl
                                p-4
                            "
            >
                <div>
                    <p className="text-white font-medium">
                        {
                            user.isAccountPrivate ? "Private Account" : "Public Account"
                        }
                    </p>

                    <p className="text-sm text-white/60">
                        {
                            user.isAccountPrivate ? "Only followers can view your posts." : "Public account — anyone can see your content."
                        }
                    </p>
                </div>

                <button
                type="button"
                onClick={isPrivateHandler}
                    className="
                                    px-5 py-2
                                    rounded-xl
                                    bg-gradient-to-r
                                    from-blue-500
                                    to-cyan-500
                                    text-white
                                    font-medium
                                "
                >
                    {
                        user.isAccountPrivate ? "Public" : "Private"
                    }
                </button>
            </div>
        </div>
    );
};