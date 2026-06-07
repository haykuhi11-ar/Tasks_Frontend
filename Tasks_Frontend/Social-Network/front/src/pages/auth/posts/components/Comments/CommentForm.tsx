import { useState } from "react"
import { usePost } from "../../../../../helpers/hooks/usePost";
import type { ResponseComment } from "../../../../../helpers/types";

type Props = {
    postId: number,
    onCreated: () => void
}

export const CommentForm = ({ postId, onCreated }: Props) => {
    const [text, setText] = useState("");
    const { post } = usePost<ResponseComment>();

    const handleSubmit = async () => {
        if (!text.trim()) return;

        try {
            await post(`/posts/${postId}/comments`, { text });
            setText("");
            onCreated();
        } catch (error) {
            console.error(error);
        }

    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") handleSubmit();
    };

    return (
        <div className="flex items-center gap-2 w-full">
            <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Write a comment..."
                className="
                    flex-1
                    min-w-0
                    px-4 py-2
                    rounded-xl
                    bg-white/5
                    border border-white/10
                    text-white
                    placeholder-white/40
                    focus:outline-none
                    focus:border-blue-500
                    text-sm
                "
            />

            <button
                onClick={handleSubmit}
                className="
                    shrink-0
                    px-4 py-2
                    rounded-xl
                    bg-blue-500/20
                    text-blue-300
                    hover:bg-blue-500/30
                    transition
                    text-sm
                "
            >
                Send
            </button>
        </div>)
}