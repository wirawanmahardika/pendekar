import FlashNews from "../components/dashboard/FlashNews";
import CapaianDanPotensi from "../components/dashboard/sections/CapaianDanPotensi";
import SkorIDMSekabupaten from "../components/dashboard/sections/SkorIDMSekabupaten";
import PetaPerkembanganDesa from "../components/dashboard/sections/PetaPerkembanganDesa";
import RekomendasiPembangunan from "../components/dashboard/sections/RekomendasiPembangunan";
import Potensi from "../components/dashboard/sections/Potensi";
import DataStunting from "../components/dashboard/sections/DataStunting";
import JumlahStuntingDiDesaKelurahan from "../components/dashboard/sections/JumlahStuntingDiDesaKelurahan";
import PageTitle from "../components/PageTitle";
import useAuth from "../hooks/useAuth";
import useGetResultData from "../hooks/useGetResultData";
import { BASE_API_URL } from "../utils/api";
import { dashboardResultDataType } from "../types/DashboardTypes";
import { useState } from "react";
import LoadingDots from "../components/LoadingDots";
import useTitle from "../hooks/useTitle";

export default function Dashboard() {
  useAuth();
  useTitle("Dashboard")

  const [loading, setIsLoading] = useState(false);
  const resultData = useGetResultData<dashboardResultDataType>(
    `${BASE_API_URL}pembangunan?k3=&k4=`,
    setIsLoading,
  );
  if (loading) return <LoadingDots />;

  return (
    <div className="px-4 py-10">

      <PageTitle title="Dashboard" last_updated={resultData?.last_updated} />

      <FlashNews resultData={resultData} />

      <CapaianDanPotensi resultData={resultData}/>

      <SkorIDMSekabupaten resultData={resultData} />

      <PetaPerkembanganDesa resultData={resultData} />

      <RekomendasiPembangunan resultData={resultData} />

      <Potensi resultData={resultData} />

      <DataStunting resultData={resultData} />

      <JumlahStuntingDiDesaKelurahan resultData={resultData} />
    </div>
  );
}
