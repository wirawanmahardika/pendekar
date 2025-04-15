import ReactECharts from "echarts-for-react";

const PotensiBarChart = ({
  data = [120, 160, 150],
  categories = ["Perikanan", "Pertanian", "Perkebunan"],
}) => {
  return (
    <ReactECharts
      option={{
        xAxis: { type: "category", data: categories },
        yAxis: { type: "value" },
        series: [
          {
            type: "bar",
            data: data,
            itemStyle: {
              color: function (params: any) {
                const colors = ["#ff5733", "#33ff57", "#3357ff"]; 
                return colors[params.dataIndex % colors.length];
              },
            },
            barWidth: 30,
          },
        ],
      }}
    />
  );
};

const PotensiRadarChart = ({ data }: { data?: any }) => {
  // Default option jika tidak ada data
  const defaultOption = {
    radar: {
      indicator: [
        { name: "BPD", max: 100 },
        { name: "PKK", max: 100 },
        { name: "LPMD", max: 100 },
        { name: "Karang Taruna", max: 100 },
        { name: "Posyandu", max: 100 },
      ],
    },
    series: [
      {
        name: "Lembaga Kemasyarakatan",
        type: "radar",
        data: [
          {
            value: [80, 90, 70, 85, 75],
            name: "Nilai",
            itemStyle: { color: "#ff5733" },
            areaStyle: { opacity: 0.2 },
          },
        ],
      },
    ],
  };

  // Jika ada data, gunakan data tersebut
  if (data) {
    const lkValues = [
      parseInt(data.lk_bpd) || 0,
      parseInt(data.lk_pkk) || 0,
      parseInt(data.lk_lpmd) || 0,
      parseInt(data.lk_karang_taruna) || 0,
      parseInt(data.lk_posyandu) || 0,
    ];

    const maxValue = Math.max(...lkValues, 10) * 1.2; // Max value dengan margin 20%

    defaultOption.radar.indicator = [
      { name: "BPD", max: maxValue },
      { name: "PKK", max: maxValue },
      { name: "LPMD", max: maxValue },
      { name: "Karang Taruna", max: maxValue },
      { name: "Posyandu", max: maxValue },
    ];

    defaultOption.series[0].data = [
      {
        value: lkValues,
        name: "Nilai",
        itemStyle: { color: "#ff5733" },
        areaStyle: { opacity: 0.2 },
      },
    ];
  }

  return <ReactECharts option={defaultOption} />;
};

export { PotensiBarChart, PotensiRadarChart };
