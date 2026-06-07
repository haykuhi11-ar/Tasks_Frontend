import { http } from "../../../../config/api";
import type { ResponseAccount } from "../../../../helpers/types";

type Props = {
    userId: number,
    data: ResponseAccount,
    refetch: () => void
}

export const Follow = ({ userId, data, refetch }: Props) => {

    const handleRequest = () => {
        http
            .post(`/follow/${userId}`)
            .then(() => {
                refetch();
            })
            .catch(err => {
                console.log(err.response.data)
            });
    }

    return data && (
        <div className="flex justify-center mt-8">
            <button
                onClick={handleRequest}
                className="
                    px-4
                    py-3
                    rounded-xl
                    text-sm
                    font-medium
                    transition-all
                    duration-300
                    border
                    border-blue-400/30
                    bg-blue-500/10
                    text-blue-200
                    hover:bg-blue-500/20
                    hover:text-white
                    hover:border-blue-400/50
                    active:scale-95
            
                "
            >
                {data.requestSent
                    ? "Cancel request"
                    : data.followsMe
                        ? "Follow Back"
                        : data.followStatus
                            ? "Unfollow"
                            : "Follow"
                }

            </button>
        </div>
    )
}