import { useCallback, useState } from "react";
import { CreatePost } from "./components/CreatePost";
import { GetPosts } from "./components/GetPosts";

export const PostPage = () => {
    const [refreshKey, setRefreshKey] = useState(0);

    const handleCreated = useCallback(() => {
        setRefreshKey((prev) => prev + 1);
    }, []);

    return (
        <div
            className="
            relative
            min-h-screen
            bg-gradient-to-br
            from-slate-950
            via-blue-950
            to-slate-900
            overflow-hidden
        "
        >
            <div
                className="
                absolute
                w-[650px]
                h-[650px]
                rounded-full
                bg-blue-600/40
                blur-[180px]
                top-[-200px]
                left-[-200px]
            "
            />

            <div
                className="
                absolute
                w-[650px]
                h-[650px]
                rounded-full
                bg-indigo-500/40
                blur-[180px]
                bottom-[-250px]
                right-[-200px]
            "
            />

            <div
                className="
                relative
                z-10
                max-w-5xl
                mx-auto
                px-6
                py-10
            "
            >
                {/* Header */}
                <div
                    className="
                    mb-8
                    rounded-3xl
                    border
                    border-white/15
                    bg-white/10
                    backdrop-blur-3xl
                    p-8
                    shadow-[0_20px_80px_rgba(0,0,0,0.45)]
                "
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <h1
                                className="
                                text-4xl
                                font-bold
                                text-white
                                tracking-wide
                            "
                            >
                                Posts
                            </h1>

                            <p className="mt-2 text-white/50">
                                Share your thoughts, photos and ideas.
                            </p>
                        </div>

                        <div
                            className="
                            hidden
                            md:flex
                            items-center
                            justify-center
                            w-16
                            h-16
                            rounded-2xl
                            bg-blue-500/20
                            border
                            border-blue-400/30
                        "
                        >
                            <span className="text-2xl">✨</span>
                        </div>
                    </div>
                </div>

                {/* Create Post */}
                <div
                    className="
                    rounded-3xl
                    border
                    border-white/15
                    bg-white/10
                    backdrop-blur-3xl
                    p-6
                    shadow-[0_20px_80px_rgba(0,0,0,0.45)]
                "
                >
                    <div className="mb-5">
                        <h2 className="text-xl font-semibold text-white">
                            Create Post
                        </h2>

                        <p className="text-white/40 text-sm mt-1">
                            Publish something for your followers.
                        </p>
                    </div>

                    <CreatePost onCreated={handleCreated} />
                </div>

                {/* Posts Feed Placeholder */}
                <div className="mt-8">
                    <div
                        className="
                        rounded-3xl
                        border
                        border-white/15
                        bg-white/10
                        backdrop-blur-3xl
                        p-8
                        min-h-[600px]
                        shadow-[0_20px_80px_rgba(0,0,0,0.45)]
                    "
                    >
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-semibold text-white">
                                Feed
                            </h2>

                            <div
                                className="
                                px-4
                                py-2
                                rounded-xl
                                bg-blue-500/15
                                border
                                border-blue-400/20
                                text-blue-200
                                text-sm
                            "
                            >
                                Latest Posts
                            </div>
                        </div>

                        <GetPosts key={refreshKey} />
                    </div>
                </div>
            </div>
        </div>
    );
}