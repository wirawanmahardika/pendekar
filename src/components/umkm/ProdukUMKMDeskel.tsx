import { BiSearch } from "react-icons/bi";
import ExportReportButton from "../ExportReportButton";
import { useEffect, useState } from "react";
import { umkmCardType, umkmDataType } from "../../types/umkmTypes";
import ProdukCard from "./ProdukCard";

export default function ProdukUMKMDeskel({ resultData }: { resultData?: umkmDataType }) {
    const [search, setSearch] = useState({ text: "", kecamatan: "", desa: "", jenisUmkm: "" })
    const [dataTodisplay, setDataToDisplay] = useState<umkmCardType[]>()

    useEffect(() => {
        const listUmkm = resultData?.list_umkm.filter(lumkm => {
            let status: boolean = true;
            if (search.kecamatan) status = status && lumkm.k3 === search.kecamatan
            if (search.desa) status = status && lumkm.k4 === search.desa
            if (search.jenisUmkm) status = status && lumkm.tipe_usaha.toLowerCase() === search.jenisUmkm
            if (search.text) status = status && lumkm.nama_deskel.toLowerCase().includes(search.text.toLowerCase())
            return status
        })
        setDataToDisplay(listUmkm)
    }, [search])

    return <>
        <div className="flex mt-9 flex-col">
            <span className="font-bold text-2xl">Produk UMKM Desa/Kelurahan</span>
            <div className="flex gap-x-5 pt-2">
                <div className="flex relative">
                    <input onChange={e => setSearch(p => ({ ...p, text: e.target.value }))} type="text" placeholder="Cari Desa/Kelurahan..." className="focus:border-blue-400 focus:shadow border bg-white text-sm border-slate-300 rounded text-neutral-600 w-full outline-none pl-2 pr-10 py-1" />
                    <BiSearch className="absolute right-2 top-1/2 -translate-y-1/2 size-6 fill-slate-600" />
                </div>

                <select onChange={e => setSearch(p => ({ ...p, jenisUmkm: e.target.value }))} className="capitalize focus:border-blue-400 focus:shadow border text-sm bg-white border-slate-300 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-1">
                    <option value="">Semua Jenis UMKM</option>
                    {/* list jenis umkm */}
                    {Object.keys(resultData?.jenis_umkm || {}).map((u, i) => <option key={i} value={u.replace(/_/g, " ")}>{u.replace(/_/g, " ")}</option>)}
                </select>

                <select onChange={e => setSearch(p => ({ ...p, kecamatan: e.target.value, desa: "" }))} className="focus:border-blue-400 focus:shadow border text-sm bg-white border-slate-300 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-1">
                    <option value="">Semua Kecamatan</option>
                    {/* list kecamatan */}
                    {resultData?.list_kecamatan.map(d => <option key={d.kode_wilayah} value={d.k3}>{d.nama_kecamatan}</option>)}
                </select>

                <select onChange={e => setSearch(p => ({ ...p, desa: e.target.value }))} className="focus:border-blue-400 focus:shadow border text-sm bg-white border-slate-300 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-1">
                    <option value="">Semua Desa</option>
                    {/* list desa */}
                    {resultData?.list_desa.map(d => { if (d.k3 === search.kecamatan) return <option key={d.kode_wilayah} value={d.k4}>{d.nama_deskel}</option> })}
                </select>

                <ExportReportButton url="export/umkm" />
            </div>
        </div>

        <div className="grid grid-cols-3 gap-6 mt-5">
            {dataTodisplay?.map(p => <ProdukCard key={p.kode_wilayah + p.nama_usaha} data={p} />)}
        </div>
    </>
}