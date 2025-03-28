import FlashNews from "../components/dashboard/FlashNews";
import CapaianDanPotensi from "../components/dashboard/CapaianDanPotensi";
import SkorIDMSekabupaten from "../components/dashboard/SkorIDMSekabupaten";
import PetaPerkembanganDesa from "../components/dashboard/PetaPerkembanganDesa";
import RekomendasiPembangunan from "../components/dashboard/RekomendasiPembangunan";
import Potensi from "../components/dashboard/Potensi";
import DataStunting from "../components/dashboard/DataStunting";
import JumlahStuntingDiDesaKelurahan from "../components/dashboard/JumlahStuntingDiDesaKelurahan";
import PageTitle from "../components/PageTitle";

export default function Dashboard() {
    return <div className="px-4 py-10">
        <PageTitle title="Dashboard" />

        <FlashNews />

        <CapaianDanPotensi />

        <SkorIDMSekabupaten />

        <PetaPerkembanganDesa />

        <RekomendasiPembangunan />

        <Potensi />

        <DataStunting />

        <JumlahStuntingDiDesaKelurahan />
    </div>
}