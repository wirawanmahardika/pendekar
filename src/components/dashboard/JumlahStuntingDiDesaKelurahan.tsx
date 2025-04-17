import { BiSearch } from "react-icons/bi";
import { BsSquareFill } from "react-icons/bs";
import JumlahStuntingDiDesaKelurahanScatterChart from "./charts/JumlahStuntingDiDesaKelurahanScatterChart";
import { dashboardResultDataType } from "../../types/DashboardTypes";
import { useState, useEffect } from "react";

export default function JumlahStuntingDiDesaKelurahan({
  resultData,
}: {
  resultData?: dashboardResultDataType;
}) {
  const [kecamatan, setKecamatan] = useState("");
  const [desa, setDesa] = useState("");
  const [searchText, setSearchText] = useState("");
  const [kecamatanOptions, setKecamatanOptions] = useState<
    { id: string; name: string }[]
  >([]);
  const [desaOptions, setDesaOptions] = useState<
    { id: string; name: string }[]
  >([]);

  useEffect(() => {
    // Populate kecamatan options from resultData
    if (resultData && resultData.list_kecamatan) {
      const options = resultData.list_kecamatan.map((kec) => ({
        id: kec.kode_wilayah,
        name: kec.nama_kecamatan,
      }));
      setKecamatanOptions(options);
    }
  }, [resultData]);

  useEffect(() => {
    // Populate desa options based on selected kecamatan
    if (resultData && resultData.list_desa) {
      let filteredDesa = resultData.list_desa;

      if (kecamatan) {
        filteredDesa = filteredDesa.filter((desa) =>
          desa.kode_wilayah.startsWith(kecamatan),
        );
      }

      const options = filteredDesa.map((desa) => ({
        id: desa.kode_wilayah,
        name: desa.nama_deskel,
      }));

      setDesaOptions(options);
    }
  }, [kecamatan, resultData]);

  const handleKecamatanChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setKecamatan(e.target.value);
    setDesa(""); // Reset desa selection when kecamatan changes
  };

  return (
    <div className="p-4 bg-white rounded shadow mt-8">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-xl">JUMLAH STUNTING DI DESA/KELURAHAN</h2>
      </div>
      <div className="flex gap-x-5 pt-2">
        <div className="flex relative">
          <input
            type="text"
            placeholder="Cari Desa/Kelurahan..."
            className="focus:border-blue-400 focus:shadow border text-sm border-slate-300 rounded text-neutral-600 w-full outline-none pl-2 pr-10 py-1"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <BiSearch className="absolute right-2 top-1/2 -translate-y-1/2 size-6 fill-slate-600" />
        </div>

        <select
          name="kecamatan"
          className="focus:border-blue-400 focus:shadow border text-sm border-slate-300 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-1"
          value={kecamatan}
          onChange={handleKecamatanChange}
        >
          <option value="">Semua Kecamatan</option>
          {kecamatanOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>

        <select
          name="desa"
          className="focus:border-blue-400 focus:shadow border text-sm border-slate-300 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-1"
          value={desa}
          onChange={(e) => setDesa(e.target.value)}
        >
          <option value="">Semua Desa</option>
          {desaOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-start justify-between gap-x-9 mt-5">
        <span className="capitalize font-semibold w-1/5 text-gray-700">
          Keterangan :
        </span>
        <div className="grid grid-cols-3 justify-items-start grow gap-7">
          <div className="flex items-center justify-center gap-x-2">
            <BsSquareFill className="fill-sky-600" />
            <span className="text-sm">Keluarga Sasaran</span>
          </div>
          <div className="flex items-center justify-center gap-x-2">
            <BsSquareFill className="fill-orange-600" />
            <span className="text-sm">Berisiko</span>
          </div>
          <div className="flex items-center justify-center gap-x-2">
            <BsSquareFill className="fill-emerald-600" />
            <span className="text-sm">Baduta</span>
          </div>
          <div className="flex items-center justify-center gap-x-2">
            <BsSquareFill className="fill-fuchsia-600" />
            <span className="text-sm">Balita</span>
          </div>
          <div className="flex items-center justify-center gap-x-2">
            <BsSquareFill className="fill-yellow-600" />
            <span className="text-sm">Pasangan Usia Subur (PSU)</span>
          </div>
          <div className="flex items-center justify-center gap-x-2">
            <BsSquareFill className="fill-red-600" />
            <span className="text-sm">PUS Hamil</span>
          </div>
          <div className="flex items-center justify-center gap-x-2">
            <BsSquareFill className="fill-slate-600" />
            <span className="text-sm">Persentase</span>
          </div>
        </div>
      </div>

      <div className="w-full mt-4 rounded">
        <JumlahStuntingDiDesaKelurahanScatterChart
          resultData={resultData}
          kecamatan={kecamatan}
          desa={desa}
          searchText={searchText}
        />
      </div>
    </div>
  );
}
