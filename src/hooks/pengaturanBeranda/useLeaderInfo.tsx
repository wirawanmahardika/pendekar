import { useEffect, useState } from "react";
import { LeaderInfo } from "../../types/PengaturanBerandaTypes";
import { AxiosAuth } from "../../utils/axios";
import { BASE_API_URL, KODE_SLUG } from "../../utils/api";

export default function useLeaderInfo() {
    const [leaderInfo, setLeaderInfo] = useState<LeaderInfo | null>(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        AxiosAuth.get(BASE_API_URL + "setting/get-leader-info/" +  KODE_SLUG)
            .then(res => {
                console.log(res.data);
                
                setLeaderInfo(res.data.data);
            })
            .catch(err => console.log(err))
            .finally(() => setLoading(false));
    }, [])

    return { leaderInfo, loading }
}
