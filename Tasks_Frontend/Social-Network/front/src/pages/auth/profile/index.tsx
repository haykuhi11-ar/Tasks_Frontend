import { useNavigate, useOutletContext } from "react-router-dom";
import type { Account, Context } from "../../../helpers/types";
import type React from "react";
import { ImagePicker } from "./components/Image-picker";
import { usePatch } from "../../../helpers/hooks/usePatch";
import { GetPosts } from "../posts/components/GetPosts";

export const Profile = () => {
    const { user } = useOutletContext<Context>();
    const navigate = useNavigate();
    const { patch } = usePatch<Account>()


    const handleBio = (e: React.FocusEvent<HTMLDivElement>) => {
        const updateData = e.currentTarget.innerText;

        if (updateData === user?.bio) return;

        patch("/account/bio", { bio: updateData })
    }
    return (
        <div className="flex flex-col items-center min-h-[80vh] gap-8 py-10 px-4">

            {/* PROFILE CARD */}
            <div
                onClick={() => navigate(`/profile/view/${user.username}`)}
                className="
                w-full max-w-md
                bg-white/10 backdrop-blur-xl
                border border-white/10
                rounded-3xl
                p-8
                shadow-2xl
                text-center
                cursor-pointer
                hover:bg-white/[0.12]
                transition-all duration-300
            "
            >
                <div onClick={(e) => e.stopPropagation()} className="relative mx-auto w-fit">
                    <ImagePicker />
                </div>

                <h2 className="mt-6 text-3xl font-bold bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
                    {user.firstName} {user.lastName}
                </h2>

                <p className="text-white/40 text-sm mt-1">@{user.username}</p>

                <div className="mt-6 grid grid-cols-3 gap-4">
                    <div className="bg-white/5 rounded-xl p-4">
                        <p className="text-2xl font-bold text-white">{user.posts.length}</p>
                        <p className="text-white/60 text-sm">Posts</p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4">
                        <p className="text-2xl font-bold text-white">{user.followers.length}</p>
                        <p className="text-white/60 text-sm">Followers</p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4">
                        <p className="text-2xl font-bold text-white">{user.followings.length}</p>
                        <p className="text-white/60 text-sm">Following</p>
                    </div>
                </div>

                <div onClick={(e) => e.stopPropagation()} className="mt-6 text-left">
                    <label className="text-xs font-semibold text-white/40 uppercase tracking-wider block mb-2 px-1">
                        Bio
                    </label>
                    <div
                        contentEditable
                        spellCheck={false}
                        onBlur={handleBio}
                        className="
                        w-full min-h-[60px] px-4 py-2
                        text-sm text-white/80 leading-relaxed
                        rounded-2xl bg-transparent border border-transparent
                        outline-none transition-all duration-300
                        focus:bg-white/5 focus:backdrop-blur-md
                        focus:border-white/10 focus:p-4
                        focus:ring-2 focus:ring-pink-500/20
                    "
                    >
                        {user.bio}
                    </div>
                </div>
            </div>

            {/* POSTS GRID */}
            <div className="w-full max-w-7xl">
                <h3 className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-4 px-1">
                    Posts
                </h3>

                <GetPosts />
            </div>
        </div>
    );
};