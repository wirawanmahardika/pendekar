import axios from "axios";
import { useEffect, useState } from "react";
import useTitle from "../hooks/useTitle";
import PageTitle from "../components/PageTitle";
import { tableHeaderStyle } from "../utils/themeSetting";
import { BiSearch } from "react-icons/bi";
import ExportReportButton from "../components/ExportReportButton";
import { exportReportButtonStyle } from "../utils/themeSetting";
import { BASE_API_URL } from "../utils/api";
import AdministrasiDataCard from "../components/administrasi/AdministrasiDataCard";


export default function AdministrasiUmum() {
  useTitle("Administrasi Umum");
  const [administrationData, setAdministrationData] = useState([]);
  const [administrationTypes, setAdministrationTypes] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() =>{
    // setIsLoading(true);
    axios
      .get(`${BASE_API_URL}administrasi-umum?k3=&k4=`)
      .then((result) => {
        setAdministrationData(result.data);
        const data = result.data.data;
        setAdministrationTypes(data.jenis_administrasi);
        setLastUpdated(data.last_updated);
        console.log(data)
      })
      .catch((error) => {
        alert(error.message);
      })
      // .finally(() => setIsLoading(false));
    
  }, [])

  // if (isLoading) return <LoadingSpinner />;

 

  return (
    <div className="px-4 py-10">
      <PageTitle title="Administrasi Umum" />
      {/* <AdministrasiDataCard administrationData = {administrationData}/> */}

      {/* Table */}
      <div className="p-4 bg-white rounded shadow mt-8">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-xl">Rekap Kependudukan</h2>
          <ExportReportButton />
        </div>
        <div className="flex gap-x-5 pt-2">
          <select
            name=""
            className="focus:border-blue-400 focus:shadow border text-sm border-slate-300 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-1"
          >
            <option value="">Buku Peraturan Desa</option>
            <option value="">Buku Peraturan Desa</option>
            <option value="">Buku Peraturan Desa</option>
          </select>

          <select
            name=""
            className="focus:border-blue-400 focus:shadow border text-sm border-slate-300 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-1"
          >
            <option value="">Semua Kecamatan</option>
            <option value="">Semua Kecamatan</option>
            <option value="">Semua Kecamatan</option>
          </select>

          <select
            name=""
            className="focus:border-blue-400 focus:shadow border text-sm border-slate-300 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-1"
          >
            <option value="">Semua Desa</option>
            <option value="">Semua Desa</option>
            <option value="">Semua Desa</option>
          </select>

          <div className="flex relative">
            <input
              type="text"
              placeholder="Cari Desa/Kelurahan..."
              className="focus:border-blue-400 focus:shadow border text-sm border-slate-300 rounded text-neutral-600 w-full outline-none pl-2 pr-10 py-1"
            />
            <BiSearch className="absolute right-2 top-1/2 -translate-y-1/2 size-6 fill-slate-600" />
          </div>
        </div>

        <table className="overflow-x-auto min-w-full mt-5 text-neutral-700 text-center">
          <thead>
            <tr style={tableHeaderStyle}>
              <th className="p-2 border border-gray-300">No</th>
              <th className="p-2 border border-gray-300">Kecamatan</th>
              <th className="p-2 border border-gray-300">Desa</th>
              <th className="p-2 border border-gray-300">Tanggal Input</th>
              <th className="p-2 border border-gray-300">Jenis Peraturan</th>
              <th className="p-2 border border-gray-300">Nomor Peraturan</th>
              <th className="p-2 border border-gray-300">Tanggal Peraturan</th>
              <th className="p-2 border w-1/5 border-gray-300">Tentang</th>
              <th className="p-2 border border-gray-300">Lampiran</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border border-gray-300">3</td>
              <td className="p-2 border border-gray-300">Sandai</td>
              <td className="p-2 border border-gray-300">Alam Pakuan</td>
              <td className="p-2 border border-gray-300">0</td>
              <td className="p-2 border border-gray-300">0</td>
              <td className="p-2 border border-gray-300">0</td>
              <td className="p-2 border border-gray-300">0</td>
              <td className="p-2 border border-gray-300">0</td>
              <td className="p-2 border border-gray-300">
                <button
                  type="button"
                  className="rounded px-4 py-2 hover:!bg-neutral-300 cursor-pointer"
                  style={exportReportButtonStyle}
                >
                  Download
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="flex mt-4 justify-center">
          <div className="join">
            <button className="join-item btn bg-white text-gray-800">
              {"<<"}
            </button>
            <button className="join-item btn bg-white text-gray-800">1</button>
            <button className="join-item btn bg-white text-gray-800">
              ...
            </button>
            <button className="join-item btn bg-white text-gray-800">9</button>
            <button className="join-item btn bg-white text-gray-800">
              {">>"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
