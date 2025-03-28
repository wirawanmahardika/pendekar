import { FaCircle } from "react-icons/fa";
import DataStuntingScatterChart from "./charts/DataStuntingScatterChart";
import ExportReportButton from "../ExportReportButton";
import { tableHeaderStyle } from "../../utils/themeSetting";



export default function DataStunting() {
    return <div className="p-4 bg-white rounded shadow mt-8">
        <div className="flex items-center justify-between">
            <h2 className="font-bold text-xl">DATA STUNTING</h2>
            <ExportReportButton />
        </div>

        <div className="flex flex-col gap-y-2 w-full h-fit mt-6">
            <div style={tableHeaderStyle} className="w-full h-fit text-xl text-gray-900 font-semibold rounded-t p-4">Stunting Dari Tahun Ke Tahun</div>
            <DataStuntingScatterChart />
        </div>
        <div className="flex gap-x-3 justify-center mt-3 w-full p-1 text-sm px-4">
            <div className="flex gap-x-3 items-center">
                <FaCircle className="fill-blue-400" size={16} />
                <span>Data Tahun 2021</span>
            </div>
            <div className="flex gap-x-3 items-center">
                <FaCircle className="fill-lime-400" size={16} />
                <span>Data Tahun 2022</span>
            </div>
            <div className="flex gap-x-3 items-center">
                <FaCircle className="fill-green-400" size={16} />
                <span>Data Tahun 2023</span>
            </div>
        </div>

    </div>
}