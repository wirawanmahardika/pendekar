import { BiSearch } from "react-icons/bi";
import PageTitle from "../components/PageTitle";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { BASE_API_URL } from "../utils/api";
import { desaProfilDesa, profilDesaDataType } from "../types/ProfileDesaTypes";
import TabelDesaKecamatan from "../components/profilDesa/TableDesaKecamatan";
import { AxiosAuth } from "../utils/axios";
import LoadingDots from "../components/LoadingDots";
import useGetResultData from "../hooks/useGetResultData";
import useTitle from "../hooks/useTitle";


export default function ProfilDesa() {
  useAuth()
  useTitle("Profil Desa")

  const [search, setSearch] = useState({ text: "", kecamatan: "", desa: "" })
  const [dataTodisplay, setDataToDisplay] = useState<desaProfilDesa[]>()
  const [isLoading, setIsLoading] = useState(false);
  const resultData = useGetResultData<profilDesaDataType>(`${BASE_API_URL}profil?k3=&k4=&search=`, setIsLoading);

  useEffect(() => {
    AxiosAuth
      .get(`${BASE_API_URL}profil?k3=&k4=&search=`)
      .then((result) => setDataToDisplay(result.data.data.list_desa))
      .catch((error) => alert(error.message))
  }, []);

  useEffect(() => {
    const listDesa = resultData?.list_desa.filter(lb => {
      let status: boolean = true;
      if (search.kecamatan) status = status && lb.k3 === search.kecamatan
      if (search.desa) status = status && lb.k4 === search.desa
      if (search.text) status = status && lb.nama_deskel.toLowerCase().includes(search.text.toLowerCase())
      return status
    })
    setDataToDisplay(listDesa)
  }, [search])


  if (isLoading) return <LoadingDots />;

  return <div className="px-4 py-10">
    <PageTitle title="PROFIL DESA/KELURAHAN" last_updated={resultData?.last_updated} />
    <div className="p-4 bg-white rounded shadow mt-8">
      <div className="flex gap-x-5 pt-2">
        <div className="flex relative">
          <input onChange={(e: any) => setSearch(prev => ({ ...prev, text: e.target.value }))} type="text" placeholder="Cari Desa/Kelurahan..." className="focus:border-blue-400 focus:shadow border text-sm border-slate-300 rounded text-neutral-600 w-full outline-none pl-2 pr-10 py-1" />
          <BiSearch className="absolute right-2 top-1/2 -translate-y-1/2 size-6 fill-slate-600" />
        </div>

        <select onChange={(e: any) => setSearch(prev => ({ ...prev, kecamatan: e.target.value, desa: "" }))} className="focus:border-blue-400 focus:shadow border text-sm border-slate-300 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-1">
          <option value={""}>Semua Kecamatan</option>
          {resultData?.list_kecamatan.map(d => <option key={d.kode_wilayah} value={d.k3}>{d.nama_kecamatan}</option>)}
        </select>

        <select onChange={(e: any) => setSearch(prev => ({ ...prev, desa: e.target.value }))} className="focus:border-blue-400 focus:shadow border text-sm border-slate-300 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-1">

          <option value={""}>Semua Desa</option>
          {search.kecamatan && resultData?.list_desa.map(d => {
            if (d.k3 !== search.kecamatan) return;
            return <option key={d.kode_wilayah} value={d.k4}>{d.nama_deskel}</option>
          })}

        </select>
      </div>

      <TabelDesaKecamatan data={dataTodisplay} />
    </div>
  </div>
}