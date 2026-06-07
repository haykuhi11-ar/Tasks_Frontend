import { useCallback, useState } from "react"
import { http } from "../../config/api";
import axios from "axios";

export const useDelete = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const remove = useCallback( async (url: string) => {
        try {
            setLoading(true);
            setError("");

            await http.delete(url);

        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(error.message);
            }
        } finally {
            setLoading(false)
        }
    }, []);

    return { error, loading, remove };
}