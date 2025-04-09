import { BiSearch } from "react-icons/bi";
import ExportReportButton from "../components/ExportReportButton";
import PageTitle from "../components/PageTitle";
import ReactECharts from "echarts-for-react";
import { BsFillSignTurnRightFill } from "react-icons/bs";
import { umkmProdukDesaStyle } from "../utils/themeSetting";
import useAuth from "../hooks/useAuth";

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

        <div className="flex mt-9 flex-col">
            <span className="font-bold text-2xl">Produk UMKM Desa/Kelurahan</span>
            <div className="flex gap-x-5 pt-2">
                <div className="flex relative">
                    <input type="text" placeholder="Cari Desa/Kelurahan..." className="focus:border-blue-400 focus:shadow border bg-white text-sm border-slate-300 rounded text-neutral-600 w-full outline-none pl-2 pr-10 py-1" />
                    <BiSearch className="absolute right-2 top-1/2 -translate-y-1/2 size-6 fill-slate-600" />
                </div>

                <select name="" className="focus:border-blue-400 focus:shadow border text-sm bg-white border-slate-300 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-1">
                    <option value="">Semua Jenis UMKM</option>
                    <option value="">Semua Jenis UMKM</option>
                    <option value="">Semua Jenis UMKM</option>
                </select>

                <select name="" className="focus:border-blue-400 focus:shadow border text-sm bg-white border-slate-300 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-1">
                    <option value="">Semua Kecamatan</option>
                    <option value="">Semua Kecamatan</option>
                    <option value="">Semua Kecamatan</option>
                </select>

                <select name="" className="focus:border-blue-400 focus:shadow border text-sm bg-white border-slate-300 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-1">
                    <option value="">Semua Desa</option>
                    <option value="">Semua Desa</option>
                    <option value="">Semua Desa</option>
                </select>

                <ExportReportButton />
            </div>
        </div>

        <div className="grid grid-cols-3 gap-6 mt-5">
            <Produk />
            <Produk />
            <Produk />
            <Produk />
            <Produk />
            <Produk />
        </div>
    </div>
}

const Produk = () => {
    return <div className="flex bg-white rounded p-5 shadow gap-x-3 items-center">
        <div className="w-1/2 relative">
            <img src="https://cdn.digitaldesa.com/uploads/marketplace/products/dbc9d16b76ad7eed18cf741223a5b9a8.jpg" alt="produk" className="rounded-l-lg" />
            <span style={umkmProdukDesaStyle.category} className="text-center px-2 py-1 rounded-tl-sm text-white absolute rounded-br-sm top-0 left-0 text-[10px]">Pertanian</span>
        </div>
        <div className="flex flex-col w-1/2 gap-y-1 text-gray-800">
            <span className="font-semibold text-lg leading-6">Jeruk Madu Kalibaru</span>
            <span className="text-xs font-semibold">Desa Sungai Awan Kiri, Kec. Muara Pawan</span>
            <span className="text-xs">Order Via : </span>
            <ul className="text-xs pl-5">
                <li>DIGIDES</li>
                <li>Toko Pedia</li>
                <li>Grab/Gojek</li>
            </ul>
            <div className="flex gap-x-3 items-center text-sm" style={umkmProdukDesaStyle.penunjukArah}>
                <BsFillSignTurnRightFill />
                <span>Penunjuk Arah</span>
            </div>
        </div>
    </div>
}