import { useEffect, useState } from "react";
import { AxiosAuth } from "../../utils/axios";
import { BASE_API_URL } from "../../utils/api";
import { bansosType } from "../../types/BansosTypes";

export default function useBansos() {
    const [bansosData, setBansosData] = useState<bansosType>();
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true);
        AxiosAuth.get(`${BASE_API_URL}bansos`)
            .then((result) => { setBansosData(result.data.data); })
            .catch((error) => alert(error.message))
            .finally(() => setLoading(false));
    }, []);

    return {
        loading,
        bansosData
    }
}