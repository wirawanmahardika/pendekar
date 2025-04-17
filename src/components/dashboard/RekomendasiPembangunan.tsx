import { BiSearch } from "react-icons/bi";
import { useState, useEffect } from "react";
import ExportReportButton from "../ExportReportButton";
import { tableHeaderStyle } from "../../utils/themeSetting";
import { dashboardResultDataType } from "../../types/DashboardTypes";

export default function RekomendasiPembangunan({
  resultData,
}: {
  resultData?: dashboardResultDataType;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedKecamatan, setSelectedKecamatan] = useState("");
  const [selectedDesa, setSelectedDesa] = useState("");
  const [kecamatanList, setKecamatanList] = useState<string[]>([]);
  const [filteredDesa, setFilteredDesa] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [desaOptions, setDesaOptions] = useState<any[]>([]);

  useEffect(() => {
    if (resultData?.list_kecamatan) {
      const kecamatan = resultData.list_kecamatan.map((k) => k.nama_kecamatan);
      setKecamatanList(kecamatan);
    }
  }, [resultData]);

  useEffect(() => {
    if (resultData?.list_desa) {
      let filtered = resultData.list_desa;

      if (searchTerm) {
        filtered = filtered.filter((desa) =>
          desa.nama_deskel.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (selectedKecamatan) {
        filtered = filtered.filter(
          (desa) => desa.nama_kecamatan === selectedKecamatan
        );
      }

      if (selectedDesa) {
        filtered = filtered.filter((desa) => desa.nama_deskel === selectedDesa);
      }

      setFilteredDesa(filtered);
      setCurrentPage(1);
    }
  }, [resultData, searchTerm, selectedKecamatan, selectedDesa]);

  useEffect(() => {
    setSelectedDesa("");
  }, [selectedKecamatan]);

  useEffect(() => {
    if (resultData?.list_desa) {
      const filtered = selectedKecamatan
        ? resultData.list_desa.filter(desa => desa.nama_kecamatan === selectedKecamatan)
        : resultData.list_desa;
  
      setDesaOptions(filtered);
    }
  }, [resultData, selectedKecamatan]);

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDesa.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredDesa.length / itemsPerPage);

  const getStatusBadge = (status: string) => {
    if (!status) return null;

    const statusLower = status.toLowerCase();
    if (statusLower.includes("mandiri")) {
      return (
        <div className="badge bg-emerald-50 text-emerald-500 border-none">
          Mandiri
        </div>
      );
    } else if (statusLower.includes("maju")) {
      return (
        <div className="badge bg-blue-50 text-blue-500 border-none">Maju</div>
      );
    } else if (statusLower.includes("berkembang")) {
      return (
        <div className="badge bg-sky-50 text-sky-500 border-none">
          Berkembang
        </div>
      );
    } else if (statusLower.includes("tertinggal")) {
      return (
        <div className="badge bg-orange-50 text-orange-500 border-none">
          Tertinggal
        </div>
      );
    } else if (statusLower.includes("sangat tertinggal")) {
      return (
        <div className="badge bg-red-50 text-red-500 border-none">
          Sangat Tertinggal
        </div>
      );
    }

    return (
      <div className="badge bg-gray-50 text-gray-500 border-none">{status}</div>
    );
  };

  return (
    <div className="p-4 bg-white rounded shadow mt-8">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-xl">Rekomendasi Pembangunan</h2>
        <ExportReportButton />
      </div>
      <div className="flex gap-x-5 pt-2">
        <div className="flex relative">
          <input
            type="text"
            placeholder="Cari Desa/Kelurahan..."
            className="focus:border-blue-400 focus:shadow border text-sm border-slate-300 rounded text-neutral-600 w-full outline-none pl-2 pr-10 py-1"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <BiSearch className="absolute right-2 top-1/2 -translate-y-1/2 size-6 fill-slate-600" />
        </div>
        
        <select
          className="focus:border-blue-400 focus:shadow border text-sm border-slate-300 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-1"
          value={selectedKecamatan}
          onChange={(e) => setSelectedKecamatan(e.target.value)}
        >
          <option value="">Semua Kecamatan</option>
          {kecamatanList.map((kecamatan, index) => (
            <option key={index} value={kecamatan}>
              {kecamatan}
            </option>
          ))}
        </select>

        <select
          className="focus:border-blue-400 focus:shadow border text-sm border-slate-300 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-1"
          value={selectedDesa}
          onChange={(e) => setSelectedDesa(e.target.value)}
        >
          <option value="">Semua Desa</option>
          {desaOptions.map((desa, index) => (
            <option key={index} value={desa.nama_deskel}>
              {desa.nama_deskel}
            </option>
          ))}
        </select>
      </div>

      <table className="overflow-x-auto min-w-full mt-5 text-neutral-700">
        <thead>
          <tr style={tableHeaderStyle}>
            <th className="p-2 border border-gray-300">No</th>
            <th className="p-2 border border-gray-300">Kecamatan</th>
            <th className="p-2 border border-gray-300">Desa</th>
            <th className="p-2 border border-gray-300">Status</th>
            <th className="p-2 border border-gray-300">Skor IDM</th>
            <th className="p-2 border border-gray-300">Skor SDGS</th>
            <th className="p-2 border border-gray-300">Rekomendasi</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((desa, index) => (
            <tr key={index}>
              <td className="p-2 border border-gray-300">
                {indexOfFirstItem + index + 1}
              </td>
              <td className="p-2 border border-gray-300">
                {desa.nama_kecamatan}
              </td>
              <td className="p-2 border border-gray-300">{desa.nama_deskel}</td>
              <td className="p-2 border border-gray-300">
                {getStatusBadge(desa.current_status)}
              </td>
              <td className="p-2 border border-gray-300">
                {desa.capaian?.idm ? desa.capaian.idm.toFixed(4) : "-"}
              </td>
              <td className="p-2 border border-gray-300">
                {desa.capaian?.sdgs ? desa.capaian.sdgs.toFixed(4) : "-"}
              </td>
              <td className="p-2 border border-gray-300">
                <div className="flex flex-col gap-y-4">
                  <button className="px-3 py-1 bg-sky-200 text-sky-500 rounded-md">
                    Rekomendasi IDM
                  </button>
                  <button className="px-3 py-1 bg-sky-200 text-sky-500 rounded-md">
                    Rekomendasi SDGS
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {currentItems.length === 0 && (
            <tr>
              <td
                colSpan={7}
                className="p-4 text-center border border-gray-300"
              >
                Tidak ada data desa yang ditemukan
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="flex mt-4 justify-center">
          <div className="join">
            <button
              className="join-item btn bg-white text-gray-800"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              {"<<"}
            </button>
            <button
              className="join-item btn bg-white text-gray-800"
              onClick={() =>
                setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)
              }
              disabled={currentPage === 1}
            >
              {"<"}
            </button>

            <button className="join-item btn bg-blue-500 text-white">
              {currentPage}
            </button>

            {currentPage < totalPages && (
              <button
                className="join-item btn bg-white text-gray-800"
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                {currentPage + 1}
              </button>
            )}

            {currentPage < totalPages - 1 && (
              <button className="join-item btn bg-white text-gray-800">
                ...
              </button>
            )}

            {currentPage < totalPages - 1 && (
              <button
                className="join-item btn bg-white text-gray-800"
                onClick={() => setCurrentPage(totalPages)}
              >
                {totalPages}
              </button>
            )}

            <button
              className="join-item btn bg-white text-gray-800"
              onClick={() =>
                setCurrentPage(
                  currentPage < totalPages ? currentPage + 1 : totalPages
                )
              }
              disabled={currentPage === totalPages}
            >
              {">"}
            </button>
            <button
              className="join-item btn bg-white text-gray-800"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
            >
              {">>"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
