import ReactECharts from 'echarts-for-react';

const PotensiBarChart = () => {
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

const PotensiRadarChart = () => {
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

export { PotensiBarChart, PotensiRadarChart }