import { SetStateAction } from "react";
import { BiSearch } from "react-icons/bi"
import { beritaDataType } from "../../types/BeritaTypes";

type props = {
    dataBerita: beritaDataType | null;
    search: {
        text: string;
        kecamatan: string;
        desa: string;
    };
    setSearch: React.Dispatch<SetStateAction<{
        text: string;
        kecamatan: string;
        desa: string;
    }>>;
}

export default function FilterBerita({ dataBerita, search, setSearch }: props) {
    return <div className="flex gap-x-5 mt-4 justify-between">
        <div className="flex relative w-1/3">
            <input onChange={(e) => setSearch(p => ({ ...p, text: e.target.value }))} type="text" placeholder="Cari Desa/Kelurahan..." className="focus:border-blue-400 focus:shadow border bg-white text-sm border-slate-300 rounded text-neutral-600 w-full outline-none pl-2 pr-10 py-1" />
            <BiSearch className="absolute right-2 top-1/2 -translate-y-1/2 size-6 fill-slate-600" />
        </div>

        <select onChange={(e) => setSearch(p => ({ ...p, kecamatan: e.target.value, desa: "" }))} className="focus:border-blue-400 focus:shadow border text-sm bg-white border-slate-300 rounded text-neutral-600 w-1/3 outline-none pl-2 pr-4 py-1">
            <option value="">Semua Kecamatan</option>
            {dataBerita?.list_kecamatan.map(d => <option key={d.kode_wilayah} value={d.nama_kecamatan}>{d.nama_kecamatan}</option>)}
        </select>

        <select onChange={(e) => setSearch(p => ({ ...p, desa: e.target.value }))} className="focus:border-blue-400 mr-auto focus:shadow border text-sm bg-white border-slate-300 rounded text-neutral-600 w-1/3 outline-none pl-2 pr-4 py-1">
            <option value="">Semua Desa</option>
            {dataBerita?.list_desa.map(d => { if (d.nama_kecamatan === search.kecamatan) return <option key={d.kode_wilayah} value={d.nama_deskel}>{d.nama_deskel}</option> })}
        </select>
    </div>
}