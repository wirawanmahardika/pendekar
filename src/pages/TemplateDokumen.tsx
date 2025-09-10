import { FaSearch } from "react-icons/fa";
import { IoCloudUploadOutline, IoEyeSharp } from "react-icons/io5";
import { BiTrash } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { useEffect, useState } from "react";
import { useAuthSuperAdmin } from "../hooks/useAuth";
import HeadHtml from "../components/HeadHtml";
import { STRINGS } from "../utils/strings";
import { BASE_API_URL, KODE_SLUG } from "../utils/api";
import { AxiosAuth } from "../utils/axios";
import Swal from "sweetalert2";
import LoadingDots from "../components/LoadingDots";

export interface PerencanaanDokumenType {
    filename: string;
    iat: string;
    id: string;
    k1: string;
    k2: string;
    k3: string;
    k4: string;
    modul: string;
    uat: string;
}


export default function TemplateDokumen() {
    useAuthSuperAdmin()
    const [openFormTambah, setOpenFormTambah] = useState(false)

    const [filter, setFilter] = useState('')
    const [documents, setDocuments] = useState<PerencanaanDokumenType[]>([])
    const [filteredDocument, setFilteredDocument] = useState<PerencanaanDokumenType[]>([])

    const [modulType, setModulType] = useState<"APBDes" | "RKPDes" | "RPJMDes">('RPJMDes')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        AxiosAuth.get(BASE_API_URL + "perencanaan/get-document-perencanaan/" + modulType)
            .then(res => { setDocuments(res.data.data); setFilteredDocument(res.data.data) })
            .finally(() => setLoading(false))
    }, [modulType])

    const handleDeleteDokumen = (id: string) => async () => {
        try {
            const res = await AxiosAuth.post(BASE_API_URL + 'perencanaan/delete-document-perencanaan/' + id)
            setDocuments(prev => prev.filter(d => d.id !== id))
            Swal.fire({
                text: res.data.message,
                title: "Sukses",
                icon: "success"
            })
        } catch (error) {
            Swal.fire({ icon: 'error', text: "Tidak dapat hapus dokumen, terjadi kesalahan", title: "Error" })
        }
    }

    if (loading) return <LoadingDots />
    return <div className="p-3">
        <HeadHtml title="Template Dokumen" />
        <div className="flex bg-white rounded shadow p-5 justify-between items-center">
            <div role="tablist" className="tabs tabs-border font-semibold">
                <a role="tab" onClick={() => setModulType('RPJMDes')} className={`${modulType === "RPJMDes" && "tab-active"} tab text-lg text-sky-600`}>RPJMDes</a>
                <a role="tab" onClick={() => setModulType('RKPDes')} className={`${modulType === "RKPDes" && "tab-active"} tab text-lg text-sky-600`}>RKPDes</a>
                <a role="tab" onClick={() => setModulType('APBDes')} className={`${modulType === "APBDes" && "tab-active"} tab text-lg text-sky-600`}>APBDes</a>
            </div>
            <button onClick={() => setOpenFormTambah(true)} className="btn text-white" style={{ backgroundColor: STRINGS[KODE_SLUG].theme.color_deep }}>Unggah Template</button>
        </div>
        <div className="flex flex-col bg-white rounded shadow p-5 mt-5">
            <div className="flex justify-between items-center ">
                <h2 className="font-semibold text-lg">Unggah Template Dokumen</h2>
                <div className="relative">
                    <FaSearch className="absolute top-1/2 text-gray-800 z-10 -translate-y-1/2 left-3" size={16} />
                    <input onChange={(e) => setFilter(e.target.value)} type="search" className="input bg-gray-200 pl-10" placeholder="Cari Template..." />
                </div>
            </div>

            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 mt-6 overflow-y-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="text-black bg-sky-500">
                            <th className="w-1/12">No.</th>
                            <th className="w-9/12">Nama Dokumen</th>
                            <th className="w-2/12">Tindakan</th>
                        </tr>
                    </thead>
                    <tbody>
                        {documents.length !== 0 ? documents.map((d, i) => {
                            return <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{d.filename}</td>
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


        <div className={`${!openFormTambah && "hidden"} fixed inset-0 backdrop-brightness-70`}>
            <div className="absolute top-1/2 left-1/2 -translate-1/2 bg-white rounded flex flex-col gap-y-3 p-5 w-1/4">
                <div className="flex w-full items-center">
                    <IoCloudUploadOutline />
                    <span className="ml-2 mr-auto font-normal">Unggah Template</span>
                    <RxCross2 className="hover:text-red-500 cursor-pointer" size={20} onClick={() => setOpenFormTambah(false)} />
                </div>

                <hr className="border-none h-0.5 bg-gray-500 w-full" />

                <form onSubmit={async (e) => {
                    e.preventDefault()
                    const formData = new FormData(e.currentTarget)

                    try {
                        const res = await AxiosAuth.post(BASE_API_URL + 'perencanaan/post-document-perencanaan/' + KODE_SLUG, formData)
                        Swal.fire({ icon: 'success', text: res.data.message, title: "Sukses" })
                    } catch (error) {
                        console.log(error);
                        Swal.fire({ icon: 'error', text: "Tidak dapat upload dokumen, terjadi kesalahan", title: "Error" })
                    }
                }} className="flex flex-col gap-y-5 mt-3">
                    <div className="flex flex-col gap-y-1">
                        <label className="text-sm">Filename <sup className="text-red-500">*</sup></label>
                        <input type="text" name="filename" className="input bg-yellow-100 w-full" />
                    </div>
                    <div className="flex flex-col gap-y-1">
                        <label className="text-sm">Upload File <sup className="text-red-500">*</sup></label>
                        <input type="file" name="document_perencanaan" className="file-input bg-yellow-100 w-full" accept=".pdf" />
                        <span className="text-xs font-light">Format File PDF Max 15</span>
                    </div>
                    <div className="flex flex-col gap-y-1">
                        <label className="text-sm">Kategori Dokumen <sup className="text-red-500">*</sup></label>
                        <div className="flex gap-x-4">
                            <div className="p-3 bg-yellow-100 rounded flex items-center gap-x-3 w-fit">
                                <input type="radio" value={"rpjmdes"} name="modul" className="radio radio-warning" />
                                <span className="text-xs">RPJMDes</span>
                            </div>
                            <div className="p-3 bg-yellow-100 rounded flex items-center gap-x-3 w-fit">
                                <input type="radio" value={'rkpdes'} name="modul" className="radio radio-warning" />
                                <span className="text-xs">RKPDes</span>
                            </div>
                            <div className="p-3 bg-yellow-100 rounded flex items-center gap-x-3 w-fit">
                                <input type="radio" value={'apbdes'} name="modul" className="radio radio-warning" />
                                <span className="text-xs">APBDes</span>
                            </div>
                        </div>
                    </div>

                    <button className="btn btn-info w-fit ml-auto text-white">Simpan</button>
                </form>
            </div>

        </div>
    </div>
}