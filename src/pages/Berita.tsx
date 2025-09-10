import { BiSearch } from "react-icons/bi";
import PageTitle from "../components/PageTitle";
import useAuth from "../hooks/useAuth";
import ListBerita from "../components/berita/ListBerita";
import LoadingDots from "../components/LoadingDots";
import HeadHtml from "../components/HeadHtml";
import useBerita from "../hooks/berita/useBerita";

export default function Berita() {
    useAuth()

    const { loading, dataTodisplay, search, setSearch, resultData } = useBerita()
    if (loading) return <LoadingDots />

    return <div className="px-4 py-10">
        <HeadHtml title="Berita" />

        <PageTitle title="BERITA" last_updated={resultData?.last_updated} />

        <div className="flex mt-9 flex-col bg-white p-4 rounded shadow">
            <span className="font-bold text-2xl">Berita Desa Terbaru</span>
            <div className="flex gap-x-5 mt-4 justify-between">
                <div className="flex relative w-1/3">
                    <input onChange={(e) => setSearch(p => ({ ...p, text: e.target.value }))} type="text" placeholder="Cari Desa/Kelurahan..." className="focus:border-blue-400 focus:shadow border bg-white text-sm border-slate-300 rounded text-neutral-600 w-full outline-none pl-2 pr-10 py-1" />
                    <BiSearch className="absolute right-2 top-1/2 -translate-y-1/2 size-6 fill-slate-600" />
                </div>

                <select onChange={(e) => setSearch(p => ({ ...p, kecamatan: e.target.value, desa: "" }))} className="focus:border-blue-400 focus:shadow border text-sm bg-white border-slate-300 rounded text-neutral-600 w-1/3 outline-none pl-2 pr-4 py-1">
                    <option value="">Semua Kecamatan</option>
                    {resultData?.list_kecamatan.map(d => <option key={d.kode_wilayah} value={d.nama_kecamatan}>{d.nama_kecamatan}</option>)}
                </select>

                <select onChange={(e) => setSearch(p => ({ ...p, desa: e.target.value }))} className="focus:border-blue-400 mr-auto focus:shadow border text-sm bg-white border-slate-300 rounded text-neutral-600 w-1/3 outline-none pl-2 pr-4 py-1">
                    <option value="">Semua Desa</option>
                    {resultData?.list_desa.map(d => { if (d.nama_kecamatan === search.kecamatan) return <option key={d.kode_wilayah} value={d.nama_deskel}>{d.nama_deskel}</option> })}
                </select>
            </div>

            <ListBerita data={dataTodisplay} />
        </div>
    </div>
}
