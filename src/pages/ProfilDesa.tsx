import { BiSearch } from "react-icons/bi";
import PageTitle from "../components/PageTitle";
import ExportReportButton from "../components/ExportReportButton";
import useTitle from "../hooks/useTitle";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_API_URL } from "../utils/utils/api";
import { DesaProfilDesa, profilDesaDataType } from "../types/ProfileDesaTypes";
import TabelDesaKecamatan from "../components/profilDesa/TableDesaKecamatan";


export default function ProfilDesa() {
    useTitle('Profile Desa')
    useAuth()

    const [resultData, setResultData] = useState<profilDesaDataType>();
    const [dataTodisplay, setDataToDisplay] = useState<DesaProfilDesa[]>()
  
    useEffect(() => {
        axios
          .get(`${BASE_API_URL}profil?k3=&k4=&search=`, {
            headers: { Authorization: localStorage.getItem('token')}
          })
          .then((result) => {
            const data = result.data.data;
            setResultData(data);
            setDataToDisplay(data.list_desa)
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

                <Pencarian data={resultData} setDataToDisplay={setDataToDisplay} />
            </div>

            <TabelDesaKecamatan data={dataTodisplay} />
        </div>
    </div>
}

const Pencarian = ({data, setDataToDisplay} : {data?: profilDesaDataType, setDataToDisplay: React.Dispatch<React.SetStateAction<DesaProfilDesa[] | undefined>>}) => {
    if(!data) return;

    const listKecamatan = data.list_kecamatan.map((k =>  <option key={k.kode_wilayah} value={k.nama_kecamatan}>{k.nama_kecamatan}</option>))
    const kecamatanHandle = (e: any) => {
        const selectedValue = e.target.value
        if(selectedValue === "all") return setDataToDisplay(data.list_desa)

        const filteredData = data.list_desa.filter(d => d.nama_kecamatan === selectedValue)
        setDataToDisplay(filteredData)
    }

    const desaHandle = (e:any) => {
        const filteredData = data.list_desa.filter(d => d.nama_desa === e.target.value)
        setDataToDisplay(filteredData)
    }


    return <>
        <select onChange={kecamatanHandle} className="focus:border-blue-400 focus:shadow border text-sm border-slate-300 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-1">
            <option value={"all"}>Semua Kecamatan</option>
            {listKecamatan}
        </select>

        <select onChange={desaHandle} className="focus:border-blue-400 focus:shadow border text-sm border-slate-300 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-1">
            <option value="">Semua Desa</option>
        </select>
    </>
}