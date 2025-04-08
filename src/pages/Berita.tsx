import { BiSearch } from "react-icons/bi";
import PageTitle from "../components/PageTitle";
import useAuth from "../hooks/useAuth";

export default function Berita() {
    useAuth()
    return <div className="px-4 py-10">
        <PageTitle title="BERITA" />

        <div className="flex mt-9 flex-col bg-white p-4 rounded shadow">
            <span className="font-bold text-2xl">Produk UMKM Desa/Kelurahan</span>
            <div className="flex gap-x-5 mt-4 justify-between">
                <div className="flex relative w-1/3">
                    <input type="text" placeholder="Cari Desa/Kelurahan..." className="focus:border-blue-400 focus:shadow border bg-white text-sm border-slate-300 rounded text-neutral-600 w-full outline-none pl-2 pr-10 py-1" />
                    <BiSearch className="absolute right-2 top-1/2 -translate-y-1/2 size-6 fill-slate-600" />
                </div>

                <select name="" className="focus:border-blue-400 focus:shadow border text-sm bg-white border-slate-300 rounded text-neutral-600 w-1/3 outline-none pl-2 pr-4 py-1">
                    <option value="">Semua Kecamatan</option>
                    <option value="">Semua Kecamatan</option>
                    <option value="">Semua Kecamatan</option>
                </select>

                <select name="" className="focus:border-blue-400 mr-auto focus:shadow border text-sm bg-white border-slate-300 rounded text-neutral-600 w-1/3 outline-none pl-2 pr-4 py-1">
                    <option value="">Semua Desa</option>
                    <option value="">Semua Desa</option>
                    <option value="">Semua Desa</option>
                </select>
            </div>

            <div className="flex mt-5 flex-col gap-y-5">
                <BeritaCard />
                <BeritaCard />
                <BeritaCard />
                <BeritaCard />
            </div>


            <div className="flex mt-4 justify-center">
                <div className="join">
                    <button className="join-item btn bg-white text-gray-800">{"<<"}</button>
                    <button className="join-item btn bg-white text-gray-800">1</button>
                    <button className="join-item btn bg-white text-gray-800">...</button>
                    <button className="join-item btn bg-white text-gray-800">9</button>
                    <button className="join-item btn bg-white text-gray-800">{">>"}</button>
                </div>
            </div>
        </div>
    </div>
}

const BeritaCard = () => {
    return <div className="flex gap-x-3 items-center">
        <img className="w-1/6 rounded" src="https://cdn.digitaldesa.com/uploads/profil/61.04.16.2007/berita/thumbs/0152f55e3a0056c012660c7b771977fe.jpeg" alt="berita" />
        <div className="flex flex-col gap-y-1">
            <a href="" className="font-semibold text-lg text-blue-900">Garden Fish Ketapang</a>
            <span className="text-sm line-clamp-2">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi aut est nulla rem, delectus aliquam adipisci vel alias culpa! Expedita inventore exercitationem quis numquam earum. Sit accusantium eius pariatur porro harum, numquam ipsum dolorum minima temporibus voluptatem tempora velit explicabo!</span>
        </div>
    </div>
}