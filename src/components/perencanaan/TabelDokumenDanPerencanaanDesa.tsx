import { FaMessage } from "react-icons/fa6";
import StatusChanger from "./StatusChanger";
import Swal from "sweetalert2";
import { useEffect, useState, useMemo, useCallback } from "react";
import { dataToDisplayPerencanaanType, TabelDokumenDanPerencanaanDesaSelectedFilterType } from "../../types/PerencanaanTypes";
import dayjs from "dayjs";
import createIdGenerator from "../../utils/idGenerator";
import Pagination from "../Pagination";

const getId = createIdGenerator();

export default function TabelDokumenDanPerencanaanDesa({ resultData }: { resultData: dataToDisplayPerencanaanType }) {
    const [dataToDisplay, setDataToDisplay] = useState<dataToDisplayPerencanaanType>([]);
    const [selectedFilter, setSelectedFilter] = useState<TabelDokumenDanPerencanaanDesaSelectedFilterType>({
        tahun: '',
        kecamatan: '',
        desa: ''
    });

    const filteredData = useMemo(() => {
        return resultData.filter(d => {
            let status = true;
            if (selectedFilter.tahun) status = status && selectedFilter.tahun === d.tahun.toString();
            if (selectedFilter.kecamatan) status = status && selectedFilter.kecamatan === d.kecamatan;
            if (selectedFilter.desa) status = status && selectedFilter.desa === d.desa;
            return status;
        });
    }, [resultData, selectedFilter]);


    useEffect(() => {
        setDataToDisplay(filteredData);
    }, [filteredData]);

    const tahunOptions = useMemo(() => {
        const tahun = [...new Set(resultData.map((d: any) => d.tahun))].sort();
        return tahun.map(t => ({tahun: t, id: getId()}))
    }, [resultData]);

    const kecamatanOptions = useMemo(() => {
        const filtered = selectedFilter.tahun
            ? resultData.filter(d => d.tahun.toString() === selectedFilter.tahun)
            : resultData;
        const kecamatan = [...new Set(filtered.map((d: any) => d.kecamatan))];
        return kecamatan.map(k => ({kecamatan: k, id: getId()}))
    }, [resultData, selectedFilter.tahun]);

    const desaOptions = useMemo(() => {
        let filtered = resultData;
        if (selectedFilter.tahun) {
            filtered = filtered.filter(d => d.tahun.toString() === selectedFilter.tahun);
        }
        if (selectedFilter.kecamatan) {
            filtered = filtered.filter(d => d.kecamatan === selectedFilter.kecamatan);
        }
        const desa = [...new Set(filtered.map((d: any) => d.desa))];
        return desa.map(d => ({desa: d, id: getId()}))
    }, [resultData, selectedFilter.tahun, selectedFilter.kecamatan]);

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
                <select value={selectedFilter.tahun} onChange={filterTahunChange} className="border-2 border-neutral-500 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-2">
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
                        {paginatedData.map((d, idx) => (
                            <tr key={d.id ?? idx}>
                                <td className="border-2 border-neutral-100 px-2 py-3">{d.pic}</td>
                                <td className="border-2 border-neutral-100 px-2 py-3">{d.kecamatan}</td>
                                <td className="border-2 border-neutral-100 px-2 py-3">{d.desa}</td>
                                <td className="border-2 border-neutral-100 px-2 py-3">{d.nama_dokumen}</td>
                                <td className="border-2 border-neutral-100 px-2 py-3">
                                    <a target="_blank" href={`https://online.digitaldesa.id/uploads/${d.kode}/perencanaan-keuangan-desa/${d.url_dokumen}`} className="flex bg-neutral-200 rounded text-sky-400 w-fit gap-x-2 px-2 py-1 cursor-pointer" rel="noopener noreferrer">
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
                        ))}
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
            <span className="text-gray-700">{tanggal_perubahan}</span>
        </div>
    );
}