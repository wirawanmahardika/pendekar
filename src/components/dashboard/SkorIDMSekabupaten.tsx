import { useState } from 'react';
import { FaChartBar, FaChartLine } from 'react-icons/fa';
import SkorIDMSekabupatenChart from './charts/SkorIDMSekabupatenCharts';
import ExportReportButton from '../ExportReportButton';
import { dashboardResultDataType, skorIdmChartType, skorIdmType } from '../../types/DashboardTypes';

export default function SkorIDMSekabupaten({resultData}: {resultData?: dashboardResultDataType}) {
    if(!resultData) return;
    const [chartType, setChartType] = useState<skorIdmChartType>("bar");
    const skorIdmTerakhir: skorIdmType = resultData.idm[resultData.idm.length-1]
    

    return <div className="p-4 bg-white rounded shadow mt-8">
        <div className="flex items-center justify-between">
            <h2 className="font-bold text-xl">Skor IDM Sekabupaten</h2>
            <ExportReportButton url='export/idm' />
        </div>

        <div className="grid grid-cols-2 border border-gray-200 rounded mt-3 p-5  text-gray-700 ">
            <div className="flex flex-col items-center gap-y-6">
                <span className="font-semibold text-xl mb-6">Skor IDM Tahun 2023</span>

                <div className="flex bg-green-200 w-5/6 rounded px-5 py-2 items-center justify-between mx-auto">
                    <span>SKOR IDM <br />Tahun 2023</span>
                    <span>{skorIdmTerakhir.skor_idm}</span>
                </div>

                <div className="flex bg-yellow-200 w-5/6 rounded px-5 py-2 items-center justify-between mx-auto">
                    <span>STATUS IDM <br />Tahun 2023</span>
                    <span>{skorIdmTerakhir.current_status}</span>
                </div>

                <div className="grid grid-cols-3 gap-6">
                    <div className="flex flex-col items-center gap-y-1">
                        <span className="font-semibold">Target Status</span>
                        <span>{skorIdmTerakhir.target_status}</span>
                    </div>
                    <div className="flex flex-col items-center gap-y-1">
                        <span className="font-semibold">Skor Minimal</span>
                        <span>{skorIdmTerakhir.skor_min}</span>
                    </div>
                    <div className="flex flex-col items-center gap-y-1">
                        <span className="font-semibold">Penambahan</span>
                        <span>{skorIdmTerakhir.skor_up}</span>
                    </div>
                    <div className="flex flex-col items-center gap-y-1">
                        <span className="font-semibold">Skor IKS</span>
                        <span>{skorIdmTerakhir.skor_iks}</span>
                    </div>
                    <div className="flex flex-col items-center gap-y-1">
                        <span className="font-semibold">Skor IKE</span>
                        <span>{skorIdmTerakhir.skor_ike}</span>
                    </div>
                    <div className="flex flex-col items-center gap-y-1">
                        <span className="font-semibold">Skor IKL</span>
                        <span>{skorIdmTerakhir.skor_ikl}</span>
                    </div>
                </div>
            </div>


            <div className="flex flex-col items-center">
                <span className="font-semibold text-xl mb-6">Skor IDM Tahun Ke Tahun</span>

                <div className="w-full h-full">
                    <div className="flex gap-x-5 items-center">
                        <span>Switcher : </span>
                        <FaChartBar onClick={() => setChartType('bar')} className='hover:text-sky-600 cursor-pointer' />
                        <FaChartLine onClick={() => setChartType('line')} className='hover:text-sky-600 cursor-pointer' />
                    </div>
                    <SkorIDMSekabupatenChart charType={chartType} idmScores={resultData.idm} />
                </div>
            </div>
        </div>
    </div>
}