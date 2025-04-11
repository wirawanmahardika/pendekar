import { BiSearch } from "react-icons/bi";
import ExportReportButton from "../ExportReportButton";
import { useEffect, useState } from "react";
import { umkmCardType, umkmDataType } from "../../types/umkmTypes";
import { AxiosAuth } from "../../utils/axios";
import { BASE_API_URL } from "../../utils/api";
import ProdukCard from "./ProdukCard";

export default function ProdukUMKMDeskel({ resultData }: { resultData?: umkmDataType }) {
    const [search, setSearch] = useState({ text: "", kecamatan: "", desa: "", jenisUmkm: "" })
    const [dataTodisplay, setDataToDisplay] = useState<umkmCardType[]>()


    useEffect(() => {
        const idTimeout = setTimeout(() => {
            AxiosAuth
                .get(`${BASE_API_URL}umkm?k3=${search.kecamatan}&k4=${search.desa}&search=${search.text}&type=${search.jenisUmkm}&limit=`)
                .then((result) => {
                    setDataToDisplay(result.data.data.list_umkm)
                })
                .catch((error) => alert(error.message))
        }, 500);
        return () => clearTimeout(idTimeout)
    }, [search])

    const listJenisUMKM = Object.keys(resultData?.jenis_umkm || {}).map((u, i) => {
        const formatted = u.replace(/_/g, " ")
        return <option key={i} value={u}>{formatted}</option>
    })

    const listKecamatan = resultData?.list_kecamatan.map(d => {
        return <option key={d.kode_wilayah} value={d.k3}>{d.nama_kecamatan}</option>
    })

    const listDesa = resultData?.list_desa.map(d => {
        if (d.k3 === search.kecamatan) return <option key={d.kode_wilayah} value={d.k4}>{d.nama_deskel}</option>
    })

    const pencarianChangeEvenet = (e: any) => {
        setSearch(p => ({ ...p, text: e.target.value }))
    }

    const jenisUmkmChangeEvent = (e: any) => {
        setSearch(p => ({ ...p, jenisUmkm: e.target.value }))
    }

    const kecamatanChangeEvent = (e: any) => {
        setSearch(p => ({ ...p, kecamatan: e.target.value, desa: "" }))
    }

    const desaChangeEvent = (e: any) => {
        setSearch(p => ({ ...p, desa: e.target.value }))
    }


    return <>
        <div className="flex mt-9 flex-col">
            <span className="font-bold text-2xl">Produk UMKM Desa/Kelurahan</span>
            <div className="flex gap-x-5 pt-2">
                <div className="flex relative">
                    <input onChange={pencarianChangeEvenet} type="text" placeholder="Cari Desa/Kelurahan..." className="focus:border-blue-400 focus:shadow border bg-white text-sm border-slate-300 rounded text-neutral-600 w-full outline-none pl-2 pr-10 py-1" />
                    <BiSearch className="absolute right-2 top-1/2 -translate-y-1/2 size-6 fill-slate-600" />
                </div>

                <select onChange={jenisUmkmChangeEvent} className="capitalize focus:border-blue-400 focus:shadow border text-sm bg-white border-slate-300 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-1">
                    <option value="">Semua Jenis UMKM</option>
                    {listJenisUMKM}
                </select>

                <select onChange={kecamatanChangeEvent} className="focus:border-blue-400 focus:shadow border text-sm bg-white border-slate-300 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-1">
                    <option value="">Semua Kecamatan</option>
                    {listKecamatan}
                </select>

                <select onChange={desaChangeEvent} className="focus:border-blue-400 focus:shadow border text-sm bg-white border-slate-300 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-1">
                    <option value="">Semua Desa</option>
                    {listDesa}
                </select>

                <ExportReportButton />
            </div>
        </div>

        <div className="grid grid-cols-3 gap-6 mt-5">
            {
                dataTodisplay?.map(p => {
                    return <ProdukCard key={p.kode_wilayah + p.nama_usaha} data={p} />
                })
            }
        </div>
    </>
}