import { useRef, useState } from "react"

type Props = {
    onSelect: (file: File) => void;
}

export const PostImagePicker = ({onSelect}: Props) => {
    const fileRef = useRef<HTMLInputElement | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const handleClick = () => {
        fileRef.current?.click();
    }

    const handleChange = () => {
        const file = fileRef.current?.files?.[0];
        if (!file) return;

        if (preview) {
                URL.revokeObjectURL(preview);
        }

        const localUrl = URL.createObjectURL(file);
        setPreview(localUrl);
        onSelect(file);
    }
    

    return (
        <div className="space-y-4">
            <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={handleChange}
                hidden
            />

             <button
                type="button"
                onClick={handleClick}
                className="
                    px-4 py-2 rounded-xl
                    bg-blue-500/20 text-blue-300
                    hover:bg-blue-500/30
                    transition
                "
            >
                Add Image
            </button>

            {preview && (
                <img
                    src={preview}
                    alt="Preview"
                    className="
                        w-full
                        h-64
                        object-cover
                        rounded-2xl
                        border
                        border-white/10
                    "
                />
            )}
        </div>
    )
}