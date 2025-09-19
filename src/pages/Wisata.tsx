import { BiSearch } from "react-icons/bi";
import ExportReportButton from "../components/ExportReportButton";
import PageTitle from "../components/PageTitle";
import useAuth from "../hooks/useAuth";
import { CDN_URL } from "../utils/api";
import LoadingDots from "../components/LoadingDots";
import HeadHtml from "../components/HeadHtml";
import useWisata from "../hooks/wisata/useWisata";

export default function Wisata() {
    useAuth()
    const { loading, setSearch, search, dataWisata, dataTodisplay } = useWisata()

    if(true) throw "asdf"

    if (loading) return <LoadingDots />
    return <div className="px-4 py-10">
        <HeadHtml title="Wisata" />
        <PageTitle title="WISATA DESA" last_updated={dataWisata?.last_updated} />

        <div className="flex mt-9 flex-col">
            <div className="flex gap-x-5 pt-2">
                <div className="flex relative">
                    <input onChange={(e) => setSearch(p => ({ ...p, text: e.target.value }))} type="text" placeholder="Cari Desa/Kelurahan..." className="focus:border-blue-400 focus:shadow border bg-white text-sm border-slate-300 rounded text-neutral-600 w-full outline-none pl-2 pr-10 py-1" />
                    <BiSearch className="absolute right-2 top-1/2 -translate-y-1/2 size-6 fill-slate-600" />
                </div>

                <select onChange={(e) => setSearch(p => ({ ...p, kecamatan: e.target.value, desa: "" }))} className="focus:border-blue-400 focus:shadow border text-sm bg-white border-slate-300 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-1">
                    <option value="">Semua Kecamatan</option>
                    {dataWisata?.list_kecamatan.map(d => <option key={d.kode_wilayah} value={d.k3}>{d.nama_kecamatan}</option>)}
                </select>

                <select onChange={(e) => setSearch(p => ({ ...p, desa: e.target.value }))} className="focus:border-blue-400 mr-auto focus:shadow border text-sm bg-white border-slate-300 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-1">
                    <option value="">Semua Desa</option>
                    {dataWisata?.list_desa.map(d => { if (d.k3 === search.kecamatan) return <option key={d.kode_wilayah} value={d.k4}>{d.nama_deskel}</option> })}
                </select>

                <ExportReportButton url="export/wisata" />
            </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-5">
            {dataTodisplay?.map(w => {
                return <WisataCard
                    key={w.kode_wilayah}
                    kode={w.kode_wilayah}
                    foto={w.foto}
                    judul={w.judul}
                    subjudul={w.subjudul}
                    url={"https://" + w.slug_desa + ".digitaldesa.id/wisata/" + w.slug}
                />
            })}
        </div>
    </div>
}

const WisataCard = ({ kode, foto, judul, subjudul, url }: { kode: string, foto: string, judul: string, subjudul: string, url: string }) => {
    return <a href={url} className="card bg-base-100 shadow-sm overflow-hidden">
        <figure>
            <img
                src={`${CDN_URL}uploads/profil/${kode}/berita/${foto}`}
                alt="Shoes" />
        </figure>
        <div className="card-body bg-white">
            <h2 className="card-title">
                {judul}
            </h2>
            <p>{subjudul}</p>
        </div>
    </a>
}
