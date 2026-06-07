import type React from "react"
import { BASE } from "../../config/api";

type ImageProps = React.ImgHTMLAttributes<HTMLImageElement>

export const Image: React.FC<ImageProps> = ({
    src,
    ...otherProps
}) => {
    if (!src) {
        src = "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=";
    } else {
        src = BASE + "uploads/" + src
    }
    
    return (
        <>
            <img
                src={src}
                {...otherProps}
                className="
                            w-36 h-36
                            rounded-full
                            object-cover
                            bg-gradient-to-r from-pink-500 to-blue-500
                            bg-clip-border
                            p-1
                            shadow-xl
                        "
            />
        </>
    )
}