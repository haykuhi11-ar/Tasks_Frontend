import { useDelete } from "../../../../helpers/hooks/useDelete";

type Props = {
    postId: number;
    onDeleted: (deletedId: number) => void
};

export const DeletePost = ({postId, onDeleted } : Props) => {

    const { remove } = useDelete();

    const handleDelete = async () => {
        await remove(`/posts/${postId}`);
        onDeleted(postId);
    }

    return (
        <button
            onClick={handleDelete}
            className="text-red-400 hover:text-red-300 text-sm transition-colors"
        >
            Delete
        </button>
    );
}