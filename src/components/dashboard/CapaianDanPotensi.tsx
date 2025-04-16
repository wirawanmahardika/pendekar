import { BsSquareFill } from "react-icons/bs";
import ExportReportButton from "../ExportReportButton";
import { useState } from "react";
import { OptionsType } from "../../types/DashboardTypes";


export default function CapaianDanPotensi() {
  const [selectedOption, setSelectedOption] = useState<OptionsType>("kd");

  // Options matching those in MapWithPolygons
  const capaianOptions = [
    { value: "kd", label: "[Capaian] Klasifikasi Desa" },
    { value: "idm", label: "[Capaian] Indeks Desa Membangun" },
    { value: "sdgs", label: "[Capaian] SDGs" },
    { value: "ar", label: "[Capaian] AR" },
    { value: "program", label: "[Capaian] Program" },
    { value: "sda", label: "[Potensi] Sumber Daya Alam" },
    { value: "sdm", label: "[Potensi] Sumber Daya Manusia" },
    { value: "lk", label: "[Potensi] Lembaga Kemasyarakatan" },
    { value: "sarpras", label: "[Potensi] Sarana & Prasarana" },
  ];

  // Color scales and thresholds matching MapWithPolygons
  const colorScales = {
    kd: ["#03A00A", "#C00000", "#327A6D"],
    idm: ["#03A00A", "#D3D714", "#C00000", "#0DC3A2", "#327A6D"],
    sdgs: ["#03A00A", "#D3D714", "#C00000", "#0D77C3", "#0DC3A2", "#327A6D"],
    ar: ["#03A00A", "#D3D714", "#C00000", "#0D77C3", "#0DC3A2", "#327A6D"],
    program: ["#03A00A", "#D3D714", "#C00000", "#0D77C3", "#0DC3A2", "#327A6D"],
    sda: ["#03A00A", "#D3D714", "#C00000", "#0D77C3", "#0DC3A2", "#327A6D"],
    sdm: ["#03A00A", "#D3D714", "#C00000", "#0D77C3", "#0DC3A2", "#327A6D"],
    lk: ["#03A00A", "#D3D714", "#C00000", "#0D77C3", "#0DC3A2", "#327A6D"],
    sarpras: ["#03A00A", "#D3D714", "#C00000", "#0D77C3", "#0DC3A2", "#327A6D"],
  };

  const thresholds = {
    kd: ["SWASEMBADA", "SWAKARYA", "SWADAYA"],
    idm: ["SANGAT TERTINGGAL", "TERTINGGAL", "BERKEMBANG", "MAJU", "MANDIRI"],
    sdgs: ["< 10", "11 - 20", "21 - 30", "31 - 50", "51 - 80", "> 80"],
    ar: ["0", "1 - 3", "4 - 5", "6 - 8", "9 - 10", "> 10"],
    program: ["0", "1 - 3", "4 - 5", "6 - 8", "9 - 10", "> 10"],
    sda: ["0", "1 - 3", "4 - 5", "6 - 8", "9 - 10", "> 10"],
    sdm: [
      "< 100",
      "101 - 500",
      "501 - 1.000",
      "1.001 - 3,000",
      "3.001 - 5.000",
      "> 5.000",
    ],
    lk: ["0", "1 - 3", "4 - 5", "6 - 8", "9 - 10", "> 10"],
    sarpras: ["0", "1 - 3", "4 - 5", "6 - 8", "9 - 10", "> 10"],
  };

  return (
    <div className="p-4 bg-white rounded shadow mt-8">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-xl">Capaian & Potensi Desa</h2>
        <ExportReportButton />
      </div>

      <div className="flex gap-y-3 flex-col mt-5">
        <span className="capitalize">
          Menampilkan capaian dan potensi desa/kelurahan
        </span>
        <select
          className="form-select rounded border-2 outline-none border-sky-500 py-1 w-2/5 px-2"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value as OptionsType)}
        >
          {capaianOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-start justify-between gap-x-9 mt-5">
        <span className="capitalize font-semibold w-1/5 text-gray-700">
          Keterangan :
        </span>
        <div className="grid grid-cols-3 justify-items-start grow gap-7">
          {thresholds[selectedOption].map((threshold, index) => (
            <div
              key={index}
              className="flex items-center justify-center gap-x-2"
            >
              <BsSquareFill
                style={{ color: colorScales[selectedOption][index] }}
              />
              <span>{threshold}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
