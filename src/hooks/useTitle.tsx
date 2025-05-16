import { useEffect } from "react";

export default function useTitle(page: string) {
    useEffect(() => {
        document.title = page + " | SiCesa"
    }, [])
}