import { FaMessage } from "react-icons/fa6";
import StatusChanger from "./StatusChanger";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { AxiosAuth } from "../../utils/axios";
import { BASE_API_URL } from "../../utils/api";
import { dataToDisplayPerencanaanType, TabelDokumenDanPerencanaanDesaFilterType, TabelDokumenDanPerencanaanDesaSelectedFilterType } from "../../types/PerencanaanTypes";

export default function TabelDokumenDanPerencanaanDesa() {
    const [resultData, setResultData] = useState<dataToDisplayPerencanaanType>()
    const [dataToDisplay, setDataToDisplay] = useState<dataToDisplayPerencanaanType>([])
    const [filter, setFilter] = useState<TabelDokumenDanPerencanaanDesaFilterType>({
        tahun: [],
        kecamatan: [],
        desa: []
    })

    const [selectedFilter, setSelectedFilter] = useState<TabelDokumenDanPerencanaanDesaSelectedFilterType>({
        tahun: '',
        kecamatan: '',
        desa: ''
    })

    useEffect(() => {
        AxiosAuth.get(`${BASE_API_URL}perencanaan/GetTabelDokumen`)
            .then(res => {
                setDataToDisplay(res.data.data);
                setResultData(res.data.data);

                const tahun = [... new Set(res.data.data.map((d: any) => d.tahun))] as string[]
                const kecamatan = [... new Set(res.data.data.map((d: any) => d.kecamatan))] as string[]
                const desa = [... new Set(res.data.data.map((d: any) => d.desa))] as string[]
                setFilter({ tahun, kecamatan, desa })
            })
    }, [])

    const filterTahunChange = (e: any) => {
        const selectedTahun = e.target.value
        setSelectedFilter(value => ({ ...value, tahun: selectedTahun }))

        const newDataToDisplay = !resultData ? [] : resultData.filter(d => {
            let status: boolean = true
            if (selectedTahun) { status = status && selectedTahun === d.tahun }
            if (selectedFilter.kecamatan) { status = status && selectedFilter.kecamatan === d.kecamatan }
            if (selectedFilter.desa) { status = status && selectedFilter.desa === d.desa }
            return status
        })

        setDataToDisplay(newDataToDisplay)
    }

    const filterKecamatanChange = (e: any) => {
        const selectedKec = e.target.value
        setSelectedFilter(value => ({ ...value, kecamatan: selectedKec }))

        const newDataToDisplay = !resultData ? [] : resultData.filter(d => {
            let status: boolean = true
            if (selectedKec) { status = status && selectedKec === d.kecamatan }
            if (selectedFilter.tahun) { status = status && selectedFilter.tahun === d.tahun }
            if (selectedFilter.desa) { status = status && selectedFilter.desa === d.desa }
            return status
        })

        setDataToDisplay(newDataToDisplay)
    }

    const filterDesaChange = (e: any) => {
        const selectedDesa = e.target.value
        setSelectedFilter(value => ({ ...value, desa: selectedDesa }))

        const newDataToDisplay = !resultData ? [] : resultData.filter(d => {
            let status: boolean = true
            if (selectedDesa) { status = status && selectedDesa === d.desa }
            if (selectedFilter.tahun) { status = status && selectedFilter.tahun === d.tahun }
            if (selectedFilter.kecamatan) { status = status && selectedFilter.kecamatan === d.kecamatan }
            return status
        })

        setDataToDisplay(newDataToDisplay)
    }

    return <div className="bg-white p-5 mt-10 rounded shadow">
        <span className="text-base font-bold">Tabel Dokumen dan Perencanaan Desa</span>
        <div className="flex gap-x-5 pt-2">
            <select onChange={filterTahunChange} className="border-2 border-neutral-500 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-2">
                <option value="">Pilih Tahun</option>
                {filter.tahun.map(f => <option key={f} value={f}>{f}</option>)}
            </select>

            <select onChange={filterKecamatanChange} className="border-2 border-neutral-500 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-2">
                <option value="">Semua Kecamatan</option>
                {filter.kecamatan.map(f => <option key={f} value={f}>{f}</option>)}
            </select>

            <select onChange={filterDesaChange} className="border-2 border-neutral-500 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-2">
                <option value="">Pilih Desa</option>
                {filter.desa.map(f => <option key={f} value={f}>{f}</option>)}
            </select>


        </div>
        <table className="rounded text-sm w-full mt-4 overflow-hidden">
            <thead>
                <tr className="bg-[#AEDDF5] text-gray-700">
                    <th className="border-2 border-neutral-100 text-center w-1/6 py-2">Nama Kecamatan</th>
                    <th className="border-2 border-neutral-100 text-center w-1/6 py-2">Nama Desa</th>
                    <th className="border-2 border-neutral-100 text-center w-2/6 py-2">Nama Dokumen</th>
                    <th className="border-2 border-neutral-100 text-center w-1/6 py-2">Berkas</th>
                    <th className="border-2 border-neutral-100 text-center w-1/6 py-2">Status</th>
                </tr>
            </thead>
            <tbody>
                {
                    dataToDisplay.map(d => {
                        return <tr>
                            <td className="border-2 border-neutral-100 px-2 py-3">{d.kecamatan}</td>
                            <td className="border-2 border-neutral-100 px-2 py-3">{d.desa}</td>
                            <td className="border-2 border-neutral-100 px-2 py-3">{d.nama_dokumen}</td>
                            <td className="border-2 border-neutral-100 px-2 py-3">
                                <a target="_blank" href={`https://online.digitaldesa.id/uploads/${d.kode}/perencanaan-keuangan-desa/${d.url_dokumen}`} className="flex bg-neutral-200 rounded text-sky-400 w-fit gap-x-2 px-2 py-1 cursor-pointer">
                                    <span>Lihat Berkas</span>
                                    <i className="bi bi-eye"></i>
                                </a>
                            </td>
                            <td className="border-2 border-neutral-100 px-2 py-3">
                                <div className="flex justify-around items-center">
                                    <StatusChanger data={d} defaultStatus={d.status} />
                                    <FaMessage onClick={() => {
                                        if(d.status !== 'Ditolak') return;
                                        Swal.fire({
                                            title: "Komentar",
                                            text: d.komentar,
                                            icon: "info"
                                        });
                                    }} className={`${d.status !== 'Ditolak' ? "text-gray-700" : "text-sky-700 cursor-pointer"}`} size={20} />
                                </div>
                            </td>
                        </tr>
                    })
                }
            </tbody>
        </table>
    </div>
}