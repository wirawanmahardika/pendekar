import { BiSearch } from "react-icons/bi";
import { BsSquareFill } from "react-icons/bs";
import JumlahStuntingDiDesaKelurahanScatterChart from "./charts/JumlahStuntingDiDesaKelurahanScatterChart";

export default function JumlahStuntingDiDesaKelurahan() {
    return <div className="p-4 bg-white rounded shadow mt-8">
        <div className="flex items-center justify-between">
            <h2 className="font-bold text-xl">JUMLAH STUNTING DI DESA/KELURAHAN</h2>
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

        <div className="flex items-start justify-between gap-x-9 mt-5">
            <span className="capitalize font-semibold w-1/5 text-gray-700">Keterangan :</span>
            <div className="grid grid-cols-3 justify-items-start grow gap-7">
                <div className="flex items-center justify-center gap-x-2">
                    <BsSquareFill className="fill-sky-600" />
                    <span className="text-sm">Keluarga Sasaran</span>
                </div>
                <div className="flex items-center justify-center gap-x-2">
                    <BsSquareFill className="fill-orange-600" />
                    <span className="text-sm">Berisiko</span>
                </div>
                <div className="flex items-center justify-center gap-x-2">
                    <BsSquareFill className="fill-emerald-600" />
                    <span className="text-sm">Baduta</span>
                </div>
                <div className="flex items-center justify-center gap-x-2">
                    <BsSquareFill className="fill-fuchsia-600" />
                    <span className="text-sm">Balita</span>
                </div>
                <div className="flex items-center justify-center gap-x-2">
                    <BsSquareFill className="fill-yellow-600" />
                    <span className="text-sm">Pasangan Usia Subur (PSU)</span>
                </div>
                <div className="flex items-center justify-center gap-x-2">
                    <BsSquareFill className="fill-red-600" />
                    <span className="text-sm">PUS Hamil</span>
                </div>
                <div className="flex items-center justify-center gap-x-2">
                    <BsSquareFill className="fill-slate-600" />
                    <span className="text-sm">Persentase</span>
                </div>
            </div>
        </div>

        <div className="w-full mt-4 rounded">
            <JumlahStuntingDiDesaKelurahanScatterChart />
        </div>
    </div>
}