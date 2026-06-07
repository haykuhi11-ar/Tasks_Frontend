import { useCallback, useState } from "react"
import { http } from "../../config/api";
import axios from "axios";

export const usePost = <T>() => {
    const [loading, setLoading] = useState(false);
    const[error, setError] = useState("");
    const [data, setData] = useState<T | null>(null);

    const post = useCallback(async (url: string, body: unknown) => {
        try {
            setLoading(true);
            setError("");

            const response = await http.post<T> (url, body);
            setData(response.data);
            
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(error.message);
            }
        } finally {
            setLoading(false);
        }
    }, []);

    return { loading, error, data, post }
}