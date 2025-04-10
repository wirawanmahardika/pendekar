import { useEffect, useState } from "react";
import { AxiosAuth } from "../utils/axios";

export default function useGetResultData<T>(url: string) {
    const [resultData, setResultData] = useState<T>()
    useEffect(() => {
        AxiosAuth
            .get(url)
            .then((result) => {
                setResultData(result.data.data);
            })
            .catch((error) => {
                alert(error.message);
            })
    }, [])

    return resultData
}