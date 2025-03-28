import { useState } from 'react';
import { FaChartBar, FaChartLine } from 'react-icons/fa';
import { LuChartNoAxesCombined } from 'react-icons/lu';
import SkorIDMSekabupatenChart from './charts/SkorIDMSekabupatenCharts';
import ExportReportButton from '../ExportReportButton';


export default function SkorIDMSekabupaten() {
    const [chartType, setChartType] = useState<'bar' | 'line' | 'combined'>("bar");

    return <div className="p-4 bg-white rounded shadow mt-8">
        <div className="flex items-center justify-between">
            <h2 className="font-bold text-xl">Skor IDM Sekabupaten</h2>
            <ExportReportButton />
        </div>

        <div className="grid grid-cols-2 border border-gray-200 rounded mt-3 p-5  text-gray-700 ">
            <div className="flex flex-col items-center gap-y-6">
                <span className="font-semibold text-xl mb-6">Skor IDM Tahun 2023</span>

                <div className="flex bg-green-200 w-5/6 rounded px-5 py-2 items-center justify-between mx-auto">
                    <span>SKOR IDM <br />Tahun 2023</span>
                    <span>0.7384</span>
                </div>

                <div className="flex bg-yellow-200 w-5/6 rounded px-5 py-2 items-center justify-between mx-auto">
                    <span>STATUS IDM <br />Tahun 2023</span>
                    <span>0.7384</span>
                </div>

                <div className="grid grid-cols-3 gap-6">
                    <div className="flex flex-col items-center gap-y-1">
                        <span className="font-semibold">Target Status</span>
                        <span>MANDIRI</span>
                    </div>
                    <div className="flex flex-col items-center gap-y-1">
                        <span className="font-semibold">Skor Minimal</span>
                        <span>0.8735</span>
                    </div>
                    <div className="flex flex-col items-center gap-y-1">
                        <span className="font-semibold">Penambahan</span>
                        <span>0.0772</span>
                    </div>
                    <div className="flex flex-col items-center gap-y-1">
                        <span className="font-semibold">Skor IKS</span>
                        <span>0.072</span>
                    </div>
                    <div className="flex flex-col items-center gap-y-1">
                        <span className="font-semibold">Skor IKE</span>
                        <span>0.8772</span>
                    </div>
                    <div className="flex flex-col items-center gap-y-1">
                        <span className="font-semibold">Skor IKL</span>
                        <span>0.032</span>
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
                        <LuChartNoAxesCombined onClick={() => setChartType('combined')} className='hover:text-sky-600 cursor-pointer' />
                    </div>
                    <SkorIDMSekabupatenChart charType={chartType} />
                </div>
            </div>
        </div>
    </div>
}