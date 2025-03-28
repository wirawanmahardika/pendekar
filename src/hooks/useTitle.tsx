import { useEffect } from "react";
import { STRINGS } from "../utils/strings";
import { KODE_SLUG } from "../utils/api";

export default function useTitle(title: string) {
    useEffect(() => {
        document.title = title + " | " + STRINGS[KODE_SLUG].title
    }, [])
}