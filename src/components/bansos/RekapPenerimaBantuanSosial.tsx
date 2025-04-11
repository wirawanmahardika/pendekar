import { BiSearch } from "react-icons/bi";
import ExportReportButton from "../ExportReportButton";
import { bansosType, desaBansos } from "../../types/BansosTypes";
import { useEffect, useState } from "react";
import { AxiosAuth } from "../../utils/axios";
import { BASE_API_URL } from "../../utils/api";
import TabelRekapPenerimaBansos from "./TabelRekapPenerimaBansos";

export default
    function RekapPenerimaBantuanSosial({ resultData }: { resultData?: bansosType }) {
    const [search, setSearch] = useState({ text: "", kecamatan: "", desa: "" })
    const [dataTodisplay, setDataToDisplay] = useState<desaBansos[]>()


    useEffect(() => {
        const idTimeout = setTimeout(() => {
            AxiosAuth
                .get(`${BASE_API_URL}bansos?k3=${search.kecamatan}&k4=${search.desa}&search=${search.text}`)
                .then((result) => {
                    setDataToDisplay(result.data.data.list_bansos)
                })
                .catch((error) => alert(error.message))
        }, 500);
        return () => clearTimeout(idTimeout)
    }, [search])



    const listKecamatan = resultData?.list_kecamatan.map(d => {
        return <option key={d.kode_wilayah} value={d.k3}>{d.nama_kecamatan}</option>
    })

    const listDesa = resultData?.list_desa.map(d => {
        if (d.k3 === search.kecamatan) return <option key={d.kode_wilayah} value={d.k4}>{d.nama_deskel}</option>
    })

    const pencarianChangeEvenet = (e: any) => {
        setSearch(p => ({ ...p, text: e.target.value }))
    }

    const kecamatanChangeEvent = (e: any) => {
        setSearch(p => ({ ...p, kecamatan: e.target.value, desa: "" }))
    }

    const desaChangeEvent = (e: any) => {
        setSearch(p => ({ ...p, desa: e.target.value }))
    }

    return <div className="p-4 bg-white rounded shadow mt-8">
        <div className="flex items-center justify-between">
            <h2 className="font-bold text-xl">Rekap Penerima Bantuan Sosial</h2>
            <ExportReportButton />
        </div>
        <div className="flex gap-x-5 pt-2">
            <div className="flex relative">
                <input onChange={pencarianChangeEvenet} type="text" placeholder="Cari Desa/Kelurahan..." className="focus:border-blue-400 focus:shadow border text-sm border-slate-300 rounded text-neutral-600 w-full outline-none pl-2 pr-10 py-1" />
                <BiSearch className="absolute right-2 top-1/2 -translate-y-1/2 size-6 fill-slate-600" />
            </div>

            <select onChange={kecamatanChangeEvent} className="focus:border-blue-400 focus:shadow border text-sm border-slate-300 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-1">
                <option value="">Semua Kecamatan</option>
                {listKecamatan}
            </select>

            <select onChange={desaChangeEvent} className="focus:border-blue-400 focus:shadow border text-sm border-slate-300 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-1">
                <option value="">Semua Desa</option>
                {listDesa}
            </select>
        </div>

        <TabelRekapPenerimaBansos data={dataTodisplay} />
    </div>
}