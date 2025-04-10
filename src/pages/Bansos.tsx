import PageTitle from "../components/PageTitle";
import useTitle from "../hooks/useTitle";
import useAuth from "../hooks/useAuth";
import { BASE_API_URL } from "../utils/api";
import { bansosType } from "../types/BansosTypes";
import useGetResultData from "../hooks/useGetResultData";
import PendudukMendapatBantuan from "../components/bansos/PendudukMendapatBantuan";
import RekapPenerimaBantuanSosial from "../components/bansos/RekapPenerimaBantuanSosial";

export default function Bansos() {
    useTitle("Bansos")
    useAuth()

    const resultData = useGetResultData<bansosType>(`${BASE_API_URL}bansos`);
    console.log(resultData);
    

    return <div className="px-4 py-10">
        <PageTitle title="Bantuan Sosial" />
        <PendudukMendapatBantuan resultData={resultData} />
        <RekapPenerimaBantuanSosial resultData={resultData} />
    </div>
}
