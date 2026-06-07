import type React from "react";
import ReactModal from "react-modal";

type Props = {
    onConfirm: () => void,
    onReject: () => void
}

export const Confirm: React.FC<Props> = ({ onConfirm, onReject }) => {
    return (
        <ReactModal
            isOpen={true}
            onRequestClose={onReject}
            ariaHideApp={false}
            style={{
                overlay: {
                    zIndex: 99999,
                    background: "rgba(0, 0, 0, 0.6)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                },
                content: {
                    inset: "unset",
                    border: "none",
                    background: "transparent",
                    padding: 0,
                },
            }}
        >
            <div
                className="
                    w-full max-w-md
                    bg-[#1e1e2f]
                    border border-white/10
                    rounded-3xl
                    p-8
                    shadow-2xl
                    text-center
                "
            >
                <h2
                    className="
                        text-2xl
                        font-bold
                        bg-gradient-to-r
                        from-pink-500
                        to-blue-500
                        bg-clip-text
                        text-transparent
                    "
                >
                    Confirm Action
                </h2>

                <p className="mt-4 text-gray-300">
                    Are you sure you want to continue?
                </p>

                <div className="flex gap-4 mt-8">
                    <button
                        className="
                            flex-1
                            py-3
                            rounded-xl
                            font-semibold
                            text-white
                            bg-gradient-to-r
                            from-pink-500
                            to-blue-500
                            hover:opacity-90
                            transition
                        "
                        onClick={onConfirm}
                    >
                        Yes
                    </button>

                    <button
                        className="
                            flex-1
                            py-3
                            rounded-xl
                            font-semibold
                            text-gray-300
                            bg-[#2a2a40]
                            hover:bg-[#34344d]
                            transition
                        "
                        onClick={onReject}
                    >
                        No
                    </button>
                </div>
            </div>
        </ReactModal>
    );
};