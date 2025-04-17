import { FaCircle } from "react-icons/fa";
import DataStuntingScatterChart from "./charts/DataStuntingScatterChart";
import ExportReportButton from "../ExportReportButton";
import { tableHeaderStyle } from "../../utils/themeSetting";
import { dashboardResultDataType } from "../../types/DashboardTypes";

export default function DataStunting({
  resultData,
}: {
  resultData?: dashboardResultDataType;
}) {
  // Ambil data stunting dari resultData
  const stuntingData = resultData?.stunting || [];
  console.log(stuntingData);
  // Pastikan data diurutkan berdasarkan tahun
  const sortedStuntingData = [...stuntingData].sort(
    (a, b) => a.tahun - b.tahun,
  );

  // Dapatkan tahun-tahun yang tersedia
  const years = sortedStuntingData.map((item) => item.tahun);

  // Mapping warna untuk setiap tahun
  const colorMapping: Record<number, string> = {
    2020: "fill-blue-400",
    2021: "fill-lime-400",
    2022: "fill-green-400",
  };

  return (
    <div className="p-4 bg-white rounded shadow mt-8">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-xl">DATA STUNTING</h2>
        <ExportReportButton url="export/stunting" />
      </div>

      <div className="flex flex-col gap-y-2 w-full h-fit mt-6">
        <div
          style={tableHeaderStyle}
          className="w-full h-fit text-xl text-gray-900 font-semibold rounded-t p-4"
        >
          Stunting Dari Tahun Ke Tahun
        </div>
        <DataStuntingScatterChart data={sortedStuntingData} />
      </div>

      <div className="flex gap-x-3 justify-center mt-3 w-full p-1 text-sm px-4">
        {years.map((year, index) => (
          <div key={index} className="flex gap-x-3 items-center">
            <FaCircle
              className={colorMapping[year] || "fill-gray-400"}
              size={16}
            />
            <span>Data Tahun {year}</span>
          </div>
        ))}

        {/* Tampilkan placeholder jika tidak ada data */}
        {years.length === 0 && (
          <>
            <div className="flex gap-x-3 items-center">
              <FaCircle className="fill-blue-400" size={16} />
              <span>Data Tahun 2021</span>
            </div>
            <div className="flex gap-x-3 items-center">
              <FaCircle className="fill-lime-400" size={16} />
              <span>Data Tahun 2022</span>
            </div>
            <div className="flex gap-x-3 items-center">
              <FaCircle className="fill-green-400" size={16} />
              <span>Data Tahun 2023</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
