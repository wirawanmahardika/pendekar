import { FaMessage } from "react-icons/fa6";
import StatusChanger from "./StatusChanger";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { dataToDisplayPerencanaanType, TabelDokumenDanPerencanaanDesaFilterType, TabelDokumenDanPerencanaanDesaSelectedFilterType } from "../../types/PerencanaanTypes";
import { exportReportButtonStyle } from "../../utils/themeSetting";
import dayjs from "dayjs";

export default function TabelDokumenDanPerencanaanDesa({ resultData }: { resultData: dataToDisplayPerencanaanType }) {
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
        setDataToDisplay(resultData);

        const tahun = [... new Set(resultData.map((d: any) => d.tahun))] as string[]
        const kecamatan = [... new Set(resultData.map((d: any) => d.kecamatan))] as string[]
        const desa = [... new Set(resultData.map((d: any) => d.desa))] as string[]


        setFilter({ tahun: tahun.sort(), kecamatan, desa })
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
        <TabelWithPagination data={dataToDisplay} />
    </div>
}


function getPaginationRange(currentPage: number, totalPages: number) {
    const delta = 1; // jumlah halaman di kiri dan kanan currentPage
    const range = [];
    const rangeWithDots = [];

    for (let i = 1; i <= totalPages; i++) {
        if (
            i === 1 ||
            i === totalPages ||
            (i >= currentPage - delta && i <= currentPage + delta)
        ) {
            range.push(i);
        }
    }

    let prev = 0;
    for (let i of range) {
        if (prev && i - prev !== 1) {
            rangeWithDots.push("...");
        }
        rangeWithDots.push(i);
        prev = i;
    }

    return rangeWithDots;
}


function TabelWithPagination({ data }: { data: dataToDisplayPerencanaanType }) {
    console.log(data);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const paginatedData = data.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    useEffect(() => {
        if (currentPage > totalPages) setCurrentPage(1)
    }, [data])


    const changePage = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return <>
        <table className="rounded text-sm w-full mt-4 overflow-hidden">
            <thead>
                <tr className="bg-[#AEDDF5] text-gray-700">
                    <th className="border-2 border-neutral-100 text-center w-1/12 py-2">PIC</th>
                    <th className="border-2 border-neutral-100 text-center w-2/12 py-2">Nama Kecamatan</th>
                    <th className="border-2 border-neutral-100 text-center w-1/12 py-2">Nama Desa</th>
                    <th className="border-2 border-neutral-100 text-center w-2/12 py-2">Nama Dokumen</th>
                    <th className="border-2 border-neutral-100 text-center w-2/12 py-2">Berkas</th>
                    <th className="border-2 border-neutral-100 text-center w-2/12 py-2">Versi Dokumen</th>
                    <th className="border-2 border-neutral-100 text-center w-2/12 py-2">Status</th>
                </tr>
            </thead>
            <tbody>
                {
                    paginatedData.map(d => {
                        return <tr key={d.desa + d.id_dokumen}>
                            <td className="border-2 border-neutral-100 px-2 py-3">{d.pic}</td>
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
                                <JenisDokumenField jenis_dokumen={d.jenis_dokumen} tanggal_perubahan={dayjs(d.tanggal_perubahan).locale("id").format("D MMM YYYY")} />
                            </td>
                            <td className="border-2 border-neutral-100 px-2 py-3">
                                <div className="flex justify-around items-center">
                                    <StatusChanger data={d} defaultStatus={d.status} />
                                    <FaMessage onClick={() => {
                                        if (d.status !== 'Ditolak') return;
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
        <div className="flex mt-4 justify-center">
            <div className="join">
                <button
                    style={exportReportButtonStyle}
                    className="join-item btn disabled:!bg-stone-100 disabled:!text-stone-400 text-lg disabled:!cursor-not-allowed text-gray-500  shadow-none"
                    onClick={() => changePage(1)}
                    disabled={currentPage === 1}
                >
                    {"<<"}
                </button>
                <button
                    style={exportReportButtonStyle}
                    className="join-item btn disabled:!bg-stone-100 disabled:!text-stone-400 text-lg disabled:!cursor-not-allowed text-gray-500  shadow-none"
                    onClick={() => changePage(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    {"<"}
                </button>

                {getPaginationRange(currentPage, totalPages).map((item, index) => {
                    if (typeof item === 'string') {
                        return (
                            <button
                                key={`ellipsis-${index}`}
                                className="join-item btn border text-gray-400"
                            >
                                ...
                            </button>
                        );
                    }

                    return (
                        <button
                            key={item}
                            className={`join-item btn ${item === currentPage
                                ? "bg-blue-500 text-white"
                                : "bg-white text-gray-800 shadow-none"
                                }`}
                            onClick={() => changePage(item)}
                        >
                            {item}
                        </button>
                    );
                })}

                <button
                    style={exportReportButtonStyle}
                    className="join-item btn disabled:!bg-stone-100 disabled:!text-stone-400 text-lg disabled:!cursor-not-allowed text-gray-500  shadow-none"
                    onClick={() => changePage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    {">"}
                </button>
                <button
                    style={exportReportButtonStyle}
                    className="join-item btn disabled:!bg-stone-100 disabled:!text-stone-400 text-lg disabled:!cursor-not-allowed text-gray-500  shadow-none"
                    onClick={() => changePage(totalPages)}
                    disabled={currentPage === totalPages}
                >
                    {">>"}
                </button>
            </div>
        </div>
    </>
}

function JenisDokumenField({ jenis_dokumen, tanggal_perubahan }: { jenis_dokumen: string; tanggal_perubahan: string }) {
    return <div className="p-1 flex flex-col gap-y-3">
        <button className={`btn ${jenis_dokumen === "Perubahan" ? "bg-yellow-200" : "bg-emerald-200"} `}>{jenis_dokumen}</button>
        <span className="text-gray-700">{tanggal_perubahan}</span>
    </div>
}