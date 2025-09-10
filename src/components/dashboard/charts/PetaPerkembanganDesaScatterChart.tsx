import ReactECharts from 'echarts-for-react';
import { useMemo } from 'react';
import { dashboardResultDataType } from '../../../types/DashboardTypes';


const STATUS_DESA = [
    "SANGAT TERTINGGAL",
    "TERTINGGAL",
    "BERKEMBANG",
    "MAJU",
    "MANDIRI",
];
const STATUS_COLORS = ["#E84C30", "#EA9501", "#4B7DB8", "#499841", "#327A6D"];


export default function PetaPerkembanganDesaScatterChart({ resultData }: { resultData?: dashboardResultDataType }) {
    if (!resultData) return;
    const data = useMemo(() => {
        const transformed = resultData?.list_desa.map((desa: any) => {
            const statusIndex = STATUS_DESA.indexOf(desa.current_status);
            const color = STATUS_COLORS[statusIndex] || "#000000";

            return {
                // name: desa.current_status,
                name: `${desa.nama_deskel}: SDGS ${desa.capaian.sdgs} | IDM ${desa.capaian.idm} (${desa.current_status})`,
                type: "scatter",
                data: [[desa.capaian.idm, desa.capaian.sdgs]],
                symbolSize: 25,
                itemStyle: {
                    color: color,
                },
            };
        });

        return transformed;
    }, [resultData]);

    const chartSettings = useMemo(() => {
        return {
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: "none",
                    crossStyle: {
                        color: "#999",
                    },
                },
            },
            legend: {
                show: false,
            },
            grid: {
                top: 30,
                left: 30,
                right: 40,
                bottom: 50,
                containLabel: true,
                tooltip: {
                    trigger: "item",
                    formatter: "{a}",
                },
            },
            xAxis: {
                type: "value",
                name: "IDM",
                scale: true,
                axisLabel: {
                    formatter: "{value}",
                },
                axisPointer: {
                    type: "none",
                },
                axisTick: {
                    show: false,
                },
                axisLine: {
                    lineStyle: {
                        width: 0,
                        type: "dashed",
                    },
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        type: "dashed",
                    },
                },
            },
            yAxis: {
                type: "value",
                name: "SDGs",
                scale: true,
                axisLabel: {
                    formatter: "{value}",
                },
                axisTick: {
                    show: false,
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        width: 0,
                        type: "dashed",
                    },
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        type: "dashed",
                    },
                },
            },
            series: data,
        };
    }, [data]);

    return <ReactECharts option={chartSettings} className='w-full !h-full' />
}