import ReactECharts from 'echarts-for-react';
import { dashboardResultDataType } from '../../../types/DashboardTypes';

export default function JumlahStuntingDiDesaKelurahanScatterChart({ 
  resultData,
  kecamatan,
  desa,
  searchText
}: { 
  resultData?: dashboardResultDataType;
  kecamatan?: string;
  desa?: string;
  searchText?: string;
}) {
    // Get desa data with filtering
    const getFilteredDesaData = () => {
        if (!resultData || !resultData.list_desa) {
            return [];
        }

        let filteredDesa = [...resultData.list_desa];
        
        // Filter by kecamatan if selected
        if (kecamatan) {
            filteredDesa = filteredDesa.filter(d => d.kode_wilayah.startsWith(kecamatan));
        }
        
        // Filter by specific desa if selected
        if (desa) {
            filteredDesa = filteredDesa.filter(d => d.kode_wilayah === desa);
        }
        
        // Filter by search text
        if (searchText && searchText.trim() !== '') {
            const searchLower = searchText.toLowerCase().trim();
            filteredDesa = filteredDesa.filter(d => 
                d.nama_deskel.toLowerCase().includes(searchLower)
            );
        }
        
        return filteredDesa;
    };
    
    const filteredDesa = getFilteredDesaData();
    const desaNames = filteredDesa.map(desa => desa.nama_deskel);
    
    // Create simulated data arrays for each category
    const keluargaSasaranData = [];
    const berisikoData = [];
    const badutaData = [];
    const balitaData = [];
    const pusData = [];
    const pusHamilData = [];
    const persentaseData = [];
    
    // Generate simulated data points for each desa
    for (let i = 0; i < desaNames.length; i++) {
        const baseX = i * 10;
        const baseY = (i + 1) * 5;
        
        keluargaSasaranData.push([baseX, baseY + Math.floor(Math.random() * 20)]);
        berisikoData.push([baseX + 2, baseY - 2 + Math.floor(Math.random() * 15)]);
        badutaData.push([baseX + 4, baseY - 1 + Math.floor(Math.random() * 10)]);
        balitaData.push([baseX + 6, baseY + 2 + Math.floor(Math.random() * 25)]);
        pusData.push([baseX + 8, baseY + Math.floor(Math.random() * 30)]);
        pusHamilData.push([baseX + 10, baseY - 3 + Math.floor(Math.random() * 8)]);
        persentaseData.push([baseX + 12, baseY / 2 + Math.random() * 5]);
    }

    const option = {
        tooltip: {
            trigger: 'item',
            formatter: function (params: any) {
                const categoryNames = [
                    "Keluarga Sasaran",
                    "Berisiko",
                    "Baduta",
                    "Balita",
                    "Pasangan Usia Subur (PSU)",
                    "PUS Hamil",
                    "Persentase"
                ];
                
                const desaIndex = Math.floor(params.value[0] / 10);
                const desaName = desaNames[desaIndex] || 'Unknown';
                
                return `${desaName}<br/>${categoryNames[params.seriesIndex]}: ${params.value[1]}`;
            }
        },
        xAxis: { 
            type: "value", 
            name: "Nilai X",
            axisLabel: {
                show: false // Hide x-axis labels
            }
        },
        yAxis: { 
            type: "value", 
            name: "Jumlah" 
        },
        series: [
            {
                name: "Keluarga Sasaran",
                type: "scatter",
                data: keluargaSasaranData,
                symbolSize: 12,
                itemStyle: { color: "#0284c7" }, // sky-600
            },
            {
                name: "Berisiko",
                type: "scatter",
                data: berisikoData,
                symbolSize: 12,
                itemStyle: { color: "#ea580c" }, // orange-600
            },
            {
                name: "Baduta",
                type: "scatter",
                data: badutaData,
                symbolSize: 12,
                itemStyle: { color: "#059669" }, // emerald-600
            },
            {
                name: "Balita",
                type: "scatter",
                data: balitaData,
                symbolSize: 12,
                itemStyle: { color: "#d946ef" }, // fuchsia-600
            },
            {
                name: "Pasangan Usia Subur (PSU)",
                type: "scatter",
                data: pusData,
                symbolSize: 12,
                itemStyle: { color: "#ca8a04" }, // yellow-600
            },
            {
                name: "PUS Hamil",
                type: "scatter",
                data: pusHamilData,
                symbolSize: 12,
                itemStyle: { color: "#dc2626" }, // red-600
            },
            {
                name: "Persentase",
                type: "scatter",
                data: persentaseData,
                symbolSize: 12,
                itemStyle: { color: "#475569" }, // slate-600
            }
        ],
        grid: {
            left: '5%',
            right: '5%',
            bottom: '10%',
            containLabel: true
        }
    };

    return <ReactECharts option={option} className='w-full h-[400px]' />;
}
