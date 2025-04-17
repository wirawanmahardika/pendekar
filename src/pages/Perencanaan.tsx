import useTitle from "../hooks/useTitle";
import useAuth from "../hooks/useAuth";
import PageTitle from "../components/PageTitle";
import TabelDokumenDanPerencanaanDesa from "../components/perencanaan/TabelDokumenDanPerencanaanDesa";
import MonitoringPerencanaan from "../components/perencanaan/MonitoringPerencanaan";
import DaftarPenolakanPerencanaan from "../components/perencanaan/DaftarPenolakanPerencanaan";

export default function Perencanaan() {
    useAuth()
    useTitle('Perencanaan')

    return (
        <div className="p-4">
            <PageTitle title="Perencanaan" />

            <MonitoringPerencanaan />
            <DaftarPenolakanPerencanaan />

            <TabelDokumenDanPerencanaanDesa />
        </div>
    );
};
