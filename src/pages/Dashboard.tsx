import FlashNews from "../components/dashboard/FlashNews";
import CapaianDanPotensi from "../components/dashboard/CapaianDanPotensi";
import SkorIDMSekabupaten from "../components/dashboard/SkorIDMSekabupaten";
import PetaPerkembanganDesa from "../components/dashboard/PetaPerkembanganDesa";
import RekomendasiPembangunan from "../components/dashboard/RekomendasiPembangunan";
import Potensi from "../components/dashboard/Potensi";
import DataStunting from "../components/dashboard/DataStunting";
import JumlahStuntingDiDesaKelurahan from "../components/dashboard/JumlahStuntingDiDesaKelurahan";
import PageTitle from "../components/PageTitle";
import useTitle from "../hooks/useTitle";
import useAuth from "../hooks/useAuth";
import useGetResultData from "../hooks/useGetResultData";
import { BASE_API_URL } from "../utils/api";
import { dashboardResultDataType } from "../types/DashboardTypes";

export default function Dashboard() {
    useTitle("Dashboard")
    useAuth()

    const resultData = useGetResultData<dashboardResultDataType>(`${BASE_API_URL}pembangunan?k3=&k4=`)
    console.log(resultData);
    

    return <div className="px-4 py-10">
        <PageTitle title="Dashboard" />

        <FlashNews resultData={resultData} />

        <CapaianDanPotensi />

        <SkorIDMSekabupaten resultData={resultData} />

        <PetaPerkembanganDesa resultData={resultData} />

        <RekomendasiPembangunan />

        <Potensi />

        <DataStunting />

        <JumlahStuntingDiDesaKelurahan />
    </div>
}