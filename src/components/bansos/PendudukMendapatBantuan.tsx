import { useEffect, useState } from "react"
import { bansosType } from "../../types/BansosTypes"
import ExportReportButton from "../ExportReportButton"
import { FaPeopleCarry, FaUsers } from "react-icons/fa"

export default
    function PendudukMendapatBantuan({ resultData }: { resultData?: bansosType }) {
    const [mendapatBantuan, setMendapatBantuan] = useState<{ penduduk: string | number, kk: string | number }>({ penduduk: 0, kk: 0 })
    const [filter, setFilter] = useState({ kecamatan: 'all', desa: 'all' })

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
            const penduduk = e.target.value !== "all" ?
                resultData?.list_desa?.find(k => k.nama_deskel === e.target.value).jml_penerima
                :
                resultData?.list_desa?.reduce((acc, curr) => {
                    return curr.nama_kecamatan === filter.kecamatan ? acc + parseInt(curr.jml_penerima) : acc + 0
                }, 0)

            const kk = e.target.value !== "all" ?
                resultData?.list_desa?.find(k => k.nama_deskel === e.target.value).jml_penerima_kk
                :
                resultData?.list_desa?.reduce((acc, curr) => {
                    return curr.nama_kecamatan === filter.kecamatan ? acc + parseInt(curr.jml_penerima_kk) : acc + 0
                }, 0)

            return { penduduk, kk }
        })
    }

    return <div className="p-4 bg-white rounded shadow mt-8">
        <div className="flex justify-between items-center">
            <div className="flex gap-x-5 pt-2 min-w-2/3">
                <select onChange={kecamatanFilterChange} className="focus:border-blue-400 focus:shadow border text-sm bg-white border-slate-300 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-1">
                    <option value="all">Semua Kecamatan</option>
                    {listKecamatan}
                </select>

                <select onChange={desaFilterChange} className="focus:border-blue-400 focus:shadow border text-sm bg-white border-slate-300 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-1">
                    <option value="all">Semua Desa</option>
                    {listDesa}
                </select>
            </div>

            <ExportReportButton url="export/bansos" />
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

}
