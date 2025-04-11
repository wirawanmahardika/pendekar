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
            <div className="bg-white rounded p-4 flex flex-col">
                <div className="flex items-center justify-between">
                    <span className="font-bold text-xl">Usaha Di Diwilayah</span>
                    <ExportReportButton />
                </div>
                <div className="flex gap-x-5 pt-2">
                    <div className="flex relative">
                        <input type="text" placeholder="Cari Desa/Kelurahan..." className="focus:border-blue-400 focus:shadow border text-sm border-slate-300 rounded text-neutral-600 w-full outline-none pl-2 pr-10 py-1" />
                        <BiSearch className="absolute right-2 top-1/2 -translate-y-1/2 size-6 fill-slate-600" />
                    </div>

                    <select name="" className="focus:border-blue-400 focus:shadow border text-sm border-slate-300 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-1">
                        <option value="">Semua Kecamatan</option>
                        <option value="">Semua Kecamatan</option>
                        <option value="">Semua Kecamatan</option>
                    </select>

                    <select name="" className="focus:border-blue-400 focus:shadow border text-sm border-slate-300 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-1">
                        <option value="">Semua Desa</option>
                        <option value="">Semua Desa</option>
                        <option value="">Semua Desa</option>
                    </select>
                </div>
                <BarChart />
            </div>
            <div className="bg-white rounded p-4 flex flex-col">
                <div className="flex items-center justify-between">
                    <span className="font-bold text-xl">Jenis Usaha</span>
                    <ExportReportButton />
                </div>
                <div className="flex gap-x-5 pt-2">
                    <div className="flex relative">
                        <input type="text" placeholder="Cari Desa/Kelurahan..." className="focus:border-blue-400 focus:shadow border text-sm border-slate-300 rounded text-neutral-600 w-full outline-none pl-2 pr-10 py-1" />
                        <BiSearch className="absolute right-2 top-1/2 -translate-y-1/2 size-6 fill-slate-600" />
                    </div>

                    <select name="" className="focus:border-blue-400 focus:shadow border text-sm border-slate-300 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-1">
                        <option value="">Semua Kecamatan</option>
                        <option value="">Semua Kecamatan</option>
                        <option value="">Semua Kecamatan</option>
                    </select>

                    <select name="" className="focus:border-blue-400 focus:shadow border text-sm border-slate-300 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-1">
                        <option value="">Semua Desa</option>
                        <option value="">Semua Desa</option>
                        <option value="">Semua Desa</option>
                    </select>
                </div>
                <BarChart />
            </div>
        </div>

        <ProdukUMKMDeskel resultData={resultData} />
    </div>
}
