import { useEffect, useState } from "react";
import type { Account } from "../types";
import { http } from "../../config/api";
import { useNavigate } from "react-router-dom";

type ReturnValue = [Account | null, (acc: Account) => void]
export const useAuth = (): ReturnValue => {
    const [user, setUser] = useState<Account | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        http
            .get<{ user: Account }>("/auth/user")
            .then(response => {
                setUser(response.data.user);
            })
            .catch(() => {
                navigate('/');
            })
    }, [navigate]);

    return [user, setUser];
}