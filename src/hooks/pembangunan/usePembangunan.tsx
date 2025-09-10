import { useEffect, useState } from "react";
import { AxiosAuth } from "../../utils/axios";
import { BASE_API_URL } from "../../utils/api";

export default function usePembangunan() {
    const [loading, setLoading] = useState(true);
    const [dataPembanguan, setDataPembanguan] = useState();
    const [modeKeuangan, setModeKeuangan] = useState("apbdes");
    const [lastUpdated, setLastUpdated] = useState("");

    const showTab = (tabId: string) => {
        document.querySelectorAll('[role="tabpanel"]').forEach((panel) => {
            panel.classList.add("hidden");
        });
        const targetPanel = document.getElementById(tabId);
        if (targetPanel) {
            targetPanel.classList.remove("hidden");
        }
    };

    useEffect(() => {
        AxiosAuth
            .get(`${BASE_API_URL}keuangan?k3=&k4=`)
            .then(({ data: result }) => {
                setDataPembanguan(result.data);
                setLastUpdated(result.data.last_updated);
            }).finally(() => setLoading(false));


        switch (modeKeuangan) {
            case "apbdes": showTab("bordered-apbd")
                break;
            case "rkp": showTab("bordered-rkp")
                break
            case "proposal": showTab("bordered-proposal")
                break
        }
    }, [modeKeuangan]);

    return {
        loading, 
        modeKeuangan,
        dataPembanguan,
        lastUpdated,
        setModeKeuangan,
    }
}