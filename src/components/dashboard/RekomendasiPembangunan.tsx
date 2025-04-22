import { BiSearch } from "react-icons/bi";
import { useState, useEffect } from "react";
import ExportReportButton from "../ExportReportButton";
import { tableHeaderStyle } from "../../utils/themeSetting";
import { dashboardResultDataType, idmDataTypes, sdgsDataTypes } from "../../types/DashboardTypes";
import { CDN_URL } from "../../utils/api";
import axios from "axios";

export default function RekomendasiPembangunan({ resultData }: { resultData?: dashboardResultDataType; }) {
  const [idmOpen, setIdmOpen] = useState(false)
  const [idmDatas, setIdmDatas] = useState<idmDataTypes>()

  const [sdgsOpen, setSdgsOpen] = useState(false)
  const [sdgsDatas, setSdgsDatas] = useState<sdgsDataTypes>()


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

  const fetchRekomendasiIDM = async (kodeWilayah: string, tahun: string, nama_desa: string) => {
    try {
      const res = await axios.get(`${CDN_URL}statics/idm/${kodeWilayah.replace(/\./g, "/")}/${tahun}.json`)
      const idmDatas: idmDataTypes = {
        rows: res.data.mapData.ROW,
        nama_desa: nama_desa
      }
      setIdmDatas(idmDatas);
      setIdmOpen(true)
    } catch (error: any) {
      alert(error.message || "Something went wrong");
    }
  };

  const fetchRekomendasiSDGS = async (kodeWilayah: string) => {
    try {
      const res = await axios.get(`${CDN_URL}statics/sdgs/${kodeWilayah.replace(/\./g, "/")}/skor.json`)
      setSdgsDatas(res.data);
      setSdgsOpen(true)
    } catch (error: any) {
      alert(error.message || "Something went wrong");
    }
  };

  return (
    <>
      <div className="p-4 bg-white rounded shadow mt-8">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-xl">Rekomendasi Pembangunan</h2>
          <ExportReportButton url="export/rekomendasi_pembangunan" />
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
            {currentItems.map((desa, index) => {
              return <tr key={index}>
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
                    <button onClick={async () => await fetchRekomendasiIDM(desa.kode_wilayah, desa.tahun, desa.nama_deskel)} className="px-3 py-1 bg-sky-200 text-sky-500 rounded-md cursor-pointer">
                      Rekomendasi IDM
                    </button>
                    <button onClick={async () => await fetchRekomendasiSDGS(desa.kode_wilayah)} className="px-3 py-1 bg-sky-200 text-sky-500 rounded-md cursor-pointer">
                      Rekomendasi SDGS
                    </button>
                  </div>
                </td>
              </tr>
            })}

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

      {/* display rekomendasi idm */}
      <div className={`${!idmOpen && 'hidden'} fixed inset-0 z-[9999] bg-white overflow-y-auto`}>
        <div className="w-full p-5 bg-sky-600 flex justify-between items-center">
          <span className="text-xl text-white font-semibold">[IDM] {idmDatas?.nama_desa}</span>
          <button onClick={() => setIdmOpen(false)} className="btn btn-error">Tutup</button>
        </div>
        <div className="p-4 w-full">

          <table className="w-full">
            <thead className="bg-sky-500 text-white ">
              <tr>
                <th className="border-2 border-black p-2" rowSpan={2}>No</th>
                <th className="border-2 border-black p-2" rowSpan={2}>Indikator</th>
                <th className="border-2 border-black p-2" rowSpan={2}>Skor</th>
                <th className="border-2 border-black p-2" rowSpan={2}>Keterangan</th>
                <th className="border-2 border-black p-2" rowSpan={2}>Kegiatan Yang Dapat Dilakukan</th>
                <th className="border-2 border-black p-2" rowSpan={2}>+Nilai</th>
                <th className="border-2 border-black p-2" colSpan={6}>Yang Dapat Melaksanakan Kegiatan</th>
              </tr>
              <tr>
                <th className="border-2 border-black p-2">Pusat</th>
                <th className="border-2 border-black p-2">Provinsi</th>
                <th className="border-2 border-black p-2">Kabupaten</th>
                <th className="border-2 border-black p-2">Desa</th>
                <th className="border-2 border-black p-2">CSR</th>
                <th className="border-2 border-black p-2">Lainnya</th>
              </tr>
            </thead>

            <tbody>
              {
                idmDatas?.rows.map(d => {
                  if (!d.NO) {
                    return <tr>
                      <th colSpan={12} className="bg-orange-400 p-3 border-2 border-black text-gray-700">SKOR {d.INDIKATOR} : {d.SKOR}</th>
                    </tr>
                  }

                  return <tr>
                    <th className="border-2 border-black p-2 font-light">{d.NO}</th>
                    <th className="border-2 border-black p-2 font-light">{d.INDIKATOR}</th>
                    <th className="border-2 border-black p-2 font-light">{d.SKOR}</th>
                    <th className="border-2 border-black p-2 font-light">{d.KETERANGAN}</th>
                    <th className="border-2 border-black p-2 font-light">{d.KEGIATAN}</th>
                    <th className="border-2 border-black p-2 font-light">{d.NILAI}</th>
                    <th className="border-2 border-black p-2 font-light">{d.PUSAT}</th>
                    <th className="border-2 border-black p-2 font-light">{d.PROV}</th>
                    <th className="border-2 border-black p-2 font-light">{d.KAB}</th>
                    <th className="border-2 border-black p-2 font-light">{d.DESA}</th>
                    <th className="border-2 border-black p-2 font-light">{d.CSR}</th>
                    <th className="border-2 border-black p-2 font-light">{d.LAINNYA}</th>
                  </tr>
                })
              }
            </tbody>
          </table>
        </div>
      </div>

      {/* display rekomendasi sdgs */}
      <div className={`${!sdgsOpen && 'hidden'} fixed inset-0 z-[9999] bg-white overflow-y-auto`}>
        <div className="w-full p-5 bg-sky-600 flex justify-between items-center">
          <span className="text-xl text-white font-semibold">[SDGs]</span>
          <button onClick={() => setSdgsOpen(false)} className="btn btn-error">Tutup</button>
        </div>
        <div className="p-4 w-full">
          <div className="flex flex-col items-center gap-y-2 mt-4">
            <span className="text-3xl font-semibold">{sdgsDatas?.average}</span>
            <span className="text-xl">Skor SDGs Desa</span>
          </div>

          <div className="grid grid-cols-6 gap-4 mt-8">
            {
              sdgsDatas?.data.map(d => {
                return <div key={d.goals} className="flex flex-col gap-y-2">
                  <img src={d.image} alt={d.title} />
                  <span className="text-center font-semibold text-xl">{d.score}</span>
                </div>
              })
            }
          </div>
        </div>
      </div>
    </>
  );
}
