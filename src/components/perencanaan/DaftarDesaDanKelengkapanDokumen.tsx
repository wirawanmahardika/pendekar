import { useEffect, useState } from "react";
import {
  DesaOption,
  KecamatanOption,
  KelengkapanDokumenType,
} from "../../types/PerencanaanTypes";
import { AxiosAuth } from "../../utils/axios";
import { BASE_API_URL } from "../../utils/api";
import { exportReportButtonStyle, loadingDotsColors } from "../../utils/themeSetting";

const DaftarDesaDanKelengkapanDokumen = () => {
  const [loading, setLoading] = useState(true);
  const [dataTodisplay, setDataToDisplay] = useState<KelengkapanDokumenType>([])
  const [allData, setAllData] = useState<KelengkapanDokumenType>([]);
  const [tahunOptions, setTahunOptions] = useState([]);
  const [kecamatanOptions, setKecamatanOptions] = useState<KecamatanOption[]>([]);
  const [desaOptions, setDesaOptions] = useState<DesaOption[]>([]);
  const [progressOptions] = useState([
    "Semua",
    "0-25%",
    "26-50%",
    "51-75%",
    "76-100%",
  ]);

  const [selectedTahun, setSelectedTahun] = useState("");
  const [selectedKecamatan, setSelectedKecamatan] = useState("");
  const [selectedDesa, setSelectedDesa] = useState("");
  const [selectedProgress, setSelectedProgress] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const fetchDaftarDesa = () => {
    const reqBody = {
      limit: 9007199254740990,
    };
    AxiosAuth.post(`${BASE_API_URL}perencanaan/GetDaftarDesa`, reqBody, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then(({ data }) => setAllData(data.data))
      .catch((error) => alert(error.message))
      .finally(() => setLoading(false));
  };

  const fetchOptions = (optionType: string) => {
    const reqBody = new URLSearchParams({ type: optionType });

    AxiosAuth.post(`${BASE_API_URL}perencanaan/GetOption`, reqBody, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
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
            const sortedDesa = res.data.data.sort(
              (a: DesaOption, b: DesaOption) => a.deskel.localeCompare(b.deskel)
            );
            setDesaOptions(sortedDesa);
            break;
          default:
            break;
        }
      })
      .catch((error) => {
        alert(`Error fetching ${optionType}: ${error.message}`);
      });
  };

  useEffect(() => {
    const newData = allData.filter((item) => {
      const matchesTahun = !selectedTahun || item.tahun === selectedTahun;
      const matchesKecamatan =
        !selectedKecamatan || item.kecamatan === selectedKecamatan;
      const matchesDesa = !selectedDesa || item.desa === selectedDesa;
      const matchesProgress = (() => {
        if (!selectedProgress || selectedProgress === "Semua") return true;
        const progress = item.progress ?? 0;
        if (selectedProgress === "0-25%") return progress <= 25;
        if (selectedProgress === "26-50%")
          return progress > 25 && progress <= 50;
        if (selectedProgress === "51-75%")
          return progress > 50 && progress <= 75;
        if (selectedProgress === "76-100%") return progress > 75;
        return true;
      })();

      return matchesTahun && matchesKecamatan && matchesDesa && matchesProgress;
    });

    console.log(newData);

    setDataToDisplay(newData)
  }, [allData, selectedTahun, selectedKecamatan, selectedDesa, selectedProgress,])

  useEffect(() => {
    fetchDaftarDesa();
    fetchOptions("deskel");
    fetchOptions("tahun");
    fetchOptions("kecamatan");
  }, []);


  const handleTahunChange = (e: any) => {
    setSelectedTahun(e.target.value);
    setCurrentPage(1);
  };

  const handleKecamatanChange = (e: any) => {
    setSelectedKecamatan(e.target.value);
    setSelectedDesa("");
    setCurrentPage(1);
  };

  const handleDesaChange = (e: any) => {
    setSelectedDesa(e.target.value);
    setCurrentPage(1);
  };

  const handleProgressChange = (e: any) => {
    setSelectedProgress(e.target.value);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(dataTodisplay.length / itemsPerPage);
  const paginatedData = dataTodisplay.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const changePage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="bg-white p-5 mt-10 rounded shadow">
      <span className="text-base font-bold">
        Daftar Desa & Kelengkapan Dokumen
      </span>
      <div className="flex gap-x-5 pt-2">
        <select
          value={selectedTahun}
          onChange={handleTahunChange}
          className="border-2 border-neutral-500 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-2"
        >
          <option value="">Pilih Semua Tahun</option>
          {tahunOptions.map((tahun, index) => (
            <option key={index} value={tahun}>
              {tahun}
            </option>
          ))}
        </select>

        <select
          value={selectedKecamatan}
          onChange={handleKecamatanChange}
          className="border-2 border-neutral-500 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-2"
        >
          <option value="">Semua Kecamatan</option>
          {kecamatanOptions.map((kec, index) => (
            <option key={index} value={kec.kecamatan}>
              {kec.kecamatan}
            </option>
          ))}
        </select>

        <select
          value={selectedDesa}
          onChange={handleDesaChange}
          className="border-2 border-neutral-500 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-2"
        >
          <option value="">Pilih Desa</option>
          {desaOptions.map((desa, index) => (
            <option key={index} value={desa.deskel}>
              {desa.deskel}
            </option>
          ))}
        </select>

        <select
          value={selectedProgress}
          onChange={handleProgressChange}
          className="border-2 border-neutral-500 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-2"
        >
          <option disabled value="">Filter Progress Perencanaan</option>
          {progressOptions.map((progress, index) => (
            <option key={index} value={progress}>
              {progress}
            </option>
          ))}
        </select>
      </div>
      <table className="rounded text-sm w-full mt-4 overflow-hidden">
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
          {loading ? (
            <tr>
              <td colSpan={6} className="relative h-20">
                <span
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 loading loading-dots w-16"
                  style={loadingDotsColors}
                ></span>
              </td>
            </tr>
          ) : (
            paginatedData?.map((item, index: any) => {
              return (
                <tr key={index}>
                  <td className="border border-neutral-200 px-2 py-3 text-center">
                    {item.kecamatan}
                  </td>
                  <td className="border border-neutral-200 px-2 py-3 text-center">
                    {item.desa}
                  </td>
                  <td className="border border-neutral-200 px-2 py-3 text-center">
                    {item.rpjmdes ? "\u2713" : "\u2716"}
                  </td>
                  <td className="border border-neutral-200 px-2 py-3 text-center">
                    {item.rkpdes ? "\u2713" : "\u2716"}
                  </td>
                  <td className="border border-neutral-200 px-2 py-3 text-center">
                    {item.apbdes ? "\u2713" : "\u2716"}
                  </td>
                  <td className="border border-neutral-200 px-2 py-3 text-center">
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
          )}
        </tbody>
      </table>

      <div className={`${loading && "hidden"} flex mt-4 justify-center`}>
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

          {Array.from({ length: totalPages }).map((_, idx) => {
            const page = idx + 1;
            return (
              <button
                key={page}
                className={`join-item btn ${page === currentPage ? "bg-blue-500 text-white" : "bg-white text-gray-800 disabled:border-black shadow-none"
                  }`}
                onClick={() => changePage(page)}
              >
                {page}
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
    </div>
  );
};

export default DaftarDesaDanKelengkapanDokumen;
