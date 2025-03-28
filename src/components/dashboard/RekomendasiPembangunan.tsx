import { BiSearch } from "react-icons/bi";

export default function RekomendasiPembangunan() {
    return <div className="p-4 bg-white rounded shadow mt-8">
        <div className="flex items-center justify-between">
            <h2 className="font-bold text-xl">Rekomendasi Pembangunan</h2>
            <button type="button" className="rounded px-4 py-2 bg-sky-200 text-sky-600 hover:bg-sky-300">Export Report</button>
        </div>
        <div className="flex gap-x-5 pt-2">
            <div className="flex relative">
                <input type="text" placeholder="Cari Desa/Kelurahan..." className="focus:border-blue-400 focus:shadow border text-sm border-slate-300 rounded text-neutral-600 w-full outline-none pl-2 pr-10 py-1" />
                <BiSearch className="absolute right-2 top-1/2 -translate-y-1/2 size-6 fill-slate-600" />
            </div>

            <select name="" className="focus:border-blue-400 focus:shadow border text-sm border-slate-300 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-1">
                <option value="">Semua Kecamatan</option>
                <option value="">Semua Kecamatan</option>
                <option value="">Semua Kecamatan</option>
            </select>

            <select name="" className="focus:border-blue-400 focus:shadow border text-sm border-slate-300 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-1">
                <option value="">Semua Desa</option>
                <option value="">Semua Desa</option>
                <option value="">Semua Desa</option>
            </select>
        </div>

        <table className="overflow-x-auto min-w-full mt-5 text-neutral-700">
            <thead>
                <tr className="bg-sky-300">
                    <th className="p-2 border border-gray-300">No</th>
                    <th className="p-2 border border-gray-300">Kecamatan</th>
                    <th className="p-2 border border-gray-300">Desa</th>
                    <th className="p-2 border border-gray-300">Status</th>
                    <th className="p-2 border border-gray-300">Skor IDM</th>
                    <th className="p-2 border border-gray-300">Skor SDGS</th>
                    <th className="p-2 border border-gray-300">Rekomendasi</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="p-2 border border-gray-300">1</td>
                    <td className="p-2 border border-gray-300">Sandai</td>
                    <td className="p-2 border border-gray-300">Alam Pakuan</td>
                    <td className="p-2 border border-gray-300">
                        <div className="badge bg-sky-50 text-sky-500 border-none">Berkembang</div>
                    </td>
                    <td className="p-2 border border-gray-300">0.6546</td>
                    <td className="p-2 border border-gray-300">20.9984</td>
                    <td className="p-2 border border-gray-300">
                        <div className="flex flex-col gap-y-4">
                            <button className="px-3 py-1 bg-sky-200 text-sky-500 rounded-md">Rekomendasi IDM</button>
                            <button className="px-3 py-1 bg-sky-200 text-sky-500 rounded-md">Rekomendasi SDGS</button>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td className="p-2 border border-gray-300">1</td>
                    <td className="p-2 border border-gray-300">Sandai</td>
                    <td className="p-2 border border-gray-300">Alam Pakuan</td>
                    <td className="p-2 border border-gray-300">
                        <div className="badge bg-emerald-50 text-emerald-500 border-none">Mandiri</div>
                    </td>
                    <td className="p-2 border border-gray-300">0.6546</td>
                    <td className="p-2 border border-gray-300">20.9984</td>
                    <td className="p-2 border border-gray-300">
                        <div className="flex flex-col gap-y-4">
                            <button className="px-3 py-1 bg-sky-200 text-sky-500 rounded-md">Rekomendasi IDM</button>
                            <button className="px-3 py-1 bg-sky-200 text-sky-500 rounded-md">Rekomendasi SDGS</button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>


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
}