import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import type { Account } from "../../../helpers/types";
import { http } from "../../../config/api";
import { Image } from "../../../helpers/UI/Image";
import { useDebounce } from "../../../helpers/hooks/useDebounce";

export const Search = () => {

    const [text, setText] = useState("");
    const [users, setUsers] = useState<Account[]>([]);
    const [loading, setLoading] = useState(false);

    const debouncedText = useDebounce(text);
    const preloaded = useRef(false);

    useEffect(() => {
        if (preloaded.current) {

        if (!debouncedText.trim()) {
            setUsers([]);
            return;
        }

        setLoading(true);

        http
            .get<{ users: Account[] }>(
                `account/search/${debouncedText}`
            )
            .then(response => {
                setUsers(response.data.users);
            })
            .catch(console.log)
            .finally(() => setLoading(false));
        }

            preloaded.current = true;

    }, [debouncedText]);

    return (
        <div
            className="
                min-h-screen
                relative
                flex
                justify-center
                px-4
                py-10
                bg-gradient-to-br
                from-slate-950
                via-blue-950
                to-slate-900
                overflow-hidden
            "
        >
            {/* Glow */}
            <div
                className="
                    absolute
                    w-[600px]
                    h-[600px]
                    bg-blue-600/40
                    rounded-full
                    blur-[160px]
                    top-[-180px]
                    left-[-180px]
                "
            />

            <div
                className="
                    absolute
                    w-[500px]
                    h-[500px]
                    bg-indigo-500/30
                    rounded-full
                    blur-[140px]
                    bottom-[-160px]
                    right-[-160px]
                "
            />

            <div className="relative z-10 w-full max-w-4xl">
                <h1 className="text-3xl font-semibold text-white mb-6">
                    Search
                </h1>

                {/* Search */}
                <div className="relative mb-6">
                    <input
                        type="text"
                        value={text}
                        onChange={e => setText(e.target.value)}
                        placeholder="Search users..."
                        className="
                            w-full
                            px-5
                            py-3
                            pr-12
                            rounded-2xl
                            bg-white/10
                            border
                            border-white/15
                            text-white
                            placeholder-white/40
                            focus:outline-none
                            focus:border-blue-500
                            focus:ring-4
                            focus:ring-blue-500/20
                        "
                    />

                    <span
                        className="
                            absolute
                            right-4
                            top-1/2
                            -translate-y-1/2
                            text-white/40
                        "
                    >
                        🔍
                    </span>
                </div>

                {/* Empty state */}
                {!loading &&
                    debouncedText &&
                    users.length === 0 && (
                        <div className="text-center py-16">
                            <div className="text-6xl mb-4">
                                🔍
                            </div>

                            <p className="text-white/60 text-lg">
                                No users found
                            </p>

                            <p className="text-white/30 text-sm mt-2">
                                Try another search query
                            </p>
                        </div>
                    )}

                {/* Users */}
                {!loading && users.length > 0 && (
                    <>
                        <p className="text-white/50 mb-4">
                            Found {users.length} user
                            {users.length !== 1 ? "s" : ""}
                        </p>

                        <div className="space-y-3">
                            {users.map(user => (
                                <Link
                                    key={user.id}
                                    to={`/profile/view/${user.username}`}
                                    
                                    className="
                                        p-4
                                        rounded-2xl
                                        bg-white/10
                                        backdrop-blur-xl
                                        border
                                        border-white/15
                                        flex
                                        items-center
                                        gap-4
                                        hover:bg-white/15
                                        hover:scale-[1.01]
                                        transition-all
                                        cursor-pointer
                                    "
                                >
                                    <Image
                                        src={user.avatar}
                                        className="
                                            w-12
                                            h-12
                                            rounded-full
                                            object-cover
                                        "
                                    />

                                    <div>
                                        <p className="text-white font-medium">
                                            {user.firstName}{" "}
                                            {user.lastName}
                                        </p>

                                        <p className="text-white/50 text-sm">
                                            @{user.username}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};