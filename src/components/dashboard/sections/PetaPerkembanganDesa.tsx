
import { FaCircle } from "react-icons/fa"
import PetaPerkembanganDesaScatterChart from "../charts/PetaPerkembanganDesaScatterChart"
import ExportReportButton from "../../ExportReportButton"
import { dashboardResultDataType } from "../../../types/DashboardTypes"


export default function PetaPerkembanganDesa({resultData}: {resultData?: dashboardResultDataType}) {
    return <div className="p-4 bg-white rounded shadow mt-8 h-fit">
        <div className="flex items-center justify-between">
            <h2 className="font-bold text-xl">PETA PERKEMBANGAN DESA (BERDASARKAN SDGs & IDM)</h2>
            <ExportReportButton url="export/peta_perkembangan" />
        </div>

        <div className="flex h-[500px] w-full mt-6">
            <PetaPerkembanganDesaScatterChart resultData={resultData} />
        </div>
        <div className="grid grid-cols-5 mt-3 w-full p-1 text-sm px-4 justify-items-center">
            <div className="flex gap-x-3 items-center">
                <FaCircle className="fill-[#E84C30]" size={16} />
                <span>Sangat Tertinggal</span>
            </div>
            <div className="flex gap-x-3 items-center">
                <FaCircle className="fill-[#EA9501]" size={16} />
                <span>Tertinggal</span>
            </div>
            <div className="flex gap-x-3 items-center">
                <FaCircle className="fill-[#4B7DB8]" size={16} />
                <span>Berkembang</span>
            </div>
            <div className="flex gap-x-3 items-center">
                <FaCircle className="fill-[#499841]" size={16} />
                <span>Maju</span>
            </div>
            <div className="flex gap-x-3 items-center">
                <FaCircle className="fill-[#327A6D]" size={16} />
                <span>Mandiri</span>
            </div>
        </div>

    </div>
}