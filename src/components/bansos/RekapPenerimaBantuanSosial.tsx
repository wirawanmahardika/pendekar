import { BiSearch } from "react-icons/bi";
import ExportReportButton from "../ExportReportButton";
import { bansosType, desaBansos } from "../../types/BansosTypes";
import { useEffect, useState } from "react";
import TabelRekapPenerimaBansos from "./TabelRekapPenerimaBansos";

export default
    function RekapPenerimaBantuanSosial({ resultData }: { resultData?: bansosType }) {
    const [search, setSearch] = useState({ text: "", kecamatan: "", desa: "" })
    const [dataTodisplay, setDataToDisplay] = useState<desaBansos[]>()

    useEffect(() => {
        const listBansos = resultData?.list_bansos.filter(lb => {
            let status: boolean = true;
            if (search.kecamatan) status = status && lb.k3 === search.kecamatan
            if (search.desa) status = status && lb.k4 === search.desa
            if (search.text) status = status && lb.nama_deskel.toLowerCase().includes(search.text.toLowerCase())

            return status
        })
        setDataToDisplay(listBansos)
    }, [search])

    return <div className="p-4 bg-white rounded shadow mt-8">
        <div className="flex items-center justify-between">
            <h2 className="font-bold text-xl">Rekap Penerima Bantuan Sosial</h2>
            <ExportReportButton url="export/rekap_bansos" />
        </div>
        <div className="flex gap-x-5 pt-2">
            <div className="flex relative">
                <input onChange={(e) => setSearch(p => ({ ...p, text: e.target.value }))} type="text" placeholder="Cari Desa/Kelurahan..." className="focus:border-blue-400 focus:shadow border text-sm border-slate-300 rounded text-neutral-600 w-full outline-none pl-2 pr-10 py-1" />
                <BiSearch className="absolute right-2 top-1/2 -translate-y-1/2 size-6 fill-slate-600" />
            </div>

            <select onChange={(e) => setSearch(p => ({ ...p, kecamatan: e.target.value, desa: "" }))} className="focus:border-blue-400 focus:shadow border text-sm border-slate-300 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-1">
                <option value="">Semua Kecamatan</option>
                {resultData?.list_kecamatan.map(d => <option key={d.kode_wilayah} value={d.k3}>{d.nama_kecamatan}</option>)}
            </select>

            <select onChange={(e) => setSearch(p => ({ ...p, desa: e.target.value }))} className="focus:border-blue-400 focus:shadow border text-sm border-slate-300 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-1">
                <option value="">Semua Desa</option>
                {resultData?.list_desa.map(d => { if (d.k3 === search.kecamatan) return <option key={d.kode_wilayah} value={d.k4}>{d.nama_deskel}</option> })}
            </select>
        </div>

        <TabelRekapPenerimaBansos data={dataTodisplay} />
    </div>
}