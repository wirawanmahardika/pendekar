import { useEffect, useMemo, useState } from "react";
import {
  BlankoDocument,
  BlankoPerencanaan,
  FilterState,
  KelengkapanDokumen,
  TransformedData,
} from "../../types/perencaan/DaftarDesaDanKelengkapanDokumentTypes";
import { AxiosAuth } from "../../utils/axios";
import { BASE_API_URL } from "../../utils/api";
import Pagination from "../Pagination";
import createIdGenerator from "../../utils/idGenerator";
import { useGetInitialDesaFilter, useGetKecamatanFilter, useGetTahunFilter } from "../../hooks/perencaan/DaftarDesaDanKelengkapanDokumenHooks";
import { calculateProgress } from "../../utils/perencanaan/DaftarDesaDanKelengkapanDokumenUtils";

const initialFilter: FilterState = {
  tahun: "",
  kecamatan: "",
  desa: "",
  progress: "",
};

const getId = createIdGenerator()
export default function DaftarDesaDanKelengkapanDokumen({ allData }: { allData: KelengkapanDokumen[] }) {
  console.log(allData);
  const [filter, setFilter] = useState<FilterState>(initialFilter);

  const tahunOptions = useGetTahunFilter()
  const kecamatanOptions = useGetKecamatanFilter()
  const { desaOptions, setDesaOptions, initialValueDesaOptions } = useGetInitialDesaFilter()

  useEffect(() => {
    const selectedKecamatanOption = kecamatanOptions.find(k => k.kecamatan === filter.kecamatan)
    if (selectedKecamatanOption) setDesaOptions(selectedKecamatanOption.deskel_list.map(d => ({ id: getId(), deskel: d })))
    else setDesaOptions(initialValueDesaOptions)
  }, [allData, filter.kecamatan])

  const handleFilterChange = (value: string, type: "tahun" | "kecamatan" | "deskel" | "progress") => {
    switch (type) {
      case "tahun":
        setFilter(prevValue => ({ ...prevValue, tahun: value }))
        break;
      case "kecamatan":
        setFilter(prevValue => ({ ...prevValue, kecamatan: value }))
        break;
      case "deskel":
        setFilter(prevValue => ({ ...prevValue, desa: value }))
        break;
      case "progress":
        setFilter(prevValue => ({ ...prevValue, progress: value }))
        break;
      default:
        break;
    }
  }
  // kode diatas untuk filter

  const [blankoData, setBlankoData] = useState<{ [key: string]: BlankoDocument[] }>({});
  const [totalDokumen, setTotalDokumen] = useState<{ [key: string]: number }>({});

  const progressOptions = ["Semua", "0-25%", "26-50%", "51-75%", "76-100%"];
  const fetchBlankoData = async (modul: string) => {
    try {
      const response = await AxiosAuth.get(`${BASE_API_URL}perencanaan/GetBlankoPerencanaan?modul=${modul}`);
      const data: BlankoPerencanaan = response.data;

      setBlankoData((prev) => ({
        ...prev,
        [modul]: data.data,
      }));

      setTotalDokumen((prev) => ({
        ...prev,
        [modul]: data.data.length,
      }));
    } catch (error) {
      console.error(`Error fetching blanko ${modul}:`, error);
    }
  };

  useEffect(() => {
    fetchBlankoData("rpjmdes");
    fetchBlankoData("rkpdes");
    fetchBlankoData("apbdes");
  }, []);


  const transformedData = useMemo((): TransformedData[] => {
    if (!allData) return [];

    // Jika filter.tahun kosong, tampilkan semua data_per_tahun untuk setiap desa
    if (!filter.tahun) {
      return allData.flatMap((desa) =>
        desa.data_per_tahun.map((dataPerTahun) => ({
          kecamatan: desa.kecamatan,
          desa: desa.desa,
          tahun: dataPerTahun.tahun.toString(),
          rpjmdes: dataPerTahun.rpjmdes || [],
          rkpdes: dataPerTahun.rkpdes || [],
          apbdes: dataPerTahun.apbdes || [],
          progress: calculateProgress(desa, dataPerTahun.tahun.toString(), totalDokumen),
        }))
      );
    }

    // Jika filter.tahun terisi, hanya tampilkan tahun tersebut
    return allData.map((desa) => {
      const dataPerTahun = desa.data_per_tahun.find((data) => data.tahun.toString() === filter.tahun);
      return {
        kecamatan: desa.kecamatan,
        desa: desa.desa,
        tahun: filter.tahun,
        rpjmdes: dataPerTahun?.rpjmdes || [],
        rkpdes: dataPerTahun?.rkpdes || [],
        apbdes: dataPerTahun?.apbdes || [],
        progress: calculateProgress(desa, filter.tahun, totalDokumen),
      };
    });
  }, [allData, filter, totalDokumen]);


  // Filter data secara efisien dengan useMemo
  const dataToDisplay = useMemo(() => {
    return transformedData.filter((item) => {
      const matchesTahun = !filter.tahun || filter.tahun === item.tahun
      const matchesKecamatan = !filter.kecamatan || item.kecamatan === filter.kecamatan;
      const matchesDesa = !filter.desa || item.desa === filter.desa;
      const matchesProgress = (() => {
        if (!filter.progress || filter.progress === "Semua") return true;
        const progress = item.progress;
        if (filter.progress === "0-25%") return progress <= 25;
        if (filter.progress === "26-50%")
          return progress > 25 && progress <= 50;
        if (filter.progress === "51-75%")
          return progress > 50 && progress <= 75;
        if (filter.progress === "76-100%") return progress > 75;
        return true;
      })();
      return matchesKecamatan && matchesDesa && matchesProgress && matchesTahun;
    });
  }, [transformedData, filter]);



  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<{
    type: string;
    uploaded: number[];
    total: BlankoDocument[];
    desa: string;
  } | null>(null);

  const handleDocumentClick = (type: string, uploaded: number[], desa: string) => {
    const blanko = blankoData[type.toLowerCase()] || [];
    setModalData({
      type: type.toUpperCase(),
      uploaded,
      total: blanko,
      desa
    });
    setModalOpen(true);
  };





  return (
    <div className="bg-white p-5 mt-10 rounded shadow">
      <span className="text-base font-bold">
        Daftar Desa & Kelengkapan Dokumen
      </span>
      <div className="flex gap-x-5 pt-2">
        <select
          value={filter.tahun}
          onChange={(e) => handleFilterChange(e.target.value, "tahun")}
          className="border-2 border-neutral-500 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-2"
        >
          <option value="">Pilih Semua Tahun</option>
          {tahunOptions.map((tahun, index) => (
            <option key={index} value={tahun}>{tahun}</option>
          ))}
        </select>
        <select
          value={filter.kecamatan}
          onChange={(e) => handleFilterChange(e.target.value, "kecamatan")}
          className="border-2 border-neutral-500 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-2"
        >
          <option value="">Semua Kecamatan</option>
          {kecamatanOptions.map((kec, index) => (
            <option key={index} value={kec.kecamatan}>{kec.kecamatan}</option>
          ))}
        </select>
        <select
          value={filter.desa}
          onChange={(e) => handleFilterChange(e.target.value, "deskel")}
          className="border-2 border-neutral-500 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-2"
        >
          <option value="">Pilih Desa</option>
          {desaOptions.map((desa, index) => (
            <option key={index} value={desa.deskel}>{desa.deskel}</option>
          ))}
        </select>
        <select
          value={filter.progress}
          onChange={(e) => handleFilterChange(e.target.value, "progress")}
          className="border-2 border-neutral-500 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-2"
        >
          <option disabled value="">Filter Progress Perencanaan</option>
          {progressOptions.map((progress, index) => (
            <option key={index} value={progress}>{progress}</option>
          ))}
        </select>
      </div>

      <Modal modalData={modalData} modalOpen={modalOpen} setModalOpen={setModalOpen} />
      <Pagination data={dataToDisplay} displayData={(paginatedData) => {
        return <>
          <table className="rounded text-sm w-full mt-4">
            <thead>
              <tr className="bg-[#AEDDF5] text-gray-700">
                <th className="border-2 border-gray-100 text-center w-2/12 py-2">
                  Nama Kecamatan
                </th>
                <th className="border-2 border-gray-100 text-center w-3/12 py-2">
                  Nama Desa
                </th>
                <th className="border-2 border-gray-100 text-center w-1/12 py-2">
                  RPJMDes
                </th>
                <th className="border-2 border-gray-100 text-center w-1/12 py-2">
                  RKPDes
                </th>
                <th className="border-2 border-gray-100 text-center w-1/12 py-2">
                  APBDes
                </th>
                <th className="border-2 border-gray-100 text-center w-4/12 py-2">
                  Progress
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedData?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="border border-neutral-200 px-2 py-3 text-center relative">
                      {item.kecamatan}
                    </td>
                    <td className="border border-neutral-200 px-2 py-3 text-center relative">
                      {item.desa}
                    </td>
                    <td className="border border-neutral-200 px-2 py-3 text-center relative">
                      <span
                        onClick={() =>
                          handleDocumentClick("rpjmdes", item.rpjmdes, item.desa)
                        }
                        className="cursor-pointer hover:text-sky-600"
                      >
                        {item.rpjmdes.length}/{totalDokumen.rpjmdes || 0}
                      </span>
                    </td>
                    <td className="border border-neutral-200 px-2 py-3 text-center relative">
                      <span
                        onClick={() =>
                          handleDocumentClick("rkpdes", item.rkpdes, item.desa)
                        }
                        className="cursor-pointer hover:text-sky-600"
                      >
                        {item.rkpdes.length}/{totalDokumen.rkpdes || 0}
                      </span>
                    </td>
                    <td className="border border-neutral-200 px-2 py-3 text-center relative">
                      <span
                        onClick={() =>
                          handleDocumentClick("apbdes", item.apbdes, item.desa)
                        }
                        className="cursor-pointer hover:text-sky-600"
                      >
                        {item.apbdes.length}/{totalDokumen.apbdes || 0}
                      </span>
                    </td>
                    <td className="border border-neutral-200 px-2 py-3 text-center relative">
                      <div className="relative w-11/12 h-5 rounded-xl mx-auto bg-sky-200 overflow-hidden">
                        <div
                          style={{ width: `${item.progress}%` }}
                          className="bg-sky-400 h-full transition-all duration-300"
                        ></div>
                        <span className="absolute top-1/2 font-semibold -translate-y-1/2 right-3 text-xs">
                          {item.progress}%
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      }} />
    </div>
  );
};

function Modal({ modalOpen, setModalOpen, modalData }: {
  modalOpen: boolean; setModalOpen: React.Dispatch<React.SetStateAction<boolean>>; modalData: {
    type: string;
    uploaded: number[];
    total: BlankoDocument[];
    desa: string;
  } | null;
}) {
  return <div
    onClick={() => setModalOpen(false)}
    className={`${!modalOpen && "hidden"
      } fixed inset-0 backdrop-brightness-50 z-10`}
  >
    <div
      className="absolute w-1/2 h-1/2 overflow-y-auto bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 rounded shadow-lg"
      onClick={(e) => e.stopPropagation()}
    >
      <h2 className="text-center text-xl font-bold mb-4">
        Detail Dokumen {modalData?.type} - {modalData?.desa}
      </h2>
      <div className="mb-4">
        <p className="font-semibold">
          Progress: {modalData?.uploaded.length}/{modalData?.total.length}{" "}
          dokumen
        </p>
      </div>
      <ol className="list-decimal list-inside space-y-2">
        {modalData?.total.map((doc) => (
          <li
            key={doc.id}
            className={`mb-2 ${modalData.uploaded.includes(doc.id)
              ? "text-green-600 font-medium"
              : "text-red-500"
              }`}
          >
            <span
              className={`inline-block w-3 h-3 rounded-full mr-2 ${modalData.uploaded.includes(doc.id)
                ? "bg-green-500"
                : "bg-red-500"
                }`}
            ></span>
            {doc.filename}
            {modalData.uploaded.includes(doc.id) ? " ✓" : " ✗"}
          </li>
        ))}
      </ol>
    </div>
  </div>

}