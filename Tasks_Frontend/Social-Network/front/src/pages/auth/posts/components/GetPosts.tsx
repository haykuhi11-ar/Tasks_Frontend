import { useEffect, useState } from "react";
import { useAuth } from "../../../../helpers/hooks/useAuth"
import type { Post, ResponsePost } from "../../../../helpers/types"
import { DeletePost } from "./DeletePost";
import { BASE, http } from "../../../../config/api";
import { Comments } from "./Comments/Comments";
import { LikeButton } from "./LikeButton";
import { ImageModal } from "./Comments/ImageModal";

export const GetPosts = () => {
    const [user] = useAuth();
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleDeleted = (deletedId: number) => {
        setPosts((prev) => prev.filter(p => p.id !== deletedId));
    }

    const refreshPost = async (postId: number) => {
        const response = await http.get<ResponsePost>(`/posts/${postId}`);
        setPosts(prev =>
            prev.map(p =>
                p.id === postId ? response.data.postInfo : p
            )
        );
    }

    useEffect(() => {
        if (!user?.posts) {
            setLoading(false);
            return;
        }

        const load = async () => {
            setLoading(true);
            try {
                const results = await Promise.all(
                    user.posts.map((p: Post) =>
                        http.get<ResponsePost>(`/posts/${p.id}`)
                    )
                );
                setPosts(results.map(r => r.data.postInfo));
            } catch (err) {
                console.error("Failed to fetch posts:", err);
            } finally {
                setLoading(false);
            }
        };

        load();
    }, [user?.posts]);

    if (loading) {
        return (
            <div className="text-white/40 text-center mt-6">
                Loading posts...
            </div>
        );
    }

    if (!posts.length) {
        return (
            <div className="mt-8 bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center">
                <p className="text-white/40 text-lg">No posts yet</p>
            </div>
        );
    }

    return (
        <>
            <h2 className="text-2xl font-bold text-white mb-6">
                Posts
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <div
                        key={post.id}
                        className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 h-fit"
                    >
                        <h3 className="text-white text-lg font-semibold">
                            {post.title}
                        </h3>

                        <p className="text-white/70 mt-2">
                            {post.description}
                        </p>

                        {post.postImage && (
                            <img
                                src={`${BASE}uploads/${post.postImage}`}
                                alt={post.title}
                                onClick={() => setSelectedImage(`${BASE}uploads/${post.postImage}`)}
                                className="mt-4 w-full h-64 object-cover rounded-2xl cursor-pointer"
                            />
                        )}

                        <Comments
                            postId={post.id}
                            postComments={post.postComments ?? []}
                            onRefresh={() => refreshPost(post.id)}
                        />

                        <div className="flex justify-between mt-4">
                            <DeletePost
                                postId={post.id}
                                onDeleted={() => handleDeleted(post.id)}
                            />
                        </div>

                        <div className="flex gap-6 mt-4 text-white/40 text-sm">
                            <LikeButton post={post} />
                        </div>
                    </div>
                ))}
            </div>

            <ImageModal
                isOpen={!!selectedImage}
                image={selectedImage}
                onClose={() => setSelectedImage(null)}
            />
        </>
    );
};