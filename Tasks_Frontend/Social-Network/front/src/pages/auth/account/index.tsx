import { useParams } from "react-router-dom";
import { useGet } from "../../../helpers/hooks/useGet";
import type { ResponseAccount } from "../../../helpers/types";
import { Image } from "../../../helpers/UI/Image";
import { Follow } from "./components/Follow";
import { UserProfile } from "../profile/components/Profile";


export const Account = () => {
    const { username } = useParams();

    const { loading, data, error, refetch } = useGet<ResponseAccount>(`/account/${username}`);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[300px]">
                <p className="text-white text-lg animate-pulse">
                    Loading...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-[300px]">
                <p className="text-sm text-pink-400 flex items-center gap-1 animate-pulse">
                    {error}
                </p>
            </div>
        );
    }

    return data && (
    <div className="max-w-5xl mx-auto px-4 py-8">
        <div
            className="
                bg-white/10
                backdrop-blur-xl
                border border-white/10
                rounded-3xl
                p-8
                shadow-2xl
            "
        >
            {/* Header */}
            <div className="flex flex-col items-center text-center">
                <Image
                    src={data.user.avatar}
                    className="
                        w-40
                        h-40
                        rounded-full
                        object-cover
                        border-4
                        border-pink-500/60
                        shadow-lg
                    "
                />

                <h1
                    className="
                        mt-6
                        text-4xl
                        font-bold
                        bg-gradient-to-r
                        from-pink-500
                        to-blue-500
                        bg-clip-text
                        text-transparent
                    "
                >
                    {data.user.firstName} {data.user.lastName}
                </h1>

                <p className="text-white/50 mt-2">
                    @{data.user.username}
                </p>

                {data.user.bio && (
                    <p
                        className="
                            mt-6
                            max-w-2xl
                            text-white/80
                            leading-relaxed
                            bg-white/5
                            border border-white/10
                            rounded-2xl
                            p-4
                        "
                    >
                        {data.user.bio}
                    </p>
                )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8">
                <div
                    className="
                        bg-white/5
                        border border-white/10
                        rounded-2xl
                        p-5
                        text-center
                    "
                >
                    <p className="text-3xl font-bold text-white">
                        {data.user.posts?.length || 0}
                    </p>

                    <p className="text-white/60 text-sm mt-1">
                        Posts
                    </p>
                </div>

                <div
                    className="
                        bg-white/5
                        border border-white/10
                        rounded-2xl
                        p-5
                        text-center
                    "
                >
                    <p className="text-3xl font-bold text-white">
                        {data.user.followers?.length || 0}
                    </p>

                    <p className="text-white/60 text-sm mt-1">
                        Followers
                    </p>
                </div>

                <div
                    className="
                        bg-white/5
                        border border-white/10
                        rounded-2xl
                        p-5
                        text-center
                    "
                >
                    <p className="text-3xl font-bold text-white">
                        {data.user.followings?.length || 0}
                    </p>

                    <p className="text-white/60 text-sm mt-1">
                        Following
                    </p>
                </div>
            </div>

                {/* Follow status */}
                <Follow 
                    userId={data.user.id}
                    data={data}
                    refetch={refetch}
                />

            </div>

            {/* Posts Section */}
            <div
            className="
                mt-8
                bg-white/10
                backdrop-blur-xl
                border border-white/10
                rounded-3xl
                p-8
                shadow-2xl
            "
        >
            <div className="flex items-center justify-between mb-6">
                <h2
                    className="
                        text-2xl
                        font-bold
                        text-white
                    "
                >
                    Posts
                </h2>
            </div>

           <div
    className="
        min-h-[350px]
        rounded-3xl
        bg-black/40
        backdrop-blur-2xl
        border
        border-blue-500/20
        shadow-[0_0_80px_rgba(59,130,246,0.18)]
        p-5
        relative
        overflow-hidden
    "
>
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-indigo-500/10 pointer-events-none" />

    <div className="relative">
        <UserProfile/>
    </div>
</div>
        </div>
    </div>
);
};