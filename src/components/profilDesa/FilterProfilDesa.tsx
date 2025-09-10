import { BiSearch } from "react-icons/bi";
import { profilDesaDataType } from "../../types/ProfileDesaTypes";

type props = {
    dataProfilDesa: profilDesaDataType | undefined
    search: {
        text: string;
        kecamatan: string;
        desa: string;
    },
    setSearch: React.Dispatch<React.SetStateAction<props['search']>>,
}
export default function FilterProfilDesa({ search, setSearch, dataProfilDesa }: props) {
    return <div className="flex gap-x-5 pt-2">
        <div className="flex relative">
            <input onChange={(e: any) => setSearch(prev => ({ ...prev, text: e.target.value }))} type="text" placeholder="Cari Desa/Kelurahan..." className="focus:border-blue-400 focus:shadow border text-sm border-slate-300 rounded text-neutral-600 w-full outline-none pl-2 pr-10 py-1" />
            <BiSearch className="absolute right-2 top-1/2 -translate-y-1/2 size-6 fill-slate-600" />
        </div>

        <select onChange={(e: any) => setSearch(prev => ({ ...prev, kecamatan: e.target.value, desa: "" }))} className="focus:border-blue-400 focus:shadow border text-sm border-slate-300 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-1">
            <option value={""}>Semua Kecamatan</option>
            {dataProfilDesa?.list_kecamatan.map(d => <option key={d.kode_wilayah} value={d.k3}>{d.nama_kecamatan}</option>)}
        </select>

        <select onChange={(e: any) => setSearch(prev => ({ ...prev, desa: e.target.value }))} className="focus:border-blue-400 focus:shadow border text-sm border-slate-300 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-1">
            <option value={""}>Semua Desa</option>
            {search.kecamatan && dataProfilDesa?.list_desa.map(d => {
                if (d.k3 !== search.kecamatan) return;
                return <option key={d.kode_wilayah} value={d.k4}>{d.nama_deskel}</option>
            })}
        </select>
    </div>
}