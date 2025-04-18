import { BiSearch } from "react-icons/bi";
import ExportReportButton from "../ExportReportButton";
import ReactECharts from "echarts-for-react";
import { useEffect, useState } from "react";
import { AxiosAuth } from "../../utils/axios";
import { BASE_API_URL } from "../../utils/api";
import { desaKecamatanChartType, umkmDataType } from "../../types/umkmTypes";

function totalUsaha(data: desaKecamatanChartType) {
    delete data.k1;
    delete data.k2;
    delete data.k3;
    delete data.k4;
    delete data.jml_umkm;
    delete data.kode_wilayah;
    delete data.nama_deskel;
    delete data.nama_kecamatan;
    delete data.online;

    return Object.values(data).reduce((a: number, c: string) => a + parseInt(c), 0)
}

export default function UsahaDiWilayah({ resultData }: { resultData?: umkmDataType }) {
    const [search, setSearch] = useState({ text: "", kecamatan: "", desa: "" })
    const [dataTodisplay, setDataToDisplay] = useState<any>()

    useEffect(() => {
        const idTimeout = setTimeout(() => {
            AxiosAuth
                .get(`${BASE_API_URL}umkm?k3=${search.kecamatan}&k4=${search.desa}&search=${search.text}&type=&limit=`)
                .then((result) => {
                    const listDesaOrKecamatan = !search.kecamatan && !search.desa && !search.text ?
                        result.data.data.list_kecamatan
                        :
                        result.data.data.list_desa
                    const desaAtauKecamatan = !search.kecamatan && !search.desa && !search.text ?
                        "nama_kecamatan"
                        :
                        "nama_deskel"

                    const hasil = listDesaOrKecamatan.map((d: any) => {
                        return {
                            desaAtauKecamatan: d[desaAtauKecamatan],
                            totalUsaha: totalUsaha(d)
                        }
                    })
                    setDataToDisplay(hasil)
                })
                .catch((error) => alert(error.message))
        }, 500);
        return () => clearTimeout(idTimeout)
    }, [search])


    return <div className="bg-white rounded p-4 flex flex-col h-[600px]">
        <div className="flex items-center justify-between">
            <span className="font-bold text-xl">Usaha Di Diwilayah</span>
            <ExportReportButton url="export/usaha_di_wilayah" />
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



const BarChart = ({ data }: { data?: { desaAtauKecamatan: string; totalUsaha: number }[] }) => {
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
            data: data.map(d => d.desaAtauKecamatan),
        },
        series: [
            {
                name: "Jumlah",
                type: "bar",
                data: data.map(d => d.totalUsaha)
            },
        ],
    };

    return <ReactECharts option={option} className="!w-full !h-full" />;
};

