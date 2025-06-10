import useAuth from "../hooks/useAuth";
import PageTitle from "../components/PageTitle";
import TabelDokumenDanPerencanaanDesa from "../components/perencanaan/TabelDokumenDanPerencanaanDesa";
import MonitoringPerencanaan from "../components/perencanaan/MonitoringPerencanaan";
import { useEffect, useState } from "react";
import LoadingDots from "../components/LoadingDots";
import { BASE_API_URL } from "../utils/api";
import { AxiosAuth } from "../utils/axios";
import DaftarDesaDanKelengkapanDokumen from "../components/perencanaan/DaftarDesaDanKelengkapanDokumen";
import HeadHtml from "../components/HeadHtml";
import { KelengkapanDokumen } from "../types/perencaan/DaftarDesaDanKelengkapanDokumentTypes";
import { dokumenDanPerencaanType } from "../types/perencaan/DokumenDanPerencanaan";
import { monitoringPerencanaanType } from "../types/perencaan/MonitoringPerencanaan";

export default function Perencanaan() {
    useAuth()
    const [dataKelengkapanDokumen, setDataKelengkapanDokumen] = useState<KelengkapanDokumen[]>([])
    const [dataDokumenDanPerencanaan, setDataDokumenDanPerencanaan] = useState<dokumenDanPerencaanType[]>([])
    const [monitoringData, setMonitoringData] = useState< monitoringPerencanaanType| null>(null);

    const [loading, setLoading] = useState(true)
        
    useEffect(() => {
        Promise.all([
            AxiosAuth.get(`${BASE_API_URL}perencanaan`),
            AxiosAuth.post(`${BASE_API_URL}perencanaan/GetDaftarDesa`, { limit: Number.MAX_SAFE_INTEGER }, { headers: { "Content-Type": "application/x-www-form-urlencoded" }, }),
            AxiosAuth.post(`${BASE_API_URL}perencanaan/GetTabelDokumen`, { limit: Number.MAX_SAFE_INTEGER }, { headers: { "Content-Type": "application/x-www-form-urlencoded" } })
        ]).then(([monitoringData, kelengkapanDokumen, dokumenDanPerencanaan]) => {
            setMonitoringData(monitoringData.data.data)
            setDataKelengkapanDokumen(kelengkapanDokumen.data.data)
            setDataDokumenDanPerencanaan(dokumenDanPerencanaan.data.data)
        }).finally(() => setLoading(false))

    }, [])

    if (loading) return <LoadingDots />
    return (
        <div className="p-4">
            <HeadHtml title="Perencanaan" />
            <PageTitle title="Perencanaan" />

            <MonitoringPerencanaan monitoringData={monitoringData} />
            <DaftarDesaDanKelengkapanDokumen allData={dataKelengkapanDokumen} />
            <TabelDokumenDanPerencanaanDesa resultData={dataDokumenDanPerencanaan} />
        </div>
    );
};
