export const Messages = () => {
    return (
        <div className="min-h-screen relative flex justify-center px-4 py-10
                        bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 overflow-hidden">

            {/* BLUE GLOW */}
            <div className="absolute w-[600px] h-[600px] bg-blue-600/40 rounded-full blur-[160px] top-[-180px] left-[-180px]" />
            <div className="absolute w-[500px] h-[500px] bg-indigo-500/30 rounded-full blur-[140px] bottom-[-160px] right-[-160px]" />

            {/* MAIN CARD */}
            <div className="relative z-10 w-full max-w-4xl
                            rounded-3xl overflow-hidden
                            border border-white/15
                            bg-white/10 backdrop-blur-2xl
                            shadow-[0_25px_120px_rgba(0,0,0,0.6)]">

                {/* HEADER */}
                <div className="p-5 border-b border-white/10 flex items-center justify-between">

                    <h1 className="text-white text-xl font-semibold tracking-wide">
                        Messages
                    </h1>

                    <button className="px-4 py-2 rounded-xl
                                       bg-blue-500/20 text-blue-300
                                       hover:bg-blue-500/30 transition">
                        New Chat
                    </button>
                </div>

                {/* BODY */}
                <div className="flex h-[600px]">

                    {/* LEFT SIDEBAR */}
                    <div className="w-1/3 border-r border-white/10 p-4 space-y-3 overflow-y-auto">

                        {/* SEARCH */}
                        <input
                            placeholder="Search messages..."
                            className="w-full px-3 py-2 rounded-xl
                                       bg-white/5 border border-white/10
                                       text-white placeholder-white/40
                                       focus:outline-none focus:border-blue-500"
                        />

                        {/* CHAT ITEMS */}
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-3 p-3 rounded-2xl
                                           hover:bg-white/10 transition cursor-pointer"
                            >
                                <div className="w-10 h-10 rounded-full
                                                bg-gradient-to-r from-blue-500 to-indigo-500" />

                                <div className="flex-1">
                                    <p className="text-white text-sm font-medium">
                                        User {i + 1}
                                    </p>
                                    <p className="text-white/40 text-xs">
                                        Last message preview...
                                    </p>
                                </div>

                                <span className="text-white/30 text-xs">
                                    12:4{i}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* RIGHT CHAT AREA */}
                    <div className="flex-1 flex flex-col">

                        {/* CHAT HEADER */}
                        <div className="p-4 border-b border-white/10 flex items-center justify-between">

                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full
                                                bg-gradient-to-r from-indigo-500 to-blue-500" />
                                <div>
                                    <p className="text-white text-sm font-medium">
                                        Selected User
                                    </p>
                                    <p className="text-white/40 text-xs">
                                        online
                                    </p>
                                </div>
                            </div>

                            <button className="text-white/40 hover:text-white transition">
                                ⋯
                            </button>
                        </div>

                        {/* MESSAGES */}
                        <div className="flex-1 p-4 space-y-3 overflow-y-auto">

                            {/* incoming */}
                            <div className="flex">
                                <div className="bg-white/10 text-white px-4 py-2 rounded-2xl max-w-xs">
                                    Hey 👋
                                </div>
                            </div>

                            {/* outgoing */}
                            <div className="flex justify-end">
                                <div className="bg-blue-600/30 text-blue-200 px-4 py-2 rounded-2xl max-w-xs">
                                    Hello! This is preview UI 😄
                                </div>
                            </div>

                            <div className="flex">
                                <div className="bg-white/10 text-white px-4 py-2 rounded-2xl max-w-xs">
                                    This will be real chat soon...
                                </div>
                            </div>
                        </div>

                        {/* INPUT */}
                        <div className="p-4 border-t border-white/10 flex gap-3">

                            <input
                                placeholder="Type a message..."
                                className="flex-1 px-4 py-2 rounded-xl
                                           bg-white/5 border border-white/10
                                           text-white placeholder-white/40
                                           focus:outline-none focus:border-blue-500"
                            />

                            <button className="px-5 py-2 rounded-xl font-semibold text-white
                                               bg-gradient-to-r from-blue-600 to-indigo-500
                                               hover:scale-[1.05] active:scale-[0.98]
                                               transition">
                                Send
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};