import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import LoadingDots from "../LoadingDots";
import { PenolakanDokumenType } from "../../types/PerencanaanTypes";

const DaftarPenolakanPerencanaan = () => {
  const [resultData, setResultData] = useState<PenolakanDokumenType>([]);
  const [selectedTahun, setSelectedTahun] = useState("");
  const [selectedKecamatan, setSelectedKecamatan] = useState("");
  const [selectedDesa, setSelectedDesa] = useState("");

  useEffect(() => {
    axios
      .get(
        `https://ketapangkab.pendekar.digides.id/api/perencanaan/GetTabelDokumen`,
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      )
      .then(({ data }) => {
        console.log(data);
        setResultData(data.data);
      })
      .catch((error) => {
        alert(error.message);
      })
  }, []);

  return (
    <div className="bg-white p-5 mt-10 rounded shadow">
      <span className="text-base font-bold">Daftar Desa & Dokumen Ditolak</span>
      <div className="flex gap-x-5 pt-2">
        <select
          name=""
          className="border-2 border-neutral-500 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-2"
        >
          <option value="">Pilih Tahun</option>
          <option value="">Pilih Tahun</option>
          <option value="">Pilih Tahun</option>
        </select>

        <select
          name=""
          className="border-2 border-neutral-500 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-2"
        >
          <option value="">Semua Kecamatan</option>
          <option value="">Semua Kecamatan</option>
          <option value="">Semua Kecamatan</option>
        </select>

        <select
          name=""
          className="border-2 border-neutral-500 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-2"
        >
          <option value="">Pilih Desa</option>
          <option value="">Pilih Desa</option>
          <option value="">Pilih Desa</option>
        </select>
      </div>
      <table className="rounded text-sm w-full mt-4 overflow-hidden">
        <thead>
          <tr className="bg-[#AEDDF5] text-gray-700">
            <th className="border-2 border-gray-100 text-center w-1/5 py-2">
              Nama Kecamatan
            </th>
            <th className="border-2 border-gray-100 text-center w-1/5 py-2">
              Nama Desa
            </th>
            <th className="border-2 border-gray-100 text-center w-1/5 py-2">
              Status
            </th>
            <th className="border-2 border-gray-100 text-center w-2/5 py-2">
              Dokumen Kurang
            </th>
          </tr>
        </thead>
        <tbody>
          {resultData?.map((item: any, index: any) => {
            let color: string = ""
            switch (item.status) {
              case "Baru":
                color = "bg-sky-200 border-sky-500"
                break;
              case "Revisi":
                color = "bg-yellow-200 border-yellow-500"
                break;
              case "Disetujui":
                color = "bg-green-200 border-green-500"
                break;
              case "Ditolak":
                color = "bg-red-200 border-red-500"
                break;
              default:
                break;
            }
            
            return <tr key={index}>
              <td className="border border-neutral-200 px-2 py-3 text-center">
                {item.kecamatan}
              </td>
              <td className="border border-neutral-200 px-2 py-3 text-center">
                {item.desa}
              </td>
              <td className="border border-neutral-200 px-2 py-3 text-center">
                <span className={`${color} border rounded w-2/3 block mx-auto py-1`}>
                  {item.status}
                </span>
              </td>
              <td className="border border-neutral-200 px-2 py-3 text-center">
                {item.komentar || "-"}
              </td>
            </tr>

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
