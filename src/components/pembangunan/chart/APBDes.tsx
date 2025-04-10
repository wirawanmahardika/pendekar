import { useMemo } from "react";
import ReactEcharts from "echarts-for-react";
import { formatCurrency } from "../../../utils/formatter";

interface Kecamatan {
  kode_wilayah: string;
  nama_kecamatan: string;
  anggaran_2021: number;
  anggaran_2022: number;
  anggaran_2023: number;
}

interface AnggaranDesaProps {
  resultData: {
    list_kecamatan: Kecamatan[];
  };
  selectedKecamatan?: string;
}

const AnggaranDesa: React.FC<AnggaranDesaProps> = (props) => {
  const { list_kecamatan } = props.resultData;

  const dataChart = useMemo(() => {
    const sortedData = list_kecamatan.map((desa: Kecamatan) => ({
      kode_kecamatan: desa.kode_wilayah,
      nama_kec: desa.nama_kecamatan,
      anggaran: desa.anggaran_2021,
      anggaran2: desa.anggaran_2022,
      anggaran3: desa.anggaran_2023,
    }));

    sortedData.sort((a, b) => b.anggaran - a.anggaran);

    return sortedData;
  }, [list_kecamatan]);

  const options = useMemo(() => {
    const chart_kecamatan = dataChart.map((item) => item.nama_kec);
    const chart_anggaran = dataChart.map((item) => item.anggaran);
    const chart_anggaran2 = dataChart.map((item) => item.anggaran2);
    const chart_anggaran3 = dataChart.map((item) => item.anggaran3);

    return {
      title: {
        show: false,
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      legend: {
        bottom: "-5",
      },
      grid: {
        top: 40,
        right: 40,
        bottom: 60,
        left: 100,
      },
      xAxis: {
        type: "category",
        data: chart_kecamatan,
        splitLine: {
          show: true,
          lineStyle: {
            type: "dashed",
          },
        },
      },
      yAxis: {
        type: "value",
        min: 0,
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
      series: [
        {
          name: "Data Tahun 2021",
          type: "bar",
          data: chart_anggaran,
          color: "#3498db",
          tooltip: {
            valueFormatter: (value: number) => formatCurrency(value),
          },
          label: {
            show: false,
            position: "top",
          },
          itemStyle: {
            borderRadius: [5, 5, 0, 0],
          },
          cursor: "auto",
        },
        {
          name: "Data Tahun 2022",
          type: "bar",
          data: chart_anggaran2,
          color: "#2980b9",
          tooltip: {
            valueFormatter: (value: number) => formatCurrency(value),
          },
          label: {
            show: false,
            position: "top",
          },
          itemStyle: {
            borderRadius: [5, 5, 0, 0],
          },
          cursor: "auto",
        },
        {
          name: "Data Tahun 2023",
          type: "bar",
          data: chart_anggaran3,
          color: "#1a5276",
          tooltip: {
            valueFormatter: (value: number) => formatCurrency(value),
          },
          label: {
            show: false,
            position: "top",
          },
          itemStyle: {
            borderRadius: [5, 5, 0, 0],
          },
          cursor: "auto",
        },
      ],
    };
  }, [dataChart]);

  return (
    <div className="w-full h-[500px]">
      <ReactEcharts option={options} className="w-full h-full" />
    </div>
  );
};

export default AnggaranDesa;
