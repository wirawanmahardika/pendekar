import useAuth from "../hooks/useAuth";
import PageTitle from "../components/PageTitle";
import TabelDokumenDanPerencanaanDesa from "../components/perencanaan/TabelDokumenDanPerencanaanDesa";
import MonitoringPerencanaan from "../components/perencanaan/MonitoringPerencanaan";
import DaftarPenolakanPerencanaan from "../components/perencanaan/DaftarPenolakanPerencanaan";
import HeadHtml from "../components/HeadHtml";
import { useEffect, useState } from "react";
import LoadingDots from "../components/LoadingDots";
import { BASE_API_URL } from "../utils/api";
import { AxiosAuth } from "../utils/axios";
import { dataToDisplayPerencanaanType } from "../types/PerencanaanTypes";

export default function Perencanaan() {
    useAuth()

    const [resultData, setResultData] = useState<dataToDisplayPerencanaanType>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        AxiosAuth.get(`${BASE_API_URL}perencanaan/GetTabelDokumen`)
            .then(res => setResultData(res.data.data))
            .finally(() => setLoading(false))
    }, [])

    if (loading) return <LoadingDots />
    return (
        <div className="p-4">
            <HeadHtml title="Perencanaan" />
            <PageTitle title="Perencanaan" />

            <MonitoringPerencanaan />
            <DaftarPenolakanPerencanaan />
            <TabelDokumenDanPerencanaanDesa resultData={resultData} />
        </div>
    );
};
