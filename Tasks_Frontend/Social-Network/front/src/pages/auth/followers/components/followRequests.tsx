import { useEffect } from "react";
import { useGet } from "../../../../helpers/hooks/useGet";
import type { RequestAccount } from "../../../../helpers/types";
import { Image } from "../../../../helpers/UI/Image";
import { usePatch } from "../../../../helpers/hooks/usePatch";

export const FollowRequests = () => {
    const { data, refetch } = useGet<RequestAccount>("/follow/requests");
    const { patch } = usePatch();
    
useEffect(() => {
    refetch()
}, [refetch]);

    console.log(data);
    if (!data) {
        return null;
    }

    if (data.requests.length === 0) {
        return <div className="text-white text-center py-10">
            No follow requests
        </div>
    }

    const handleAccept = async (id: number) => {
        await patch(`/follow/requests/accept/${id}`, {id});
        await refetch();
    }

    const handleDecline = async (id: number) => {
        await patch(`/follow/requests/decline/${id}`, {id});
        await refetch();
    }

    return (
        <section
            className="
                rounded-3xl
                bg-white/10
                backdrop-blur-xl
                border border-white/15
                overflow-hidden
            "
        >
            <div
                className="
                    flex
                    items-center
                    justify-between
                    p-6
                    border-b
                    border-white/10
                "
            >
                <div className="flex items-center gap-3">
                    <span className="text-2xl">👥</span>

                    <div>
                        <h2 className="text-xl font-semibold text-white">
                            Follow Requests
                        </h2>

                        <p className="text-sm text-white/60">
                            People waiting for your approval.
                        </p>
                    </div>
                </div>

                <div
                    className="
                        px-3
                        py-1
                        rounded-full
                        bg-blue-500/20
                        text-blue-300
                        text-sm
                        font-medium
                    "
                >
                    {data.requests.length}
                </div>
            </div>

            <div className="divide-y divide-white/10">
                {data.requests.map((request) => (
                    <div
                        key={request.id}
                        className="
                            p-5
                            flex
                            items-center
                            justify-between
                            hover:bg-white/5
                            transition-colors
                        "
                    >
                        <div className="flex items-center gap-4">
                            <Image
                                src={request.sender.avatar}
                            />
                            <div />

                            

                            <div>
                                <p className="font-medium text-white">
                                    {request.sender.firstName}{" "}
                                    {request.sender.lastName}
                                </p>

                                <p className="text-sm text-white/50">
                                    @{request.sender.username}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                            onClick={ () => handleAccept(request.id)}
                                className="
                                    px-4
                                    py-2
                                    rounded-xl
                                    bg-gradient-to-r
                                    from-blue-600
                                    to-indigo-500
                                    text-white
                                    font-medium
                                    hover:scale-[1.03]
                                    transition-all
                                "
                            >
                                Accept
                            </button>

                            <button
                                onClick={() => handleDecline(request.id)}
                                className="
                                    px-4
                                    py-2
                                    rounded-xl
                                    bg-white/10
                                    border
                                    border-white/10
                                    text-white/70
                                    hover:bg-white/15
                                    hover:text-white
                                    transition-all
                                "
                            >
                                Reject
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};