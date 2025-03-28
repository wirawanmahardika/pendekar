import ReactECharts from 'echarts-for-react';

export default function JumlahStuntingDiDesaKelurahanScatterChart() {
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
}