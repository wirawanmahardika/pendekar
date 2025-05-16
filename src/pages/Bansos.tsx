import PageTitle from "../components/PageTitle";
import useAuth from "../hooks/useAuth";
import { BASE_API_URL } from "../utils/api";
import { bansosType } from "../types/BansosTypes";
import useGetResultData from "../hooks/useGetResultData";
import PendudukMendapatBantuan from "../components/bansos/PendudukMendapatBantuan";
import RekapPenerimaBantuanSosial from "../components/bansos/RekapPenerimaBantuanSosial";
import { useState } from "react";
import LoadingDots from "../components/LoadingDots";
import useTitle from "../hooks/useTitle";

export default function Bansos() {
    useAuth()
    useTitle("Bansos")

    const [loading, setIsLoading] = useState(false)
    const resultData = useGetResultData<bansosType>(`${BASE_API_URL}bansos`, setIsLoading);
    if(loading) return <LoadingDots />

    return <div className="px-4 py-10">
      <PageTitle title="Bantuan Sosial" last_updated={ resultData?.last_updated } />
        <PendudukMendapatBantuan resultData={resultData} />
        <RekapPenerimaBantuanSosial resultData={resultData} />
    </div>
}
