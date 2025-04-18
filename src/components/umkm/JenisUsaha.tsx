import { BiSearch } from "react-icons/bi";
import ExportReportButton from "../ExportReportButton";
import ReactECharts from "echarts-for-react";
import { useEffect, useState } from "react";
import { AxiosAuth } from "../../utils/axios";
import { BASE_API_URL } from "../../utils/api";
import { umkmChartType, umkmDataType } from "../../types/umkmTypes";

export default function JenisUsaha({ resultData }: { resultData?: umkmDataType }) {
    const [search, setSearch] = useState({ text: "", kecamatan: "", desa: "" })
    const [dataTodisplay, setDataToDisplay] = useState<umkmChartType>()


    useEffect(() => {
        const idTimeout = setTimeout(() => {
            AxiosAuth
                .get(`${BASE_API_URL}umkm?k3=${search.kecamatan}&k4=${search.desa}&search=${search.text}&type=&limit=`)
                .then((result) => {
                    if (!search.kecamatan && !search.desa && !search.text) {
                        setDataToDisplay(result.data.data.chart_umkm)
                    } else {
                        const listDesa = result.data.data.list_desa
                        let listBaru: umkmChartType = {
                            "barang_&_jasa":0,
                            "elektronik_&_gadget":0,
                            kelautan:0,
                            kendaraan:0,
                            keperluan_pribadi:0,
                            "makanan_&_minuman":0,
                            pertanian:0,
                            peternakan:0,
                            properti:0,
                            rumah_tangga:0,
                            sembako:0,
                        };

                        for (const desa of listDesa) {
                            listBaru["barang_&_jasa"] += parseInt(desa["barang_&_jasa"])
                            listBaru["elektronik_&_gadget"] += parseInt(desa["elektronik_&_gadget"])
                            listBaru["makanan_&_minuman"] += parseInt(desa["makanan_&_minuman"])
                            listBaru.kelautan += parseInt(desa.kelautan)
                            listBaru.kendaraan += parseInt(desa.kendaraan)
                            listBaru.keperluan_pribadi += parseInt(desa.keperluan_pribadi)
                            listBaru.pertanian += parseInt(desa.pertanian)
                            listBaru.peternakan += parseInt(desa.peternakan)
                            listBaru.properti += parseInt(desa.properti)
                            listBaru.sembako += parseInt(desa.sembako)
                            listBaru.rumah_tangga += parseInt(desa.rumah_tangga)
                        }
                        setDataToDisplay(listBaru)
                    }
                })
                .catch((error) => alert(error.message))
        }, 500);
        return () => clearTimeout(idTimeout)
    }, [search])

    return <div className="bg-white rounded p-4 flex flex-col h-[600px]">
        <div className="flex items-center justify-between">
            <span className="font-bold text-xl">Jenis Usaha</span>
            <ExportReportButton url="export/jenis_usaha" />
        </div>
        <div className="flex gap-x-5 pt-2">
        <div className="flex relative">
                <input onChange={e => setSearch(p => ({ ...p, text: e.target.value }))} type="text" placeholder="Cari Desa/Kelurahan..." className="focus:border-blue-400 focus:shadow border text-sm border-slate-300 rounded text-neutral-600 w-full outline-none pl-2 pr-10 py-1" />
                <BiSearch className="absolute right-2 top-1/2 -translate-y-1/2 size-6 fill-slate-600" />
            </div>

            <select onChange={e => setSearch(p => ({ ...p, kecamatan: e.target.value, desa: "" }))} className="focus:border-blue-400 focus:shadow border text-sm border-slate-300 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-1">
                <option value="">Semua Kecamatan</option>
                {resultData?.list_kecamatan.map(d => <option key={d.kode_wilayah} value={d.k3}>{d.nama_kecamatan}</option>)}
            </select>

            <select onChange={e => setSearch(p => ({ ...p, desa: e.target.value }))} className="focus:border-blue-400 focus:shadow border text-sm border-slate-300 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-1">
                <option value="">Semua Desa</option>
                {resultData?.list_desa.map(d => { if (d.k3 === search.kecamatan) return <option key={d.kode_wilayah} value={d.k4}>{d.nama_deskel}</option> })}
            </select>
        </div>
        <div className="h-full">
            <BarChart data={dataTodisplay} />
        </div>
    </div>
}



const BarChart = ({ data }: { data?: umkmChartType }) => {
    if (!data) return;

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
            data: Object.keys(data).map(d => { return d.replace(/_/g, " ") }),
        },
        series: [
            {
                name: "Jumlah",
                type: "bar",
                data: Object.values(data)
            },
        ],
    };

    return <ReactECharts option={option} className="!w-full !h-full" />;
};

