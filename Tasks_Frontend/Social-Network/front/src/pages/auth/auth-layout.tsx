import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../helpers/hooks/useAuth";
import { AuthNavbar } from "./components/AuthNavbar";

export const AuthLayout = () => {
    const navigate = useNavigate();
    const [ user, setUser ] = useAuth();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    }

    return user && (
        <div
            className="relative min-h-screen overflow-hidden
                 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900"
        >

            <div className="absolute w-[600px] h-[600px] bg-pink-500/40 rounded-full blur-[160px] top-[-150px] left-[-150px]" />
            <div className="absolute w-[600px] h-[600px] bg-blue-500/40 rounded-full blur-[160px] bottom-[-180px] right-[-180px]" />

            <div className="relative z-10 flex min-h-screen">

                {/* Sidebar */}
                <aside
                    className="w-[280px] p-6
                     bg-white/10 backdrop-blur-3xl
                     border-r border-white/20
                     shadow-[0_20px_80px_rgba(0,0,0,0.5)]"
                >

                    <h1
                        className="text-3xl font-bold text-white mb-10 tracking-wide"
                    >
                        Profile
                    </h1>

                    <AuthNavbar />

                    {/* Logout */}
                    <button onClick={handleLogout}
                        className="mt-10 w-full py-3 rounded-xl font-semibold text-white
                       bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500
                       hover:scale-[1.02] active:scale-[0.98]
                       transition-all duration-300
                       shadow-[0_10px_40px_rgba(236,72,153,0.35)]"
                    >
                        Logout
                    </button>
                </aside>

                {/* Content */}
                <main className="flex-1 p-8">

                    <div
                        className="h-full rounded-3xl
                       bg-white/10 backdrop-blur-3xl
                       border border-white/20
                       shadow-[0_20px_80px_rgba(0,0,0,0.5)]
                       p-8"
                    >
                        <Outlet context={{ user, setUser }} />
                    </div>

                </main>
            </div>
        </div>
    );
};