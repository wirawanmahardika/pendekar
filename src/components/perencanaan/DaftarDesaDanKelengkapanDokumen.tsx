import { useEffect, useMemo, useState } from "react";
import {
  DesaOption,
  FilterState,
  KecamatanOption,
  KelengkapanDokumenType,
} from "../../types/PerencanaanTypes";
import { AxiosAuth } from "../../utils/axios";
import { BASE_API_URL } from "../../utils/api";
import { exportReportButtonStyle } from "../../utils/themeSetting";

const initialFilter: FilterState = {
  tahun: "",
  kecamatan: "",
  desa: "",
  progress: "",
};

const DaftarDesaDanKelengkapanDokumen = ({ allData }: { allData: KelengkapanDokumenType }) => {
  const [tahunOptions, setTahunOptions] = useState<string[]>([]);
  const [kecamatanOptions, setKecamatanOptions] = useState<KecamatanOption[]>([]);
  const [desaOptions, setDesaOptions] = useState<DesaOption[]>([]);
  const [filter, setFilter] = useState<FilterState>(initialFilter);
  const [currentPage, setCurrentPage] = useState(1);

  const progressOptions = [
    "Semua",
    "0-25%",
    "26-50%",
    "51-75%",
    "76-100%",
  ];

  const fetchOptions = (optionType: string) => {
    const reqBody = new URLSearchParams({ type: optionType });
    AxiosAuth.post(`${BASE_API_URL}perencanaan/GetOption`, reqBody, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then((res) => {
        switch (optionType) {
          case "tahun":
            setTahunOptions(res.data.data);
            break;
          case "kecamatan":
            setKecamatanOptions(res.data.data);
            break;
          case "deskel":
            setDesaOptions(
              res.data.data.sort((a: DesaOption, b: DesaOption) =>
                a.deskel.localeCompare(b.deskel)
              )
            );
            break;
        }
      })
      .catch((error) => alert(`Error fetching ${optionType}: ${error.message}`));
  };

  useEffect(() => {
    fetchOptions("deskel");
    fetchOptions("tahun");
    fetchOptions("kecamatan");
  }, []);

  // Filter data secara efisien dengan useMemo
  const dataToDisplay = useMemo(() => {
    return allData.filter((item) => {
      const matchesTahun = !filter.tahun || item.tahun === filter.tahun;
      const matchesKecamatan = !filter.kecamatan || item.kecamatan === filter.kecamatan;
      const matchesDesa = !filter.desa || item.desa === filter.desa;
      const matchesProgress = (() => {
        if (!filter.progress || filter.progress === "Semua") return true;
        const progress = item.progress ?? 0;
        if (filter.progress === "0-25%") return progress <= 25;
        if (filter.progress === "26-50%") return progress > 25 && progress <= 50;
        if (filter.progress === "51-75%") return progress > 50 && progress <= 75;
        if (filter.progress === "76-100%") return progress > 75;
        return true;
      })();
      return matchesTahun && matchesKecamatan && matchesDesa && matchesProgress;
    });
  }, [allData, filter]);

  // Handler filter
  const handleFilterChange = (key: keyof FilterState) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter((prev) => ({
      ...prev,
      [key]: e.target.value,
      ...(key === "kecamatan" ? { desa: "" } : {}), // reset desa jika kecamatan berubah
    }));
    setCurrentPage(1);
  };

  return (
    <div className="bg-white p-5 mt-10 rounded shadow">
      <span className="text-base font-bold">
        Daftar Desa & Kelengkapan Dokumen
      </span>
      <div className="flex gap-x-5 pt-2">
        <select
          value={filter.tahun}
          onChange={handleFilterChange("tahun")}
          className="border-2 border-neutral-500 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-2"
        >
          <option value="">Pilih Semua Tahun</option>
          {tahunOptions.map((tahun, index) => (
            <option key={index} value={tahun}>{tahun}</option>
          ))}
        </select>
        <select
          value={filter.kecamatan}
          onChange={handleFilterChange("kecamatan")}
          className="border-2 border-neutral-500 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-2"
        >
          <option value="">Semua Kecamatan</option>
          {kecamatanOptions.map((kec, index) => (
            <option key={index} value={kec.kecamatan}>{kec.kecamatan}</option>
          ))}
        </select>
        <select
          value={filter.desa}
          onChange={handleFilterChange("desa")}
          className="border-2 border-neutral-500 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-2"
        >
          <option value="">Pilih Desa</option>
          {desaOptions.map((desa, index) => (
            <option key={index} value={desa.deskel}>{desa.deskel}</option>
          ))}
        </select>
        <select
          value={filter.progress}
          onChange={handleFilterChange("progress")}
          className="border-2 border-neutral-500 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-2"
        >
          <option disabled value="">Filter Progress Perencanaan</option>
          {progressOptions.map((progress, index) => (
            <option key={index} value={progress}>{progress}</option>
          ))}
        </select>
      </div>
      <TabelWithPagination
        data={dataToDisplay}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

function getPaginationRange(currentPage: number, totalPages: number) {
  const delta = 1; // jumlah halaman di kiri dan kanan currentPage
  const range = [];
  const rangeWithDots = [];

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - delta && i <= currentPage + delta)
    ) {
      range.push(i);
    }
  }

  let prev = 0;
  for (let i of range) {
    if (prev && i - prev !== 1) {
      rangeWithDots.push("...");
    }
    rangeWithDots.push(i);
    prev = i;
  }

  return rangeWithDots;
}


function TabelWithPagination({ data, currentPage, setCurrentPage }: { data: KelengkapanDokumenType; currentPage: number; setCurrentPage: React.Dispatch<React.SetStateAction<number>> }) {
  const [modalOpen, setModalOpen] = useState(false);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(1)
  }, [data])


  const changePage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return <>
    <div onClick={() => setModalOpen(false)} className={`${!modalOpen && "hidden"} fixed inset-0 backdrop-brightness-50 z-10`}>
      <div className="absolute size-1/2 overflow-y-auto bg-white top-1/2 left-1/2 -translate-1/2 p-9 rounded shadow-lg">
        <h2 className="text-center text-xl font-bold mb-4">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</h2>
        <ol className="list-decimal list-inside">
          <li className="mb-2">Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti dicta explicabo a libero accusamus asperiores reprehenderit, obcaecati architecto, eum odio quisquam facilis totam earum laudantium vitae quibusdam, eaque iste repudiandae! adipisicing elit. Quisquam, voluptatibus.</li>
          <li className="mb-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti dicta explicabo a libero accusamus asperiores reprehenderit, obcaecati architecto, eum odio quisquam facilis totam earum laudantium vitae quibusdam, eaque iste repudiandae!</li>
          <li className="mb-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti dicta explicabo a libero accusamus asperiores reprehenderit, obcaecati architecto, eum odio quisquam facilis totam earum laudantium vitae quibusdam, eaque iste repudiandae!</li>
          <li className="mb-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti dicta explicabo a libero accusamus asperiores reprehenderit, obcaecati architecto, eum odio quisquam facilis totam earum laudantium vitae quibusdam, eaque iste repudiandae!</li>
          <li className="mb-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti dicta explicabo a libero accusamus asperiores reprehenderit, obcaecati architecto, eum odio quisquam facilis totam earum laudantium vitae quibusdam, eaque iste repudiandae!</li>
          <li className="mb-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti dicta explicabo a libero accusamus asperiores reprehenderit, obcaecati architecto, eum odio quisquam facilis totam earum laudantium vitae quibusdam, eaque iste repudiandae!</li>
          <li className="mb-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti dicta explicabo a libero accusamus asperiores reprehenderit, obcaecati architecto, eum odio quisquam facilis totam earum laudantium vitae quibusdam, eaque iste repudiandae!</li>
          <li className="mb-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti dicta explicabo a libero accusamus asperiores reprehenderit, obcaecati architecto, eum odio quisquam facilis totam earum laudantium vitae quibusdam, eaque iste repudiandae!</li>
        </ol>
      </div>

    </div>

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
        {
          paginatedData?.map((item, index: any) => {
            return (
              <tr key={index}>
                <td className="border border-neutral-200 px-2 py-3 text-center relative">
                  {item.kecamatan}
                </td>
                <td className="border border-neutral-200 px-2 py-3 text-center relative">
                  {item.desa}
                </td>
                <td className="border border-neutral-200 px-2 py-3 text-center relative">
                  <span onClick={() => setModalOpen(true)} className="cursor-pointer hover:text-sky-600">5/32</span>
                </td>
                <td className="border border-neutral-200 px-2 py-3 text-center relative">
                  <span onClick={() => setModalOpen(true)} className="cursor-pointer hover:text-sky-600">6/12</span>
                </td>
                <td className="border border-neutral-200 px-2 py-3 text-center relative">
                  <span onClick={() => setModalOpen(true)} className="cursor-pointer hover:text-sky-600">7/12</span>
                </td>
                <td className="border border-neutral-200 px-2 py-3 text-center relative">
                  <div className="relative w-11/12 h-5 rounded-xl mx-auto bg-sky-200 overflow-hidden">
                    <div
                      style={{ width: `${item.progress}%` }}
                      className="bg-sky-400 h-full"
                    ></div>
                    <span className="absolute top-1/2 font-semibold -translate-y-1/2 right-3">
                      {item.progress}%
                    </span>
                  </div>
                </td>
              </tr>
            );
          })
        }

      </tbody>
    </table>

    <div className={`flex mt-4 justify-center`}>
      <div className="join">
        <button
          style={exportReportButtonStyle}
          className="join-item btn disabled:!bg-stone-100 disabled:!text-stone-400 text-lg disabled:!cursor-not-allowed text-gray-500  shadow-none"
          onClick={() => changePage(1)}
          disabled={currentPage === 1}
        >
          {"<<"}
        </button>
        <button
          style={exportReportButtonStyle}
          className="join-item btn disabled:!bg-stone-100 disabled:!text-stone-400 text-lg disabled:!cursor-not-allowed text-gray-500  shadow-none"
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {"<"}
        </button>

        {getPaginationRange(currentPage, totalPages).map((item, index) => {
          if (typeof item === 'string') {
            return (
              <button
                key={`ellipsis-${index}`}
                className="join-item btn border text-gray-400"
              >
                ...
              </button>
            );
          }

          return (
            <button
              key={item}
              className={`join-item btn ${item === currentPage
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-800 shadow-none"
                }`}
              onClick={() => changePage(item)}
            >
              {item}
            </button>
          );
        })}

        <button
          style={exportReportButtonStyle}
          className="join-item btn disabled:!bg-stone-100 disabled:!text-stone-400 text-lg disabled:!cursor-not-allowed text-gray-500  shadow-none"
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          {">"}
        </button>
        <button
          style={exportReportButtonStyle}
          className="join-item btn disabled:!bg-stone-100 disabled:!text-stone-400 text-lg disabled:!cursor-not-allowed text-gray-500  shadow-none"
          onClick={() => changePage(totalPages)}
          disabled={currentPage === totalPages}
        >
          {">>"}
        </button>
      </div>
    </div>
  </>
}

export default DaftarDesaDanKelengkapanDokumen;
