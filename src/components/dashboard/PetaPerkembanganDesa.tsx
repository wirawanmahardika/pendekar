
import { FaCircle } from "react-icons/fa"
import PetaPerkembanganDesaScatterChart from "./charts/PetaPerkembanganDesaScatterChart"


export default function PetaPerkembanganDesa() {
    return <div className="p-4 bg-white rounded shadow mt-8 h-96">
        <div className="flex items-center justify-between">
            <h2 className="font-bold text-xl">PETA PERKEMBANGAN DESA (BERDASARKAN SDGs & IDM)</h2>
            <button type="button" className="rounded px-4 py-2 bg-sky-200 text-sky-600 hover:bg-sky-300">Export Report</button>
        </div>

        <div className="flex h-64 w-full mt-6">
            <PetaPerkembanganDesaScatterChart />
        </div>
        <div className="grid grid-cols-5 mt-3 w-full p-1 text-sm px-4 justify-items-center">
            <div className="flex gap-x-3 items-center">
                <FaCircle className="fill-red-400" size={16} />
                <span>Sangat Tertinggal</span>
            </div>
            <div className="flex gap-x-3 items-center">
                <FaCircle className="fill-orange-400" size={16} />
                <span>Tertinggal</span>
            </div>
            <div className="flex gap-x-3 items-center">
                <FaCircle className="fill-blue-400" size={16} />
                <span>Berkembang</span>
            </div>
            <div className="flex gap-x-3 items-center">
                <FaCircle className="fill-lime-400" size={16} />
                <span>Maju</span>
            </div>
            <div className="flex gap-x-3 items-center">
                <FaCircle className="fill-green-400" size={16} />
                <span>Mandiri</span>
            </div>
        </div>

    </div>
}