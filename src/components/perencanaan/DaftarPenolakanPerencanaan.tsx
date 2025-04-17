import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import LoadingDots from "../LoadingDots";
import { KelengkapanDokumenType } from "../../types/PerencanaanTypes";
import { AxiosAuth } from "../../utils/axios";
import { BASE_API_URL } from "../../utils/api";

const DaftarPenolakanPerencanaan = () => {
  const [resultData, setResultData] = useState<KelengkapanDokumenType>([]);
  const [selectedTahun, setSelectedTahun] = useState("");
  const [selectedKecamatan, setSelectedKecamatan] = useState("");
  const [selectedDesa, setSelectedDesa] = useState("");

  useEffect(() => {
    AxiosAuth
      .get(`${BASE_API_URL}perencanaan/GetDaftarDesa`)
      .then(({ data }) => {
        console.log(data.data);
        setResultData(data.data);
      })
      .catch((error) => {
        alert(error.message);
      })
  }, []);

  console.log(resultData);
  

  return (
    <div className="bg-white p-5 mt-10 rounded shadow">
      <span className="text-base font-bold">Daftar Desa & Kelengkapan Dokumen</span>
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

        <select
          name=""
          className="border-2 border-neutral-500 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-2"
        >
          <option value="">Filter Progress Perencanaan</option>
          <option value="">Pilih Desa</option>
          <option value="">Pilih Desa</option>
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
            return <tr key={index}>
              <td className="border border-neutral-200 px-2 py-3 text-center">
                {item.kecamatan}
              </td>
              <td className="border border-neutral-200 px-2 py-3 text-center">
                {item.desa}
              </td>
              <td className="border border-neutral-200 px-2 py-3 text-center">
                {item.rpjmdes ? '\u2713' : '\u2716'}
              </td>
              <td className="border border-neutral-200 px-2 py-3 text-center">
                {item.rkpdes ? '\u2713' : '\u2716'}
              </td>
              <td className="border border-neutral-200 px-2 py-3 text-center">
                {item.apbdes ? '\u2713' : '\u2716'}
              </td>
              <td className="border border-neutral-200 px-2 py-3 text-center">
                <div className="relative w-11/12 h-5 rounded-xl mx-auto bg-sky-200 overflow-hidden">
                  <div style={{ width: `${item.progress}%` }} className="bg-sky-400 h-full"></div>
                  <span className="absolute top-1/2 font-semibold -translate-y-1/2 right-3">{item.progress}%</span>
                </div>
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
