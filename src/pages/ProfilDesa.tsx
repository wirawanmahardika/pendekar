import { BiSearch } from "react-icons/bi";
import PageTitle from "../components/PageTitle";
import { GiWorld } from "react-icons/gi";
import ExportReportButton from "../components/ExportReportButton";
import { tableHeaderStyle } from "../utils/themeSetting";
import useTitle from "../hooks/useTitle";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_API_URL } from "../utils/api";

export default function ProfilDesa() {
    useTitle('Profile Desa')
    useAuth()

    const [resultData, setResultData] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [update, setUpdate] = useState();
  
    useEffect(() => {
        setIsLoading(true);
        axios
          .get(`${BASE_API_URL}profil?k3=&k4=&search=`, {
            headers: { Authorization: localStorage.getItem('token')}
          })
          .then((result) => {
            console.log(result.data.data)
            const data = result.data.data;
            setResultData(data);
            setUpdate(data.last_updated);
          })
          .catch((error) => {
            alert(error.message);
          })
      }, []);

    return <div className="px-4 py-10">
        <PageTitle title="PROFIL DESA/KELURAHAN" />
        <div className="p-4 bg-white rounded shadow mt-8">
            <div className="flex items-center justify-between">
                <h2 className="font-bold text-xl">Rekap Penerima Bantuan Sosial</h2>
                <ExportReportButton />
            </div>
            <div className="flex gap-x-5 pt-2">
                <div className="flex relative">
                    <input type="text" placeholder="Cari Desa/Kelurahan..." className="focus:border-blue-400 focus:shadow border text-sm border-slate-300 rounded text-neutral-600 w-full outline-none pl-2 pr-10 py-1" />
                    <BiSearch className="absolute right-2 top-1/2 -translate-y-1/2 size-6 fill-slate-600" />
                </div>

                <select name="" className="focus:border-blue-400 focus:shadow border text-sm border-slate-300 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-1">
                    <option value="">Semua Kecamatan</option>
                    <option value="">Semua Kecamatan</option>
                    <option value="">Semua Kecamatan</option>
                </select>

                <select name="" className="focus:border-blue-400 focus:shadow border text-sm border-slate-300 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-1">
                    <option value="">Semua Desa</option>
                    <option value="">Semua Desa</option>
                    <option value="">Semua Desa</option>
                </select>
            </div>

            <table className="overflow-x-auto min-w-full mt-5 text-center">
                <thead>
                    <tr style={tableHeaderStyle}>
                        <th className="p-2 border font-semibold border-gray-300">No</th>
                        <th className="p-2 border font-semibold border-gray-300">Kode Wilayah</th>
                        <th className="p-2 border font-semibold border-gray-300">Kecamatan</th>
                        <th className="p-2 border font-semibold border-gray-300">Desa</th>
                        <th className="p-2 border font-semibold border-gray-300">Website</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="p-3 border border-gray-300">1</td>
                        <td className="p-3 border border-gray-300">61.04.05.2001</td>
                        <td className="p-3 border border-gray-300">Sandai</td>
                        <td className="p-3 border border-gray-300">Sandai</td>
                        <td className="p-3 border border-gray-300 flex items-center gap-x-3 justify-center">
                            <GiWorld />
                            <a href="" className="hover:text-sky-600">Website Desa</a>
                        </td>
                    </tr>
                    <tr>
                        <td className="p-3 border border-gray-300">1</td>
                        <td className="p-3 border border-gray-300">61.04.05.2001</td>
                        <td className="p-3 border border-gray-300">Sandai</td>
                        <td className="p-3 border border-gray-300">Petai Patah</td>
                        <td className="p-3 border border-gray-300 flex items-center gap-x-3 justify-center">
                            <GiWorld />
                            <a href="" className="hover:text-sky-600">Website Desa</a>
                        </td>
                    </tr>
                    <tr>
                        <td className="p-3 border border-gray-300">1</td>
                        <td className="p-3 border border-gray-300">61.04.05.2001</td>
                        <td className="p-3 border border-gray-300">Sandai</td>
                        <td className="p-3 border border-gray-300">Randau</td>
                        <td className="p-3 border border-gray-300 flex items-center gap-x-3 justify-center">
                            <GiWorld />
                            <a href="" className="hover:text-sky-600">Website Desa</a>
                        </td>
                    </tr>

                </tbody>
            </table>

            <div className="flex mt-4 justify-center">
                <div className="join">
                    <button className="join-item btn bg-white text-gray-800">{"<<"}</button>
                    <button className="join-item btn bg-white text-gray-800">1</button>
                    <button className="join-item btn bg-white text-gray-800">...</button>
                    <button className="join-item btn bg-white text-gray-800">9</button>
                    <button className="join-item btn bg-white text-gray-800">{">>"}</button>
                </div>
            </div>
        </div>
    </div>
}