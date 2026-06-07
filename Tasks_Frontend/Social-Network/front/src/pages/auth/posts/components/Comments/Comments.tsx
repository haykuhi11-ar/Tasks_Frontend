import { useState } from "react";
import type { Comment } from "../../../../../helpers/types"
import { CommentForm } from "./CommentForm";
import { CommentItem } from "./CommentItem";

type Props = {
    postId: number,
    postComments: Comment[],
    onRefresh: () => void
}

export const Comments = ({ postId, postComments, onRefresh }: Props) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="mt-4 space-y-3">
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="text-white/40 hover:text-white/70 text-sm transition-colors"
            >
                💬 {postComments.length} {isOpen ? "Hide comments" : "Show comments"}
            </button>

            {isOpen && (
                <>
                    <CommentForm postId={postId} onCreated={onRefresh} />
                    <div className="space-y-2">
                        {postComments.map((comment) => (
                            <CommentItem
                                key={comment.id}
                                comment={comment}
                                postId={postId}
                                onDeleted={onRefresh}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}