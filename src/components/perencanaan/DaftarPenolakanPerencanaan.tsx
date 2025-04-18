import { useEffect, useMemo, useState } from "react";
import { DesaOption, KecamatanOption, KelengkapanDokumenType } from "../../types/PerencanaanTypes";
import { AxiosAuth } from "../../utils/axios";
import { BASE_API_URL } from "../../utils/api";
import qs from 'qs';

const DaftarPenolakanPerencanaan = () => {
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

  console.log("selected desa", selectedDesa )

  console.log("desa option", desaOptions)

  

  const fetchDaftarDesa = () => {
    AxiosAuth.get(`${BASE_API_URL}perencanaan/GetDaftarDesa`)
      .then(({ data }) => {
        setAllData(data.data || []);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  console.log("semua data", allData)


  const fetchOptions = (Optiontype: string) => {
    const reqBody = qs.stringify({ type : Optiontype })

    AxiosAuth.post(`${BASE_API_URL}perencanaan/GetOption`, reqBody, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((res) => {
        switch (Optiontype) {
          case "tahun":
            setTahunOptions(res.data.data);
            break;
          case "kecamatan":
            setKecamatanOptions(res.data.data );
            break;
            case "deskel":
              const sortedDesa = res.data.data.sort((a: DesaOption, b: DesaOption) =>
                a.deskel.localeCompare(b.deskel)
              );
              setDesaOptions(sortedDesa);
              break;
            break;
          default:
            break;
        }
      })
      .catch((error) => {
        alert(`Error fetching ${Optiontype}: ${error.message}`);
      });
  };

  console.log(desaOptions)


  useEffect(() => {
    fetchDaftarDesa();
    fetchOptions("deskel"); 
    fetchOptions("tahun");
    fetchOptions("kecamatan");
  }, []);

  const resultData = useMemo(() => {
    return allData.filter((item) => {
      const matchesKecamatan =
        !selectedKecamatan || item.kecamatan === selectedKecamatan;
      const matchesDesa =
        !selectedDesa || item.desa === selectedDesa;
      const matchesProgress = (() => {
        if (!selectedProgress || selectedProgress === "Semua") return true;
        const progress = item.progress ?? 0;
        if (selectedProgress === "0-25%") return progress <= 25;
        if (selectedProgress === "26-50%") return progress > 25 && progress <= 50;
        if (selectedProgress === "51-75%") return progress > 50 && progress <= 75;
        if (selectedProgress === "76-100%") return progress > 75;
        return true;
      })();
  
      return (
        matchesKecamatan && matchesDesa && matchesProgress
      );
    });
  }, [allData, selectedKecamatan, selectedDesa, selectedProgress]);
  

  const handleTahunChange = (e: any) => {
    setSelectedTahun(e.target.value);
  };

  const handleKecamatanChange = (e: any) => {
    setSelectedKecamatan(e.target.value);
    setSelectedDesa(""); 
  };

  const handleDesaChange = (e: any) => {
    setSelectedDesa(e.target.value);
  };

  const handleProgressChange = (e: any) => {
    setSelectedProgress(e.target.value);
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
          <option value="">Pilih Tahun</option>
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
          <option value="">Filter Progress Perencanaan</option>
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
          {resultData?.map((item, index: any) => {
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
          })}
        </tbody>
      </table>

      <div className="flex mt-9">
        <div className="flex gap-x-4 items-center ml-auto">
          <span>Page</span>
          <select className="border-2 border-neutral-200 rounded-lg text-neutral-800 outline-none pl-2 pr-1 py-1">
            <option value="">1</option>
            <option className="bg-red-600" value="">
              2
            </option>
            <option value="">3</option>
          </select>
          <span>of 10</span>
        </div>
      </div>
    </div>
  );
};

export default DaftarPenolakanPerencanaan;
