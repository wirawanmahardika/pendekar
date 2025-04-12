import ReactECharts from 'echarts-for-react';
import { idmScoresType, skorIdmChartType } from '../../../types/DashboardTypes';

const SkorIDMSekabupatenChart = ({ charType, idmScores }: { charType: skorIdmChartType, idmScores: idmScoresType }) => {
    const xAxisData = idmScores.map(x => x.tahun)
    const yAxisData = idmScores.map(x => x.skor_idm)

    const getChartType = () => {
        switch (charType) {
            case 'bar': return {
                tooltip: {trigger: 'axis', show: true},
                xAxis: { data: xAxisData },
                yAxis: { },
                series: [{ type: "bar", data: yAxisData, barWidth: 70}],
            };
            case 'line': return {
                xAxis: { type: "category", data: xAxisData },
                yAxis: { type: "value" },
                series: [{ type: "line", data: yAxisData}],
            };
        }
    };

    return <ReactECharts option={getChartType()} />
}

export default SkorIDMSekabupatenChart