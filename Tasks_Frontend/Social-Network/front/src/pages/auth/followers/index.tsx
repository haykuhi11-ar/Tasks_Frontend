import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../helpers/hooks/useAuth";
import { Image } from "../../../helpers/UI/Image";

export const Followers = () => {
    const [user] = useAuth();
    const navigate = useNavigate();
    const followers = user?.followers ?? [];

    return (
        <div
            className="
                min-h-screen relative flex justify-center px-4 py-10
                bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 overflow-hidden
            "
        >
            {/* BACKGROUND GLOW */}
            <div className="absolute w-[600px] h-[600px] bg-blue-600/40 rounded-full blur-[160px] top-[-180px] left-[-180px]" />
            <div className="absolute w-[500px] h-[500px] bg-indigo-500/30 rounded-full blur-[140px] bottom-[-160px] right-[-160px]" />

            <div className="relative z-10 w-full max-w-4xl">

                {/* HEADER */}
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-semibold text-white tracking-wide">
                        Followers
                    </h1>

                    <input
                        placeholder="Search users..."
                        className="
                            px-4 py-2 rounded-xl
                            bg-white/10 border border-white/15
                            text-white placeholder-white/40
                            focus:outline-none focus:border-blue-500
                        "
                    />
                </div>

                {/* LIST */}
                <div className="space-y-4">

                    {followers.map((f) => (
                        <div
                            key={f.sender.id}
                            onClick={() => navigate(`/profile/view/${f.sender.username}`)}
                            className="
                                flex items-center justify-between p-4
                                rounded-2xl
                                bg-white/10 backdrop-blur-xl
                                border border-white/15
                                shadow-[0_20px_80px_rgba(0,0,0,0.5)]
                                hover:bg-white/15 transition
                            "
                        >

                            {/* USER INFO */}
                            <div className="flex items-center gap-4">

                                <Image src={f.sender.avatar} />

                                <div>
                                    <p className="text-white font-medium">
                                        {f.sender.firstName} {f.sender.lastName}
                                    </p>

                                    <p className="text-white/40 text-sm">
                                        @{f.sender.username}
                                    </p>
                                </div>
                            </div>

                            {/* ACTION */}
                            <button
                                className="
                                    px-4 py-2 rounded-xl
                                    font-medium text-white
                                    bg-white/10 border border-white/15
                                    hover:bg-white/20
                                    transition-all duration-300
                                "
                            >
                                Remove
                            </button>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
};