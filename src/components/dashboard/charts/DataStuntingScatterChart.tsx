import ReactECharts from 'echarts-for-react';
import { StuntingDataItem } from '../../../types/DashboardTypes';

export default function DataStuntingScatterChart({ data = [] }: { data?: StuntingDataItem[] }) {
    // Transformasi data stunting ke format scatter plot
    const transformDataToScatter = () => {
        // Jika tidak ada data stunting, gunakan data default
        if (!data || data.length === 0) {
            return {
                cluster1: [
                    [10, 20], [15, 25], [20, 15], [25, 30], [30, 20],
                ],
                cluster2: [
                    [50, 60], [55, 65], [60, 55], [65, 70], [70, 60],
                ],
                cluster3: [
                    [90, 100], [95, 105], [100, 95], [105, 110], [110, 100],
                ]
            };
        }

        // Kelompokkan data berdasarkan tahun
        const dataByYear: Record<string, any[]> = {};
        
        data.forEach((item) => {
            const year = item.tahun.toString();
            if (!dataByYear[year]) {
                dataByYear[year] = [];
            }
            
            // Tambahkan data scatter berdasarkan prevalensi dan persen_stunting
            // Jika tidak ada, gunakan keluarga_sasaran dan berisiko
            const x = item.prevalensi || item.keluarga_sasaran || 0;
            const y = item.persen_stunting || item.berisiko || 0;
            
            dataByYear[year].push([x, y]);
        });
        
        // Map data ke dalam 3 cluster berdasarkan tahun
        const years = Object.keys(dataByYear).sort();
        const result: Record<string, any[]> = {
            cluster1: [],
            cluster2: [],
            cluster3: []
        };
        
        // Distribusikan data ke 3 cluster berdasarkan tahun yang tersedia
        years.forEach((year, index) => {
            const clusterKey = `cluster${index + 1}`;
            if (index < 3) { // Hanya gunakan maksimal 3 tahun
                result[clusterKey] = dataByYear[year];
            }
        });
        
        return result;
    };
    
    const scatterData = transformDataToScatter();
    
    // Tentukan label untuk tahun-tahun yang tersedia
    const getYearLabels = () => {
        if (!data || data.length === 0) {
            return ["Cluster 1", "Cluster 2", "Cluster 3"];
        }
        
        const uniqueYears = [...new Set(data.map(item => item.tahun))].sort();
        return uniqueYears.slice(0, 3).map(year => `Tahun ${year}`);
    };
    
    const yearLabels = getYearLabels();
    
    // Warna untuk setiap cluster
    const colors = ["#ff5733", "#33ff57", "#3357ff"];

    const option = {
        tooltip: {
            trigger: 'item',
            formatter: function(params: any) {
                const dataIndex = params.seriesIndex;
                
                if (data && data.length > 0) {
                    const yearLabel = yearLabels[dataIndex];
                    return `${yearLabel}<br/>
                            Prevalensi: ${params.data[0]}<br/>
                            Persentase Stunting: ${params.data[1]}`;
                }
                
                return `${params.seriesName}<br/>
                        X: ${params.data[0]}<br/>
                        Y: ${params.data[1]}`;
            }
        },
        legend: {
            data: yearLabels,
            bottom: 0
        },
        xAxis: { 
            type: "value", 
            name: "Prevalensi",
            nameLocation: 'middle',
            nameGap: 30
        },
        yAxis: { 
            type: "value", 
            name: "Persentase Stunting",
            nameLocation: 'middle',
            nameGap: 40
        },
        series: [
            {
                name: yearLabels[0],
                type: "scatter",
                data: scatterData.cluster1,
                symbolSize: 12,
                itemStyle: { color: colors[0] },
            },
            {
                name: yearLabels[1],
                type: "scatter",
                data: scatterData.cluster2,
                symbolSize: 12,
                itemStyle: { color: colors[1] },
            },
            {
                name: yearLabels[2],
                type: "scatter",
                data: scatterData.cluster3,
                symbolSize: 12,
                itemStyle: { color: colors[2] },
            },
        ],
    };

    return <ReactECharts option={option} className='w-full h-full' />;
}