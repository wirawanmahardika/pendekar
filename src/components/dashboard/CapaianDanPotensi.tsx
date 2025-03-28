import { BsSquareFill } from "react-icons/bs";

export default function CapaianDanPotensi() {
    return <div className="p-4 bg-white rounded shadow mt-8">
        <div className="flex items-center justify-between">
            <h2 className="font-bold text-xl">Capaian & Potensi Desa</h2>
            <button type="button" className="rounded px-4 py-2 bg-sky-200 text-sky-600 hover:bg-sky-300">Export Report</button>
        </div>

        <div className="flex gap-y-3 flex-col mt-5">
            <span className="capitalize">Menampilkan capaian dan potensi desa/kelurahan</span>
            <select name="" id="" className="form-select rounded border-2 outline-none border-sky-500 py-1 w-2/5 px-2">
                <option value="">[Capaian] Klasifikasi Desa</option>
                <option value="">[Capaian] Klasifikasi Desa</option>
                <option value="">[Capaian] Klasifikasi Desa</option>
            </select>
        </div>

        <div className="flex items-start justify-between gap-x-9 mt-5">
            <span className="capitalize font-semibold w-1/5 text-gray-700">Keterangan :</span>
            <div className="grid grid-cols-3 justify-items-center grow gap-7">
                <div className="flex items-center justify-center gap-x-2">
                    <BsSquareFill className="fill-sky-600" />
                    <span>SWASEMBADA</span>
                </div>
                <div className="flex items-center justify-center gap-x-2">
                    <BsSquareFill className="fill-orange-600" />
                    <span>SWAKARYA</span>
                </div>
                <div className="flex items-center justify-center gap-x-2">
                    <BsSquareFill className="fill-emerald-600" />
                    <span>SWADAYA</span>
                </div>
                <div className="flex items-center justify-center gap-x-2">
                    <BsSquareFill className="fill-fuchsia-600" />
                    <span>SWASEMBADA</span>
                </div>
            </div>
        </div>
    </div>
}