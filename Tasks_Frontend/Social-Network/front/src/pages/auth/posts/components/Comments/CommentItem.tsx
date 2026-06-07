import { useDelete } from "../../../../../helpers/hooks/useDelete"
import type { Comment } from "../../../../../helpers/types"

type Props = {
    comment: Comment,
    postId: number,
    onDeleted: () => void
}

export const CommentItem = ({ comment, postId, onDeleted }: Props) => {
    const { remove } = useDelete();

    const handleDelete = async () => {
        await remove(`/posts/${postId}/comments/${comment.id}`);
        onDeleted();
    }

    return (
        <div className="flex items-start justify-between gap-2 bg-white/5 rounded-xl px-4 py-2">
            <div>
                <span className="text-white/60 text-xs font-semibold">
                    {comment.user.firstName} {comment.user.lastName}
                </span>
                <p className="text-white/80 text-sm mt-0.5">{comment.text}</p>
            </div>
            <button
                onClick={handleDelete}
                className="text-red-400 hover:text-red-300 text-xs transition-colors shrink-0"
            >
                Delete
            </button>
        </div>
    );
}