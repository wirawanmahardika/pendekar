import { useState, useMemo } from "react";
import ReactECharts from "echarts-for-react";
import ExportReportButton from "../../components/ExportReportButton";
import { tabNavigationStyle } from "../../utils/themeSetting";

import {
  Desa,
  Kecamatan,
  CustomChartData,
  BarChartProps,
  chartTypes,
} from "../../types/administrasi/KependudukanTypes";


interface StatisticsSectionProps {
  filteredDesa: Desa[];
  kecamatanList: Kecamatan[] | undefined;
  selectedKecamatan: string;
  setSelectedKecamatan: (value: string) => void;
  selectedDesa: string;
  setSelectedDesa: (value: string) => void;
  availableDesaOptions: { value: string; label: string }[];
}

export default function StatisticsSection({
  filteredDesa,
  kecamatanList,
  selectedKecamatan,
  setSelectedKecamatan,
  selectedDesa,
  setSelectedDesa,
  availableDesaOptions,
}: StatisticsSectionProps) {
  const [chartType, setChartType] = useState<chartTypes>("umur");

  
  const chartData = useMemo<CustomChartData | null>(() => {
    if (!filteredDesa.length) return null;

    switch (chartType) {
      case "umur":
        return {
          categories: [
            "0-5",
            "6-10",
            "11-20",
            "21-30", // dasar orang tua (ini gweh)
            "31-40",
            "41-50",
            "51-60",
            "60+",
          ],
          data: [
            filteredDesa.reduce(
              (sum, desa) => sum + Number(desa.u0 || 0) + Number(desa.u5 || 0),
              0,
            ),
            filteredDesa.reduce((sum, desa) => sum + Number(desa.u10 || 0), 0),
            filteredDesa.reduce(
              (sum, desa) =>
                sum + Number(desa.u15 || 0) + Number(desa.u20 || 0),
              0,
            ),
            filteredDesa.reduce(
              (sum, desa) =>
                sum + Number(desa.u25 || 0) + Number(desa.u30 || 0),
              0,
            ),
            filteredDesa.reduce(
              (sum, desa) =>
                sum + Number(desa.u35 || 0) + Number(desa.u40 || 0),
              0,
            ),
            filteredDesa.reduce(
              (sum, desa) =>
                sum + Number(desa.u45 || 0) + Number(desa.u50 || 0),
              0,
            ),
            filteredDesa.reduce(
              (sum, desa) =>
                sum + Number(desa.u55 || 0) + Number(desa.u60 || 0),
              0,
            ),
            filteredDesa.reduce(
              (sum, desa) =>
                sum +
                Number(desa.u65 || 0) +
                Number(desa.u70 || 0) +
                Number(desa.u75 || 0),
              0,
            ),
          ],
        };
      case "pendidikan":
        return {
          categories: [
            "Tidak/Belum Sekolah", // ngk dpt program makanan gratis dong
            "Belum Tamat SD",
            "Tamat SD",
            "SLTP",
            "SLTA",
            "D1/D2",
            "D3",
            "S1",
            "S2/S3",
          ],
          data: [
            filteredDesa.reduce(
              (sum, desa) => sum + Number(desa.tidak_blm_sekolah || 0),
              0,
            ),
            filteredDesa.reduce(
              (sum, desa) => sum + Number(desa.belum_tamat_sd || 0),
              0,
            ),
            filteredDesa.reduce(
              (sum, desa) => sum + Number(desa.tamat_sd || 0),
              0,
            ),
            filteredDesa.reduce((sum, desa) => sum + Number(desa.sltp || 0), 0),
            filteredDesa.reduce((sum, desa) => sum + Number(desa.slta || 0), 0),
            filteredDesa.reduce(
              (sum, desa) => sum + Number(desa.d1_dan_d2 || 0),
              0,
            ),
            filteredDesa.reduce((sum, desa) => sum + Number(desa.d3 || 0), 0),
            filteredDesa.reduce((sum, desa) => sum + Number(desa.s1 || 0), 0),
            filteredDesa.reduce(
              (sum, desa) => sum + Number(desa.s2 || 0) + Number(desa.s3 || 0),
              0,
            ),
          ],
        };
      case "perkawinan":
        return {
          categories: ["Belum Kawin", "Kawin", "Cerai Hidup", "Cerai Mati"],
          data: [
            filteredDesa.reduce(
              (sum, desa) => sum + Number(desa.belum_kawin || 0),
              0,
            ),
            filteredDesa.reduce(
              (sum, desa) => sum + Number(desa.kawin || 0),
              0,
            ),
            filteredDesa.reduce(
              (sum, desa) => sum + Number(desa.cerai_hidup || 0),
              0,
            ),
            filteredDesa.reduce(
              (sum, desa) => sum + Number(desa.cerai_mati || 0),
              0,
            ),
          ],
        };
      case "agama":
        return {
          categories: [
            "Islam", // masyallah brader
            "Kristen",
            "Katholik",
            "Hindu",
            "Budha",
            "Konghucu",
            "Kepercayaan",
          ],
          data: [
            filteredDesa.reduce(
              (sum, desa) => sum + Number(desa.islam || 0),
              0,
            ),
            filteredDesa.reduce(
              (sum, desa) => sum + Number(desa.kristen || 0),
              0,
            ),
            filteredDesa.reduce(
              (sum, desa) => sum + Number(desa.katholik || 0),
              0,
            ),
            filteredDesa.reduce(
              (sum, desa) => sum + Number(desa.hindu || 0),
              0,
            ),
            filteredDesa.reduce(
              (sum, desa) => sum + Number(desa.budha || 0),
              0,
            ),
            filteredDesa.reduce(
              (sum, desa) => sum + Number(desa.konghucu || 0),
              0,
            ),
            filteredDesa.reduce(
              (sum, desa) => sum + Number(desa.kepercayaan || 0),
              0,
            ),
          ],
        };
      case "pekerjaan":
        return {
          categories: [
            "Wiraswasta",
            "Pelajar/Mahasiswa",
            "Mengurus Rumah Tangga",
            "Belum/Tidak Bekerja", // ini gweh ketika....
            "Guru",
            "Nelayan",
            "Perawat",
            "Perdagangan",
            "Pensiunan",
          ],
          data: [
            filteredDesa.reduce(
              (sum, desa) => sum + Number(desa.wiraswasta || 0),
              0,
            ),
            filteredDesa.reduce(
              (sum, desa) => sum + Number(desa.pelajar_mahasiswa || 0),
              0,
            ),
            filteredDesa.reduce(
              (sum, desa) => sum + Number(desa.mengurus_rumah_tangga || 0),
              0,
            ),
            filteredDesa.reduce(
              (sum, desa) => sum + Number(desa.belum_tidak_bekerja || 0),
              0,
            ),
            filteredDesa.reduce((sum, desa) => sum + Number(desa.guru || 0), 0),
            filteredDesa.reduce(
              (sum, desa) => sum + Number(desa.nelayan || 0),
              0,
            ),
            filteredDesa.reduce(
              (sum, desa) => sum + Number(desa.perawat || 0),
              0,
            ),
            filteredDesa.reduce(
              (sum, desa) => sum + Number(desa.perdagangan || 0),
              0,
            ),
            filteredDesa.reduce(
              (sum, desa) => sum + Number(desa.pensiunan || 0),
              0,
            ),
          ],
        };
      default:
        return null;
    }
  }, [filteredDesa, chartType]);

  return (
    <div className="p-5 bg-white rounded shadow flex flex-col">
      <div className="flex justify-between items-center">
        <span className="font-bold text-xl">Statistik Data Penduduk</span>
        <ExportReportButton url="export/kependudukan" />
      </div>

      <div className="flex gap-x-5 pt-2">
        <select
          name="kecamatan"
          className="focus:border-blue-400 focus:shadow border text-sm bg-white border-slate-300 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-1"
          value={selectedKecamatan}
          onChange={(e) => setSelectedKecamatan(e.target.value)}
        >
          <option value="">Semua Kecamatan</option>
          {kecamatanList?.map((kec) => (
            <option key={kec.kode_wilayah} value={kec.k3}>
              {kec.nama_kecamatan}
            </option>
          ))}
        </select>

        <select
          name="desa"
          className="focus:border-blue-400 focus:shadow border text-sm bg-white border-slate-300 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-1"
          value={selectedDesa}
          onChange={(e) => setSelectedDesa(e.target.value)}
          disabled={!selectedKecamatan}
        >
          <option value="">Semua Desa</option>
          {availableDesaOptions.map((desa) => (
            <option key={desa.value} value={desa.value}>
              {desa.label}
            </option>
          ))}
        </select>
      </div>

      <TabNavigation setChartType={setChartType} />
      <BarChart type={chartType} customData={chartData} />
    </div>
  );
}

function TabNavigation({
  setChartType,
}: {
  setChartType: (tabName: chartTypes) => void;
}) {
  const [currentTab, setCurrentTab] = useState<chartTypes>("umur");

  const changeTab = (tabName: chartTypes) => () => {
    setCurrentTab(tabName);
    setChartType(tabName);
  };

  return (
    <div className="grid grid-cols-5 mt-5">
      <span
        onClick={changeTab("umur")}
        style={currentTab === "umur" ? tabNavigationStyle : {}}
        className="transition-all cursor-pointer border-gray-500 border-b-2 text-lg font-semibold text-gray-500 text-center"
      >
        Umur
      </span>
      <span
        onClick={changeTab("pendidikan")}
        style={currentTab === "pendidikan" ? tabNavigationStyle : {}}
        className="transition-all cursor-pointer border-gray-500 border-b-2 text-lg font-semibold text-gray-500 text-center"
      >
        Pendidikan
      </span>
      <span
        onClick={changeTab("pekerjaan")}
        style={currentTab === "pekerjaan" ? tabNavigationStyle : {}}
        className="transition-all cursor-pointer border-gray-500 border-b-2 text-lg font-semibold text-gray-500 text-center"
      >
        Pekerjaan
      </span>
      <span
        onClick={changeTab("perkawinan")}
        style={currentTab === "perkawinan" ? tabNavigationStyle : {}}
        className="transition-all cursor-pointer border-gray-500 border-b-2 text-lg font-semibold text-gray-500 text-center"
      >
        Perkawinan
      </span>
      <span
        onClick={changeTab("agama")}
        style={currentTab === "agama" ? tabNavigationStyle : {}}
        className="transition-all cursor-pointer border-gray-500 border-b-2 text-lg font-semibold text-gray-500 text-center"
      >
        Agama
      </span>
    </div>
  );
}



function BarChart({ type, customData }: BarChartProps) {
  const option = useMemo(() => {
    // custom data nya
    if (customData) {
      return {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: customData.categories,
          axisLabel: {
            rotate: type === "pekerjaan" ? 45 : 0,
            interval: 0,
          },
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: type.charAt(0).toUpperCase() + type.slice(1),
            type: "bar",
            data: customData.data,
            itemStyle: {
              color: function (params: any) {
                // Different color for each bar
                const colorList = [
                  "#5470c6",
                  "#91cc75",
                  "#fac858",
                  "#ee6666",
                  "#73c0de",
                  "#3ba272",
                  "#fc8452",
                  "#9a60b4",
                  "#ea7ccc",
                  "#0baa70",
                ];
                return colorList[params.dataIndex % colorList.length];
              },
            },
            label: {
              show: true,
              position: "top",
              formatter: "{c}",
            },
          },
        ],
      };
    }

    const baseOption = {
      xAxis: { type: "category", data: ["A", "B", "C", "D", "E"] },
      yAxis: { type: "value" },
      series: [{ type: "bar", data: [10, 20, 15, 30, 25] }],
    };

    switch (type) {
      case "umur":
        return baseOption;
      case "pendidikan":
        return {
          ...baseOption,
          series: [
            { type: "bar", data: [10, 20, 30, 40, 50], stack: "group1" },
            { type: "bar", data: [5, 15, 25, 35, 45], stack: "group1" },
          ],
        };
      case "pekerjaan":
        return {
          ...baseOption,
          xAxis: { type: "value" },
          yAxis: { type: "category", data: ["A", "B", "C", "D", "E"] },
        };
      case "perkawinan":
        return {
          ...baseOption,
          series: [
            { type: "bar", data: [10, 20, 30, 40, 50], name: "Group 1" },
            { type: "bar", data: [15, 25, 35, 45, 55], name: "Group 2" },
          ],
        };
      case "agama":
        return {
          ...baseOption,
          series: [
            {
              type: "bar",
              data: [10, 20, 30, 40, 50],
              itemStyle: {
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    { offset: 0, color: "#ff5722" },
                    { offset: 1, color: "#ff9800" },
                  ],
                },
              },
            },
          ],
        };
    }
  }, [type, customData]);

  return (
    <ReactECharts
      option={option}
      style={{ height: "400px", marginTop: "20px" }}
      opts={{ renderer: "canvas" }}
    />
  );
}
