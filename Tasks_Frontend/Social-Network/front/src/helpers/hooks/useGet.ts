import { useCallback, useEffect, useState } from "react"
import { http } from "../../config/api";
import axios from "axios";

interface UseGetReturn <T> {
    loading: boolean,
    error: string,
    data: T | null,
    refetch: () => Promise<void>
}

export const useGet = <T>(path: string): UseGetReturn<T> => {
    const [loading, setloading] = useState(false);
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState("");

    const refetch = useCallback(async () => {
        try {
            setloading(true)
            const response = await http.get<T>(path);
            setData(response.data);

        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(error.message)
            }
        } finally {
            setloading(false);
        }
    }, [path]);

    useEffect(() => {
        refetch();
    }, [refetch]);

    return { loading, data, error, refetch };
}