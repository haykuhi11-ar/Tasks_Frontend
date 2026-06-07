import axios from "axios";
import { useCallback, useState } from "react"
import { http } from "../../config/api";

interface UsePatchReturn<T> {
    loading: boolean,
    error: string,
    data: T | null,
    patch: (url: string, body: unknown) => Promise<void>
}

export const usePatch = <T>(): UsePatchReturn<T> => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [data, setData] = useState<T | null>(null);

    const patch = useCallback(async (url: string, body: unknown) => {
        try {
            setLoading(true);
            setError("");
            const response = await http.patch(url, body);

            setData(response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(error.message);
            }
        } finally {
            setLoading(false);
        }
    }, [])

    return { loading, error, data, patch }
}