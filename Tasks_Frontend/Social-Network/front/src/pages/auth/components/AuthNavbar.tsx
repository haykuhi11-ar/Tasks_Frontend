import { NavLink } from "react-router-dom"

export const AuthNavbar = () => {
    return (
        <nav className="flex flex-col gap-3">

            <NavLink
                to={"/profile"}
                end
                className={({ isActive }) =>
                    `px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300
                 ${isActive
                        ? "bg-gradient-to-r from-pink-500 to-blue-500 text-white shadow-lg"
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    }`
                }
            >
                Profile
            </NavLink>

            <NavLink
                to={"/profile/settings"}
                className={({ isActive }) =>
                    `px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300
                 ${isActive
                        ? "bg-gradient-to-r from-pink-500 to-blue-500 text-white shadow-lg"
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    }`
                }
            >
                Settings
            </NavLink>

            <NavLink
                to={"/profile/followers"}
                className={({ isActive }) =>
                    `px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300
                 ${isActive
                        ? "bg-gradient-to-r from-pink-500 to-blue-500 text-white shadow-lg"
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    }`
                }
            >
                Followers
            </NavLink>

            <NavLink
                to={"/profile/followings"}
                className={({ isActive }) =>
                    `px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300
                 ${isActive
                        ? "bg-gradient-to-r from-pink-500 to-blue-500 text-white shadow-lg"
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    }`
                }
            >
                Followings
            </NavLink>

            <NavLink
                to={"/profile/messages"}
                className={({ isActive }) =>
                    `px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300
                 ${isActive
                        ? "bg-gradient-to-r from-pink-500 to-blue-500 text-white shadow-lg"
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    }`
                }
            >
                Messages
            </NavLink>

            <NavLink
                to={"/posts"}
                className={({ isActive }) =>
                    `px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300
                 ${isActive
                        ? "bg-gradient-to-r from-pink-500 to-blue-500 text-white shadow-lg"
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    }`
                }
            >
                Posts
            </NavLink>

            <NavLink
                to={"/profile/search"}
                className={({ isActive }) =>
                    `px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300
                 ${isActive
                        ? "bg-gradient-to-r from-pink-500 to-blue-500 text-white shadow-lg"
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    }`
                }
            >
                Search
            </NavLink>

        </nav>
    )
}