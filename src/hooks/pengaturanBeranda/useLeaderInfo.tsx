import { useEffect, useState } from "react";
import { LeaderInfo } from "../../types/PengaturanBerandaTypes";
import { AxiosAuth } from "../../utils/axios";
import { BASE_API_URL } from "../../utils/api";

export default function useLeaderInfo() {
    const [leaderInfo, setLeaderInfo] = useState<LeaderInfo | null>(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        AxiosAuth.get(BASE_API_URL + "/profil/get-leader-info")
            .then(res => {
                setLeaderInfo(res.data.data);
            }).finally(() => setLoading(false));
    }, [])

    return { leaderInfo, loading }
}
