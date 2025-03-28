import ReactECharts from 'echarts-for-react';
import { FaCircle } from "react-icons/fa";


const ScatterChart = () => {
    const option = {
        xAxis: { type: "value", name: "X Axis" },
        yAxis: { type: "value", name: "Y Axis" },
        series: [
            {
                name: "Cluster 1",
                type: "scatter",
                data: [
                    [10, 20],
                    [15, 25],
                    [20, 15],
                    [25, 30],
                    [30, 20],
                ],
                symbolSize: 12,
                itemStyle: { color: "#ff5733" }, // Warna merah
            },
            {
                name: "Cluster 2",
                type: "scatter",
                data: [
                    [50, 60],
                    [55, 65],
                    [60, 55],
                    [65, 70],
                    [70, 60],
                ],
                symbolSize: 12,
                itemStyle: { color: "#33ff57" }, // Warna hijau
            },
            {
                name: "Cluster 3",
                type: "scatter",
                data: [
                    [90, 100],
                    [95, 105],
                    [100, 95],
                    [105, 110],
                    [110, 100],
                ],
                symbolSize: 12,
                itemStyle: { color: "#3357ff" }, // Warna biru
            },
        ],
    };

    return <ReactECharts option={option} className='w-full h-full' />;
};


export default function DataStunting() {
    return <div className="p-4 bg-white rounded shadow mt-8">
        <div className="flex items-center justify-between">
            <h2 className="font-bold text-xl">DATA STUNTING</h2>
            <button type="button" className="rounded px-4 py-2 bg-sky-200 text-sky-600 hover:bg-sky-300">Export Report</button>
        </div>

        <div className="flex flex-col gap-y-2 w-full h-fit mt-6">
            <div className="w-full bg-blue-300 h-fit text-xl text-gray-900 font-semibold rounded-t p-4">Stunting Dari Tahun Ke Tahun</div>
            <ScatterChart />
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