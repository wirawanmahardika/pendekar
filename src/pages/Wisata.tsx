import { BiSearch } from "react-icons/bi";
import ExportReportButton from "../components/ExportReportButton";
import PageTitle from "../components/PageTitle";

export default function Wisata() {
    return <div className="px-4 py-10">
        <PageTitle title="WISATA DESA" />

        <div className="flex mt-9 flex-col">
            <span className="font-bold text-2xl">Produk UMKM Desa/Kelurahan</span>
            <div className="flex gap-x-5 pt-2">
                <div className="flex relative">
                    <input type="text" placeholder="Cari Desa/Kelurahan..." className="focus:border-blue-400 focus:shadow border bg-white text-sm border-slate-300 rounded text-neutral-600 w-full outline-none pl-2 pr-10 py-1" />
                    <BiSearch className="absolute right-2 top-1/2 -translate-y-1/2 size-6 fill-slate-600" />
                </div>

                <select name="" className="focus:border-blue-400 focus:shadow border text-sm bg-white border-slate-300 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-1">
                    <option value="">Semua Kecamatan</option>
                    <option value="">Semua Kecamatan</option>
                    <option value="">Semua Kecamatan</option>
                </select>

                <select name="" className="focus:border-blue-400 mr-auto focus:shadow border text-sm bg-white border-slate-300 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-1">
                    <option value="">Semua Desa</option>
                    <option value="">Semua Desa</option>
                    <option value="">Semua Desa</option>
                </select>

                <ExportReportButton />
            </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-5">
            <WisataCard />
            <WisataCard />
            <WisataCard />
            <WisataCard />
            <WisataCard />
            <WisataCard />
        </div>
    </div>
}

const WisataCard = () => {
    return <a href="" className="card bg-base-100 shadow-sm overflow-hidden">
        <figure>
            <img
                src="https://cdn.digitaldesa.com/uploads/profil/61.04.17.2002/berita/4709b5906cac0561499884bcc8ee371d.jpeg"
                alt="Shoes" />
        </figure>
        <div className="card-body bg-white">
            <h2 className="card-title">
                Pantai Tanjung Belanda
            </h2>
            <p>Destinasi wisata pantai tanjung belanda dengan view yang estetik</p>
        </div>
    </a>
}