import { useNavigate } from "react-router-dom";
import { Image } from "../../../helpers/UI/Image";
import { useAuth } from "../../../helpers/hooks/useAuth";

export const Followings = () => {
    const [user] = useAuth();
    const navigate = useNavigate();

    const followings = user?.followings ?? [];

    return (
        <div className="min-h-screen relative flex justify-center px-4 py-10
                        bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 overflow-hidden">

            <div className="absolute w-[600px] h-[600px] bg-blue-600/40 rounded-full blur-[160px] top-[-180px] left-[-180px]" />
            <div className="absolute w-[500px] h-[500px] bg-indigo-500/30 rounded-full blur-[140px] bottom-[-160px] right-[-160px]" />

            <div className="relative z-10 w-full max-w-4xl">

                {/* HEADER */}
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-semibold text-white tracking-wide">
                        Followings
                    </h1>

                    <input
                        placeholder="Search users..."
                        className="px-4 py-2 rounded-xl
                                   bg-white/10 border border-white/15
                                   text-white placeholder-white/40
                                   focus:outline-none focus:border-blue-500"
                    />
                </div>

                {/* LIST */}
                <div className="space-y-4">

                    {followings.map((u) => (
                        <div
                            key={u.receiver.id}
                            onClick={() => navigate(`/profile/view/${u.receiver.username}`)}
                            className="flex items-center justify-between p-4
                                       rounded-2xl
                                       bg-white/10 backdrop-blur-xl
                                       border border-white/15
                                       shadow-[0_20px_80px_rgba(0,0,0,0.5)]
                                       hover:bg-white/15 transition"
                        >

                            {/* USER INFO */}
                            <div className="flex items-center gap-4">

                                <Image
                                    src={u.receiver.avatar}
                                />
                                <div>
                                    <p className="text-white font-medium">
                                        {u.receiver.firstName} {u.receiver.lastName}
                                    </p>

                                    <p className="text-white/40 text-sm">
                                        @{u.receiver.username}
                                    </p>
                                </div>
                            </div>

                            <button className="px-4 py-2 rounded-xl font-medium text-white
                                               bg-gradient-to-r from-blue-600 to-indigo-500
                                               hover:scale-[1.05] active:scale-[0.98]
                                               transition-all duration-300
                                               shadow-[0_10px_40px_rgba(37,99,235,0.4)]">
                                Following
                            </button>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
};