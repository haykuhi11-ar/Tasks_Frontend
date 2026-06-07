import ReactModal from "react-modal";

type Props = {
    isOpen: boolean;
    image: string | null;
    onClose: () => void
}

export const ImageModal = ({ isOpen, image, onClose } : Props) => {
    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onClose}
            style={{
                overlay: {
                    backgroundColor: "rgba(0,0,0,0.9)",
                    zIndex: 9999,
                },
                content: {
                    inset: 0,
                    border: "none",
                    background: "transparent",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "20px",
                },
            }}
        >
            {image && (
                <img
                    src={image}
                    alt=""
                    onClick={onClose}
                    className="
                        max-w-full
                        max-h-[90vh]
                        object-contain
                        rounded-2xl
                        cursor-pointer
                    "
                />
            )}
        </ReactModal>
    )
}