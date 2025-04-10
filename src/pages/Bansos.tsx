import { BiSearch } from "react-icons/bi";
import PageTitle from "../components/PageTitle";
import ExportReportButton from "../components/ExportReportButton";
import { tableHeaderStyle } from "../utils/themeSetting";
import useTitle from "../hooks/useTitle";
import useAuth from "../hooks/useAuth";
import { FaPeopleCarry, FaUsers } from "react-icons/fa";
import { BASE_API_URL } from "../utils/api";
import { useEffect, useState } from "react";
import { AxiosAuth } from "../utils/axios";
import { bansosType } from "../types/BansosTypes";

export default function Bansos() {
    useTitle("Bansos")
    useAuth()

    const [resultData, setResultData] = useState<bansosType>();
    const [filter, setFilter] = useState({ kecamatan: 'all', desa: 'all' })
    const [mendapatBantuan, setMendapatBantuan] = useState<{penduduk: string|number, kk: string|number}>({ penduduk: 0, kk: 0 })

    useEffect(() => {
        AxiosAuth
            .get(`${BASE_API_URL}bansos`)
            .then((result) => setResultData(result.data.data))
            .catch((error) => alert(error.message))
    }, []);

    useEffect(() => {
        setMendapatBantuan(() => {
            const penduduk = filter.kecamatan !== "all" ? resultData?.list_kecamatan?.find(k => k.nama_kecamatan === filter.kecamatan).jml_penerima : resultData?.list_kecamatan?.reduce((acc, curr) => acc + parseInt(curr.jml_penerima), 0)

            const kk = filter.kecamatan !== "all" ? 
                resultData?.list_kecamatan?.find(k => k.nama_kecamatan === filter.kecamatan).jml_penerima_kk 
            : 
                resultData?.list_kecamatan?.reduce((acc, curr) => acc + parseInt(curr.jml_penerima_kk), 0)
            return { penduduk, kk }
        })
    }, [resultData])

    const listKecamatan = resultData?.list_kecamatan.map((k: any) => {
        return <option key={k.kode_wilayah} value={k.nama_kecamatan}>{k.nama_kecamatan}</option>
    })

    const listDesa = resultData?.list_desa.map((k: any) => {
        if (k.nama_kecamatan !== filter.kecamatan) return;
        return <option key={k.kode_wilayah} value={k.nama_deskel}>{k.nama_deskel}</option>
    })

    const kecamatanFilterChange = (e: any) => {
        setFilter(p => ({ ...p, kecamatan: e.target.value }))
        setMendapatBantuan(() => {
            const penduduk = e.target.value !== "all" ? resultData?.list_kecamatan?.find(k => k.nama_kecamatan === e.target.value).jml_penerima : resultData?.list_kecamatan?.reduce((acc, curr) => acc + parseInt(curr.jml_penerima), 0)

            const kk = e.target.value !== "all" ? 
                resultData?.list_kecamatan?.find(k => k.nama_kecamatan === e.target.value).jml_penerima_kk 
            : 
                resultData?.list_kecamatan?.reduce((acc, curr) => acc + parseInt(curr.jml_penerima_kk), 0)
            return { penduduk, kk }
        })
    }
    
    const desaFilterChange = (e: any) => {
        setFilter(p => ({ ...p, desa: e.target.value }))
        setMendapatBantuan(() => {
            const penduduk = e.target.value !== "all" ? resultData?.list_desa?.find(k => k.nama_deskel === e.target.value).jml_penerima : resultData?.list_desa?.reduce((acc, curr) => acc + parseInt(curr.jml_penerima), 0)

            const kk = e.target.value !== "all" ? 
                resultData?.list_desa?.find(k => k.nama_deskel === e.target.value).jml_penerima_kk 
            : 
                resultData?.list_desa?.reduce((acc, curr) => acc + parseInt(curr.jml_penerima_kk), 0)
            return { penduduk, kk }
        })
    }

    return <div className="px-4 py-10">
        <PageTitle title="Bantuan Sosial" />

        <div className="p-4 bg-white rounded shadow mt-8">
            <div className="flex justify-between items-center">
                <div className="flex gap-x-5 pt-2 min-w-2/3">
                    <select onChange={kecamatanFilterChange} className="focus:border-blue-400 focus:shadow border text-sm bg-white border-slate-300 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-1">
                        <option value="all">Semua Kecamatan</option>
                        {listKecamatan}
                    </select>

                    <select  onChange={desaFilterChange} className="focus:border-blue-400 focus:shadow border text-sm bg-white border-slate-300 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-1">
                        <option value="all">Semua Desa</option>
                        {listDesa}
                    </select>
                </div>

                <ExportReportButton />
            </div>

            <div className="grid grid-cols-2 gap-x-5 mt-6">
                <div className="flex justify-between items-center p-9 bg-emerald-800 rounded text-white">
                    <div className="flex flex-col">
                        <span className="font-bold text-5xl">{mendapatBantuan.penduduk}</span>
                        <span className="text-xl">Penduduk Mendapat Bantuan</span>
                    </div>
                    <FaPeopleCarry size={50} />
                </div>

                <div className="flex justify-between items-center p-9 bg-yellow-600 rounded text-white">
                    <div className="flex flex-col">
                        <span className="font-bold text-5xl">{mendapatBantuan.kk}</span>
                        <span className="text-xl">Kepala Keluarga Mendapat Bantuan</span>
                    </div>
                    <FaUsers size={50} />
                </div>
            </div>

        </div>

        <RekapPenerimaBantuanSosial />
    </div>
}

function RekapPenerimaBantuanSosial() {
    return <div className="p-4 bg-white rounded shadow mt-8">
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
                    <th className="p-2 border font-semibold border-gray-300">Kecamatan</th>
                    <th className="p-2 border font-semibold border-gray-300">Desa</th>
                    <th className="p-2 border font-semibold border-gray-300">Jenis Bantuan</th>
                    <th className="p-2 border font-semibold border-gray-300">Individu</th>
                    <th className="p-2 border font-semibold border-gray-300">KK</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="p-3 border border-gray-300">1</td>
                    <td className="p-3 border border-gray-300">Sandai</td>
                    <td className="p-3 border border-gray-300">Alam Pakuan</td>
                    <td className="p-3 border border-gray-300">PKH</td>
                    <td className="p-3 border border-gray-300">2</td>
                    <td className="p-3 border border-gray-300">2</td>
                </tr>
                <tr>
                    <td className="p-3 border border-gray-300">2</td>
                    <td className="p-3 border border-gray-300">Sandai</td>
                    <td className="p-3 border border-gray-300">Alam Pakuan</td>
                    <td className="p-3 border border-gray-300">PKH</td>
                    <td className="p-3 border border-gray-300">2</td>
                    <td className="p-3 border border-gray-300">2</td>
                </tr>
                <tr>
                    <td className="p-3 border border-gray-300">3</td>
                    <td className="p-3 border border-gray-300">Sandai</td>
                    <td className="p-3 border border-gray-300">Alam Pakuan</td>
                    <td className="p-3 border border-gray-300">PKH</td>
                    <td className="p-3 border border-gray-300">2</td>
                    <td className="p-3 border border-gray-300">2</td>
                </tr>
                <tr>
                    <td className="p-3 border border-gray-300">4</td>
                    <td className="p-3 border border-gray-300">Sandai</td>
                    <td className="p-3 border border-gray-300">Alam Pakuan</td>
                    <td className="p-3 border border-gray-300">PKH</td>
                    <td className="p-3 border border-gray-300">2</td>
                    <td className="p-3 border border-gray-300">2</td>
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
}