import { BiSearch } from "react-icons/bi";
import PageTitle from "../components/PageTitle";
import ExportReportButton from "../components/ExportReportButton";
import useTitle from "../hooks/useTitle";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_API_URL } from "../utils/api";
import { DesaProfilDesa, profilDesaDataType } from "../types/ProfileDesaTypes";
import TabelDesaKecamatan from "../components/profilDesa/TableDesaKecamatan";


export default function ProfilDesa() {
    useTitle('Profile Desa')
    useAuth()

    const [search, setSearch] = useState({text: "", kecamatan: ""})
    const [resultData, setResultData] = useState<profilDesaDataType>();
    const [dataTodisplay, setDataToDisplay] = useState<DesaProfilDesa[]>()

    useEffect(() => {
        axios
          .get(`${BASE_API_URL}profil?k3=&k4=&search=`, {
            headers: { Authorization: localStorage.getItem('token')}
          })
          .then((result) => {
            setResultData(result.data.data);
          })
          .catch((error) => {
            alert(error.message);
          })
    }, [])
  
    useEffect(() => {
        axios
          .get(`${BASE_API_URL}profil?k3=${search.kecamatan}&k4=&search=${search.text}`, {
            headers: { Authorization: localStorage.getItem('token')}
          })
          .then((result) => {
            const data = result.data.data;
            setDataToDisplay(data.list_desa)
          })
          .catch((error) => {
            alert(error.message);
          })
    }, [search]);

    
    const listKecamatan = resultData?.list_kecamatan.map(d => {
        return <option key={d.kode_wilayah} value={d.k3}>{d.nama_kecamatan}</option>
    })

    return <div className="px-4 py-10">
        <PageTitle title="PROFIL DESA/KELURAHAN" />
        <div className="p-4 bg-white rounded shadow mt-8">
            <div className="flex items-center justify-between">
                <h2 className="font-bold text-xl">Rekap Penerima Bantuan Sosial</h2>
                <ExportReportButton />
            </div>
            <div className="flex gap-x-5 pt-2">
                <div className="flex relative">
                    <input onChange={(e:any) => setSearch(prev => ({...prev, text: e.target.value}))}  type="text" placeholder="Cari Desa/Kelurahan..." className="focus:border-blue-400 focus:shadow border text-sm border-slate-300 rounded text-neutral-600 w-full outline-none pl-2 pr-10 py-1" />
                    <BiSearch className="absolute right-2 top-1/2 -translate-y-1/2 size-6 fill-slate-600" />
                </div>

                <select  onChange={(e:any) => setSearch(prev => ({...prev, kecamatan: e.target.value}))}  className="focus:border-blue-400 focus:shadow border text-sm border-slate-300 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-1">
                    <option value={"all"}>Semua Kecamatan</option>
                    {listKecamatan}
                </select>
            </div>

            <TabelDesaKecamatan data={dataTodisplay} />
        </div>
    </div>
}