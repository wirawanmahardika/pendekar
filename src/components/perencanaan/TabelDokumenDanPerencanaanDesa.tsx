import { FaMessage } from "react-icons/fa6";
import Swal from "sweetalert2";
import { useEffect, useState, useMemo, useCallback } from "react";
import dayjs from "dayjs";
import createIdGenerator from "../../utils/idGenerator";
import Pagination from "../Pagination";
import { dokumenDanPerencaanType, dokumenDanPerencaanFilterType, dokumenDanPerencaanPartType } from "../../types/perencaan/DokumenDanPerencanaan";
import { dokumenDanPerencanaanAction } from "../../hooks/perencaan/DokumenDanPerencanaanDesaReducer";
import { AxiosAuth } from "../../utils/axios";
import { BASE_API_URL } from "../../utils/api";
import DateRangeButton from "./DateRangeButton";
import { Range } from "react-date-range";

const getId = createIdGenerator();
export default function TabelDokumenDanPerencanaanDesa({ allData, dispatchAllData }: { allData: dokumenDanPerencaanType[], dispatchAllData: React.ActionDispatch<[action: dokumenDanPerencanaanAction]> }) {
    const [dataToDisplay, setDataToDisplay] = useState(allData)
    const [selectedFilter, setSelectedFilter] = useState<dokumenDanPerencaanFilterType>({
        tahun: "",
        kecamatan: "",
        desa: ""
    });
    const [dateRange, setDateRange] = useState<Range | null>(null);

    const filteredData = useMemo(() => {
        return allData.filter(d => {
            let status = true;
            if (selectedFilter.tahun) status = status && selectedFilter.tahun === d.tahun.toString();
            if (selectedFilter.kecamatan) status = status && selectedFilter.kecamatan === d.kecamatan;
            if (selectedFilter.desa) status = status && selectedFilter.desa === d.desa;

            // ✅ filter berdasarkan tanggal_perubahan jika ada dateRange
            if (dateRange?.startDate && dateRange?.endDate) {
                const tanggal = new Date(d.insert_date);
                status = status && tanggal >= dateRange.startDate && tanggal <= dateRange.endDate;
            }

            return status;
        });
    }, [allData, selectedFilter, dateRange]);


    useEffect(() => {
        setDataToDisplay(filteredData)
    }, [filteredData]);

    const tahunOptions = useMemo(() => {
        const tahun = [...new Set(allData.map((d: any) => d.tahun))].sort();
        return tahun.map(t => ({ tahun: t, id: getId() }))
    }, [allData]);

    const kecamatanOptions = useMemo(() => {
        const filtered = selectedFilter.tahun
            ? allData.filter(d => d.tahun.toString() === selectedFilter.tahun)
            : allData;
        const kecamatan = [...new Set(filtered.map((d: any) => d.kecamatan))];
        return kecamatan.map(k => ({ kecamatan: k, id: getId() }))
    }, [allData, selectedFilter.tahun]);

    const desaOptions = useMemo(() => {
        let filtered = allData;
        if (selectedFilter.tahun) {
            filtered = filtered.filter(d => d.tahun.toString() === selectedFilter.tahun);
        }
        if (selectedFilter.kecamatan) {
            filtered = filtered.filter(d => d.kecamatan === selectedFilter.kecamatan);
        }
        const desa = [...new Set(filtered.map((d: any) => d.desa))];
        return desa.map(d => ({ desa: d, id: getId() }))
    }, [allData, selectedFilter.tahun, selectedFilter.kecamatan]);

    const filterTahunChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedFilter(f => ({ ...f, tahun: e.target.value }));
    }, []);
    const filterKecamatanChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedFilter(f => ({ ...f, kecamatan: e.target.value }));
    }, []);
    const filterDesaChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedFilter(f => ({ ...f, desa: e.target.value }));
    }, []);

    return (
        <div className="bg-white p-5 mt-10 rounded shadow">
            <span className="text-base font-bold">Tabel Dokumen dan Perencanaan Desa</span>
            <div className="flex gap-x-5 pt-2">
                <select value={selectedFilter.tahun} onChange={filterTahunChange} className="border-2 border-neutral-500 rounded text-neutral-600 w-1/5 outline-none pl-2 pr-4 py-2">
                    <option value="">Pilih Tahun</option>
                    {tahunOptions.map(f => <option key={f.id} value={f.tahun}>{f.tahun}</option>)}
                </select>
                <select value={selectedFilter.kecamatan} onChange={filterKecamatanChange} className="border-2 border-neutral-500 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-2">
                    <option value="">Semua Kecamatan</option>
                    {kecamatanOptions.map(f => <option key={f.id} value={f.kecamatan}>{f.kecamatan}</option>)}
                </select>
                <select value={selectedFilter.desa} onChange={filterDesaChange} className="border-2 border-neutral-500 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-2">
                    <option value="">Pilih Desa</option>
                    {desaOptions.map(f => <option key={f.id} value={f.desa}>{f.desa}</option>)}
                </select>
                <DateRangeButton onChange={(range) => setDateRange(range)} />
            </div>
            <Pagination data={dataToDisplay} displayData={(paginatedData) => {
                return <table className="rounded text-sm w-full mt-4 overflow-hidden">
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
                        {paginatedData.map((d, idx) => {
                            let color: string;
                            if (d.status === 'Revisi') color = 'bg-yellow-200 border-yellow-500'
                            else if (d.status === 'Ditolak') color = 'bg-red-200 border-red-500'
                            else if (d.status === 'Baru') color = 'bg-sky-200 border-sky-500'
                            else color = 'bg-green-200 border-green-500'

                            return (
                                <tr key={d.id ?? idx}>
                                    <td className="border-2 border-neutral-100 px-2 py-3">{d.pic}</td>
                                    <td className="border-2 border-neutral-100 px-2 py-3">{d.kecamatan}</td>
                                    <td className="border-2 border-neutral-100 px-2 py-3">{d.desa}</td>
                                    <td className="border-2 border-neutral-100 px-2 py-3">{d.nama_dokumen}</td>
                                    <td className="border-2 border-neutral-100 px-2 py-3 ">
                                        <a target="_blank" href={`https://online.digitaldesa.id/uploads/${d.kode}/perencanaan-keuangan-desa/${d.url_dokumen}`} className="flex bg-neutral-200 mx-auto rounded text-sky-400 w-fit gap-x-2 px-2 py-1 cursor-pointer" rel="noopener noreferrer">
                                            <span>Lihat Berkas</span>
                                            <i className="bi bi-eye"></i>
                                        </a>
                                    </td>
                                    <td className="border-2 border-neutral-100 px-2 py-3">
                                        <JenisDokumenField jenis_dokumen={d.jenis_dokumen} tanggal_perubahan={dayjs(d.tanggal_perubahan).locale("id").format("D MMM YYYY")} />
                                    </td>
                                    <td className="border-2 border-neutral-100 px-2 py-3">
                                        <div className="flex justify-around items-center">
                                            <div className={`flex w-fit gap-x-1 items-center`}>
                                                <select
                                                    onChange={async (e) => {
                                                        const newStatus = e.target.value as "Revisi" | "Ditolak" | "Disetujui" | "Baru";
                                                        const isSuccess = await popup(newStatus, d);
                                                        if (isSuccess) {
                                                            dispatchAllData({ type: "ubah-status", payload: { id: d.id, status: newStatus } });
                                                        }
                                                    }}
                                                    value={d.status}
                                                    name="status"
                                                    className={`pl-3 pr-9 rounded border py-1 ${color}`}
                                                >
                                                    <option disabled value="Baru">Baru</option>
                                                    <option disabled value="Revisi">Revisi</option>
                                                    <option value="Disetujui">Disetujui</option>
                                                    <option value="Ditolak">Ditolak</option>
                                                </select>
                                            </div>
                                            <FaMessage onClick={() => {
                                                Swal.fire({
                                                    title: "Komentar",
                                                    text: d.komentar || "Tidak ada komentar",
                                                    icon: "info"
                                                });
                                            }} className={`text-sky-700 cursor-pointer`} size={20} />
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            }} />
        </div>
    );
}

function JenisDokumenField({ jenis_dokumen, tanggal_perubahan }: { jenis_dokumen: string; tanggal_perubahan: string }) {
    return (
        <div className="p-1 flex flex-col gap-y-3">
            <button className={`btn ${jenis_dokumen === "Perubahan" ? "bg-yellow-200" : "bg-emerald-200"} `}>{jenis_dokumen}</button>
            {jenis_dokumen === "Perubahan" && <span className="text-gray-700 text-center">{tanggal_perubahan}</span>}
        </div>
    );
}

const popup = async (status: "Revisi" | "Ditolak" | "Disetujui" | "Baru", data: dokumenDanPerencaanPartType) => {
    switch (status) {
        case "Ditolak":
            const res = await Swal.fire({
                title: "<strong>Ditolak</strong>",
                icon: "error",
                html: `<span>Masukkan Komentar : </span>`,
                input: 'textarea',
                showCloseButton: true,
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonText: `Submit`,
                confirmButtonAriaLabel: "Thumbs up, great!",
                cancelButtonText: `Cancel`,
                cancelButtonAriaLabel: "Thumbs down",
                preConfirm: async (inputValue) => {
                    const form = new FormData()
                    console.log(inputValue);
                    form.append('status', "Ditolak")
                    form.append('komentar', inputValue)
                    form.append('id_dokumen', data.id_dokumen)
                    form.append('kode_desa', data.kode)
                    form.append('id_pic', localStorage.getItem("id") || "")
                    try {
                        await AxiosAuth.post(`${BASE_API_URL}perencanaan/ChangeStatus`, form, { headers: { 'Content-Type': "application/x-www-form-urlencoded" } })
                        return "Berhasil ditolak"
                    } catch (error: any) {
                        return "Terjadi kesalahan saat menolak dokumen"
                    }
                },
            })

            await Swal.fire({
                title: res.isConfirmed ? res.value : "Proses penggantian status dibatalkan",
                icon: "info",
            });
            return res.isConfirmed

        case "Disetujui":
            const res2 = await Swal.fire({
                title: "<strong>Disetujui</strong>",
                icon: "success",
                html: `<span>Masukkan Komentar : </span>`,
                input: 'textarea',
                showCloseButton: true,
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonText: `Submit`,
                confirmButtonAriaLabel: "Thumbs up, great!",
                cancelButtonText: `Cancel`,
                cancelButtonAriaLabel: "Thumbs down",
                preConfirm: async (inputValue) => {
                    const form = new FormData()
                    form.append('status', "Disetujui")
                    form.append('komentar', inputValue)
                    form.append('id_dokumen', data.id_dokumen)
                    form.append('kode_desa', data.kode)
                    form.append('id_pic', localStorage.getItem("id") || "")
                    try {
                        await AxiosAuth.post(`${BASE_API_URL}perencanaan/ChangeStatus`, form, { headers: { 'Content-Type': "application/x-www-form-urlencoded" } })
                        return "Berhasil Disetujui"
                    } catch (error: any) {
                        return "Terjadi kesalahan saat menyetujui dokumen"
                    }
                },
            })

            await Swal.fire({
                title: res2.isConfirmed ? res2.value : "Proses penggantian status dibatalkan",
                icon: "info",
            });
            return res2.isConfirmed;
        default:
            return false
    }
}
