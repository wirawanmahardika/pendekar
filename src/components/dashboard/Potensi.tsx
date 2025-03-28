import ReactECharts from 'echarts-for-react';

const BarChart = () => {
    return <ReactECharts option={{
        xAxis: { type: "category", data: ['Perikanan', "Pertanian", 'Perkebunan'] },
        yAxis: { type: "value" },
        series: [{
            type: 'bar',
            data: [120, 160, 150],
            itemStyle: {
                color: function (params: any) {
                    const colors = ["#ff5733", "#33ff57", "#3357ff"]; // Warna berbeda untuk tiap kategori
                    return colors[params.dataIndex % colors.length];
                },
            },
            barWidth: 30
        }]
    }} />
}

const RadarChart = () => {
    const option = {
        radar: {
            indicator: [
                { name: "Attack", max: 100 },
                { name: "Defense", max: 100 },
                { name: "Speed", max: 100 },
                { name: "Agility", max: 100 },
                { name: "Endurance", max: 100 },
                { name: "Strategy", max: 100 },
            ],
        },
        series: [
            {
                name: "Team Comparison",
                type: "radar",
                data: [
                    {
                        value: [80, 90, 70, 85, 75, 95],
                        name: "Team A",
                        itemStyle: { color: "#ff5733" },
                        areaStyle: { opacity: 0.2 },
                    },
                    {
                        value: [60, 85, 80, 75, 95, 70],
                        name: "Team B",
                        itemStyle: { color: "#33ff57" },
                        areaStyle: { opacity: 0.2 },
                    },
                    {
                        value: [70, 60, 90, 95, 80, 85],
                        name: "Team C",
                        itemStyle: { color: "#3357ff" },
                        areaStyle: { opacity: 0.2 },
                    },
                ],
            },
        ],
    };

    return <ReactECharts option={option} />
}

export default function Potensi() {
    return <div className="p-4 bg-white rounded shadow mt-8">
        <div className="flex items-center justify-between">
            <h2 className="font-bold text-xl">Potensi</h2>
            <button type="button" className="rounded px-4 py-2 bg-sky-200 text-sky-600 hover:bg-sky-300">Export Report</button>
        </div>

        <div className="flex flex-col text-gray-700 mt-3">
            <span>Menampilkan Potensi Kecamatan, Desa/Kelurahan</span>

            <div className="grid grid-cols-5 mt-2 gap-3">
                <div className="rounded flex flex-col border border-gray-300">
                    <span className="w-full bg-sky-200 rounded-t p-3 text-xl text-center font-semibold">KECAMATAN</span>
                    <div className="flex flex-col overflow-y-auto">
                        <button className="px-3 py-2 font-semibold hover:bg-sky-700 text-left hover:text-white">Sandai</button>
                        <button className="px-3 py-2 font-semibold hover:bg-sky-700 text-left hover:text-white">Sungai Laur</button>
                        <button className="px-3 py-2 font-semibold hover:bg-sky-700 text-left hover:text-white">Matar Hilir Selatan</button>
                    </div>
                </div>

                <div className="rounded flex  col-span-2 flex-col border border-gray-300">
                    <span className="w-full bg-sky-200 rounded-t p-3 text-xl text-center font-semibold">Potensi Manusia</span>
                    <div className="overflow-y-auto">
                        <BarChart />
                    </div>
                </div>

                <div className="rounded flex col-span-2 flex-col border border-gray-300">
                    <span className="w-full bg-sky-200 rounded-t p-3 text-xl text-center font-semibold">Potensi SDA</span>
                    <div className="overflow-y-auto h-full">
                        <BarChart />
                    </div>
                </div>

                <div className="rounded flex flex-col border border-gray-300 overflow-hidden">
                    <span title='Desa/Kelurahan' className="w-full bg-sky-200 rounded-t p-3 text-xl text-center font-semibold">DESA/KELURAHAN</span>
                    <div className="flex flex-col overflow-y-auto">
                        <button className="px-3 py-2 font-semibold hover:bg-sky-700 text-left hover:text-white">Sandai</button>
                        <button className="px-3 py-2 font-semibold hover:bg-sky-700 text-left hover:text-white">Sungai Laur</button>
                        <button className="px-3 py-2 font-semibold hover:bg-sky-700 text-left hover:text-white">Matar Hilir Selatan</button>
                    </div>
                </div>


                <div className="rounded flex col-span-2 flex-col border border-gray-300">
                    <span className="w-full bg-sky-200 rounded-t p-3 text-xl text-center font-semibold">Lembaga Kemsyarakatan</span>
                    <div className="overflow-y-auto ">
                        <RadarChart />
                    </div>
                </div>

                <div className="rounded flex col-span-2 flex-col border border-gray-300">
                    <span className="w-full bg-sky-200 rounded-t p-3 text-xl text-center font-semibold">Sarana Dan Prasarana</span>
                    <div className="flex flex-col overflow-y-auto h-full">
                        <BarChart />
                    </div>
                </div>
            </div>
        </div>
    </div>
}