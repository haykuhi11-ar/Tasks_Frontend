import { useState } from "react"
import type { PostReaction, Post } from "../../../../helpers/types"
import { useAuth } from "../../../../helpers/hooks/useAuth"
import { http } from "../../../../config/api"


type Props = {
    post: Post
}

export const LikeButton = ({ post }: Props) => {
    const [reaction, setReaction] = useState<PostReaction[]>(post.postReactions ?? []);
    const [user] = useAuth();

    const isLiked = reaction.some(r => r.userId === user?.id);

    const handleLike = async () => {
        try {
            const response = await http
                .post<{
                    reactionStatus: Boolean,
                    reaction?: PostReaction
                }>(`/posts/${post.id}/likes`);

            if (response.data.reactionStatus &&
                response.data.reaction) {
                setReaction((prev) => [...prev, response.data.reaction!]);
            } else {
                setReaction((prev) => prev.filter(r => r.userId !== user?.id));
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <button
            onClick={handleLike}
            className={`text-sm transition-colors ${isLiked
                    ? "text-pink-500 hover:text-pink-400"
                    : "text-white/40 hover:text-pink-400"
                }`}
        >
            ❤️ {reaction.length}
        </button>
    )
}