import { useEffect, useRef, useState } from "react"

export const useDebounce = (text: string, time: number = 500) => {
    const [debouncedText, setDebouncedText] = useState("");
    const interval = useRef<number>(0);

    useEffect(() => {
        interval.current = setTimeout(() => {
            setDebouncedText(text);
        }, time)

        return () => clearTimeout(interval.current);
    }, [text, time])

    return debouncedText;
}