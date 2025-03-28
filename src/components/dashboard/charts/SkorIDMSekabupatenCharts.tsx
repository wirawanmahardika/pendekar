import ReactECharts from 'echarts-for-react';

const SkorIDMSekabupatenChart = ({ charType }: { charType: 'bar' | 'line' | 'combined' }) => {
    const getChartType = () => {
        switch (charType) {
            case 'bar': return {
                xAxis: { data: ["Jan", "Feb", "Mar", "Apr", "May"] },
                yAxis: {},
                series: [{ type: "bar", data: [10, 20, 15, 25, 30] }],
            };
            case 'line': return {
                xAxis: { type: "category", data: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
                yAxis: { type: "value" },
                series: [{ type: "line", data: [120, 200, 150, 80, 70] }],
            };

            case 'combined': return {
                xAxis: { type: "category", data: ["Jan", "Feb", "Mar", "Apr"] },
                yAxis: { type: "value" },
                series: [
                    {
                        name: "Penjualan",
                        type: "bar",
                        data: [100, 200, 150, 300],
                        color: "#007bff"
                    },
                    {
                        name: "Pertumbuhan (%)",
                        type: "line",
                        data: [10, 15, 8, 20],
                        smooth: true,
                        color: "#ff5733"
                    }
                ]
            };
        }
    };

    return <ReactECharts option={getChartType()} />
}

export default SkorIDMSekabupatenChart