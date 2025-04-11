import { BiSearch } from "react-icons/bi";
import ExportReportButton from "../components/ExportReportButton";
import PageTitle from "../components/PageTitle";
import ReactECharts from "echarts-for-react";
import useAuth from "../hooks/useAuth";
import useTitle from "../hooks/useTitle";
import { BASE_API_URL } from "../utils/api";
import useGetResultData from "../hooks/useGetResultData";
import { umkmDataType } from "../types/umkmTypes";
import ProdukUMKMDeskel from "../components/umkm/ProdukUMKMDeskel";
import JenisUsaha from "../components/umkm/JenisUsaha";
import UsahaDiWilayah from "../components/umkm/UsahaDiWilayah";

const BarChart = () => {
    const option = {
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "shadow",
            },
        },
        grid: {
            containLabel: true
        },
        xAxis: {
            type: "value", // Menjadikan X sebagai nilai (value)
            boundaryGap: [0, 0.1],
        },
        yAxis: {
            type: "category", // Menjadikan Y sebagai kategori
            data: ["Produk A", "Produk B", "Produk C", "Produk D"],
        },
        series: [
            {
                name: "Jumlah",
                type: "bar",
                data: [50, 75, 100, 125], // Nilai untuk masing-masing kategori
            },
        ],
    };

    return <ReactECharts option={option} className="w-full h-full" />;
};

export default function UMKM() {
    useAuth()
    useTitle('UMKM')

    const resultData= useGetResultData<umkmDataType>(`${BASE_API_URL}umkm?k3=&k4=&search=&type=&limit=`);
    

    return <div className="px-4 py-10">
        <PageTitle title="UMKM" />

        <div className="grid grid-cols-2 gap-3">
            <UsahaDiWilayah resultData={resultData} />
            <JenisUsaha resultData={resultData} />
        </div>

        <ProdukUMKMDeskel resultData={resultData} />
    </div>
}
