import { useOutletContext } from "react-router-dom"
import { Image } from "../../../../helpers/UI/Image"
import type { Context } from "../../../../helpers/types";
import { Confirm } from "./Confirm";
import { useRef, useState } from "react";
import { http } from "../../../../config/api";

export const ImagePicker = () => {
    const { user, setUser } = useOutletContext<Context>();
    const [confirmDialog, setConfirmDialog] = useState(false);
    const selectedPic = useRef<HTMLInputElement | null>(null);

    const handleUploads = () => {
        if (selectedPic.current) {
            const file = selectedPic.current.files?.[0];
            console.log("file:", file);
            if (file) {
                const form = new FormData();
                form.append("profile-pic", file);

                http
                    .patch<{ picture: string }>('/account/avatar', form)
                    .then(response =>
                        setUser({ ...user, avatar: response.data.picture })
                    )
                    .catch(err =>
                        console.log(err)
                    )
                    .finally(() =>
                        setConfirmDialog(false)
                    )
            }


        }

    }

    return (
        <div onClick={(e) => e.stopPropagation()}>
            <div className="hidden">
                <input
                    type="file"
                    ref={selectedPic}
                    onChange={() => setConfirmDialog(true)}
                />
            </div>
            <Image
                src={user.avatar}
                onClick={() => selectedPic.current?.click()}
            />

            {confirmDialog &&
                <Confirm
                    onReject={() => setConfirmDialog(false)}
                    onConfirm={() => handleUploads()}
                />}
        </div>
    )
}