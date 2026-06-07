import { useState } from "react";
import { usePost } from "../../../../helpers/hooks/usePost";
import { PostImagePicker } from "./ImagePicker";
import type { ResponsePost } from "../../../../helpers/types";

type Props = {
    onCreated?: () => void
}

export const CreatePost = ({onCreated}: Props) => {
    const { post, loading } = usePost<ResponsePost>();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [imageKey, setImageKey] = useState(0);


    const handleSubmit = async () => {
        const form = new FormData();

        form.append("title", title);
        form.append("description", description);

        if (image) {
            form.append("image", image);
        }

        await post("/posts", form);
        setTitle("");
        setDescription("");
        setImage(null);
        setImageKey((prev) => prev + 1);
        onCreated?.();
    }

    return (
        <div
            className="
        p-6 rounded-3xl
        bg-white/10 backdrop-blur-2xl
        border border-white/20
        shadow-[0_25px_120px_rgba(0,0,0,0.6)]
    "
        >
            {/* TITLE */}
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Post title"
                className="
            w-full mb-4 px-4 py-3
            rounded-2xl
            bg-white/5
            border border-white/10
            text-white
            placeholder-white/40
            focus:outline-none
            focus:border-blue-500
        "
            />

            {/* DESCRIPTION */}
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What's on your mind?"
                className="
            w-full h-40 resize-none
            px-4 py-3
            rounded-2xl
            bg-white/5
            border border-white/10
            text-white
            placeholder-white/40
            focus:outline-none
            focus:border-blue-500
        "
            />

            <div className="flex items-center justify-between mt-5">
                <PostImagePicker  
                    key={imageKey}
                    onSelect={setImage}
                />

                {/* SUBMIT */}
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="
                px-6 py-2 rounded-xl
                font-semibold text-white
                bg-gradient-to-r
                from-blue-600
                via-indigo-500
                to-cyan-500
                hover:scale-[1.03]
                active:scale-[0.98]
                transition-all duration-300
                shadow-[0_10px_40px_rgba(37,99,235,0.5)]
                disabled:opacity-50
            "
                >
                    {loading ? "Posting..." : "Post"}
                </button>
            </div>
        </div>
    );
};