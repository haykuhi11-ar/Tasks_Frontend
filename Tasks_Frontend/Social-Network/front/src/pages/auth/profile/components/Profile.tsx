import { useParams } from "react-router-dom"
import { useGet } from "../../../../helpers/hooks/useGet";
import type { Account } from "../../../../helpers/types";
import { BASE } from "../../../../config/api";
import { ImageModal } from "../../posts/components/Comments/ImageModal";
import { useState } from "react";

interface ProfileResponse {
    user: Account;
    requestSent: boolean;
    followStatus: boolean;
    followsMe: boolean;
}

export const UserProfile = () => {
    const { username } = useParams();
    const { data } = useGet<ProfileResponse>(`/account/${username}`);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const profileUser = data?.user;

    if (!profileUser) {
        return (
            <div className="text-white text-center mt-10">
                Loading...
            </div>
        );
    }

    const postsWithImages = profileUser.posts?.filter(post => post.postImage) ?? [];

    return (
        <div className="w-full max-w-7xl">
            <h3 className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-5 px-1">
                Posts
            </h3>

            {postsWithImages.length === 0 ? (
                <p className="text-white/30 text-center mt-6">No posts yet</p>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5">
                    {postsWithImages.map((post) => (
                        <div
                            key={post.id}
                            onClick={() => setSelectedImage(`${BASE}uploads/${post.postImage}`)}
                            className="
                        group
                        relative
                        aspect-square
                        overflow-hidden
                        rounded-2xl
                        bg-white/5
                        border border-white/10
                        shadow-md
                        cursor-pointer
                        transition-all
                        duration-300
                        hover:scale-[1.04]
                        hover:shadow-xl
                        hover:border-white/20
                    "
                        >
                            <img
                                src={`${BASE}uploads/${post.postImage}`}
                                alt={post.title}
                                className="
                            w-full h-full object-cover
                            transition duration-500
                            group-hover:scale-110
                        "
                            />

                            <div className="
                        absolute inset-0
                        bg-gradient-to-t from-black/40 via-transparent to-transparent
                        opacity-0 group-hover:opacity-100
                        transition
                    " />

                            <div className="
    absolute bottom-0 left-0 right-0
    p-3
    text-white
    opacity-0 group-hover:opacity-100
    transition
    bg-gradient-to-t from-black/70 via-black/40 to-transparent
">
                                <p className="text-xs font-semibold truncate">
                                    {post.title}
                                </p>

                                {post.description && (
                                    <p className="text-[11px] text-white/70 mt-1 line-clamp-2">
                                        {post.description}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <ImageModal
                isOpen={!!selectedImage}
                image={selectedImage}
                onClose={() => setSelectedImage(null)}
            />
        </div>

    );
}