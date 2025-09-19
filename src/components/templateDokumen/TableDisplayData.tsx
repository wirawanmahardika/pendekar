import { FaSearch } from "react-icons/fa"
import { BASE_API_URL, KODE_SLUG } from "../../utils/api"
import { SetStateAction } from "react";
import { BiTrash } from "react-icons/bi";
import { IoEyeSharp } from "react-icons/io5";
import { PerencanaanDokumenType } from "../../types/templateDokumentypes";

type props = {
    filter: string;
    setFilter: React.Dispatch<SetStateAction<string>>;
    filteredDocuments: PerencanaanDokumenType[];
    handleDeleteDokumen: (id: string) => () => Promise<void>;
}

export default function TableDisplayDocuments({ filter, setFilter, filteredDocuments, handleDeleteDokumen }: props) {
    return <div className="flex flex-col bg-white rounded shadow p-5 mt-5">
        <div className="flex justify-between items-center ">
            <h2 className="font-semibold text-lg">Unggah Template Dokumen</h2>
            <div className="relative">
                <FaSearch className="absolute top-1/2 text-gray-800 z-10 -translate-y-1/2 left-3" size={16} />
                <input onChange={(e) => setFilter(e.target.value)} value={filter} type="search" className="input bg-gray-200 pl-10" placeholder="Cari Template..." />
            </div>
        </div>

        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 mt-6 overflow-y-auto">
            <table className="table text-center">
                <thead>
                    <tr className="text-black bg-sky-500">
                        <th className="w-1/12">No.</th>
                        <th className="w-1/12">Tahun</th>
                        <th className="w-8/12 text-left">Nama Dokumen</th>
                        <th className="w-2/12">Tindakan</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredDocuments.length !== 0 ? filteredDocuments.map((d, i) => {
                        return <tr key={i}>
                            <td>{i + 1}</td>
                            <td className="text-center">{d.tahun ?? "-"}</td>
                            <td className="text-left">{d.filename}</td>
                            <td>
                                <div className="flex gap-x-2 items-center">
                                    <a href={BASE_API_URL + 'uploads/' + KODE_SLUG + '/document_perencanaan/' + d.filename} download={true} className="btn border-blue-500 text-blue-500"><IoEyeSharp size={24} /> Lihat Berkas</a>
                                    <button onClick={handleDeleteDokumen(d.id)} className="btn border-red-500 text-red-500"><BiTrash size={24} /> Hapus</button>
                                </div>
                            </td>
                        </tr>
                    }) :
                        <tr>
                            <td colSpan={3} className="text-red-400 text-center font-bold">Belum ada dokumen</td>
                        </tr>}
                </tbody>
            </table>
        </div>
    </div>
}