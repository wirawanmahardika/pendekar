import { FaSearch } from "react-icons/fa";
import DATAS from "../utils/datas";
import { IoCloudUploadOutline, IoEyeSharp } from "react-icons/io5";
import { BiTrash } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
import useTitle from "../hooks/useTitle";

export default function TemplateDokumen() {
    useTitle("Template Dokumen")
    const [openFormTambah, setOpenFormTambah] = useState(false)

    return <div className="p-3">
        <div className="flex bg-white rounded shadow p-5 justify-between items-center">
            <div role="tablist" className="tabs tabs-border font-semibold">
                <a role="tab" className="tab text-lg tab-active text-sky-600">RPJMDes</a>
                <a role="tab" className="tab text-lg text-sky-600">RPJMDes</a>
                <a role="tab" className="tab text-lg text-sky-600">RPJMDes</a>
            </div>
            <button onClick={() => setOpenFormTambah(true)} className="btn text-white" style={{ backgroundColor: DATAS.theme.color_deep }}>Unggah Template</button>
        </div>
        <div className="flex flex-col bg-white rounded shadow p-5 mt-5">
            <div className="flex justify-between items-center ">
                <h2 className="font-semibold text-lg">Unggah Template Dokumen</h2>
                <div className="relative">
                    <FaSearch className="absolute top-1/2 text-gray-800 z-10 -translate-y-1/2 left-3" size={16} />
                    <input type="search" className="input bg-gray-200 pl-10" placeholder="Cari Template..." />
                </div>
            </div>

            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 mt-6 overflow-y-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="text-black bg-sky-500">
                            <th>No.</th>
                            <th className="w-2/5">Nama Dokumen</th>
                            <th className="w-2/5">Tindakan</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>1</th>
                            <td>Quality Control Specialist</td>
                            <td>
                                <div className="flex gap-x-2 items-center">
                                    <button className="btn border-blue-500 text-blue-500"><IoEyeSharp size={24} /> Lihat Berkas</button>
                                    <button className="btn border-red-500 text-red-500"><BiTrash size={24} /> Hapus</button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>1</th>
                            <td>Quality Control Specialist</td>
                            <td>
                                <div className="flex gap-x-2 items-center">
                                    <button className="btn border-blue-500 text-blue-500"><IoEyeSharp size={24} /> Lihat Berkas</button>
                                    <button className="btn border-red-500 text-red-500"><BiTrash size={24} /> Hapus</button>
                                </div>
                            </td>
                        </tr>
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

                <form action="" className="flex flex-col gap-y-5 mt-3">
                    <div className="flex flex-col gap-y-1">
                        <label className="text-sm">Upload File <sup className="text-red-500">*</sup></label>
                        <input type="file" className="file-input bg-yellow-100 w-full" />
                        <span className="text-xs font-light">Format File PDF Max 20MB</span>
                    </div>
                    <div className="flex flex-col gap-y-1">
                        <label className="text-sm">Kategori Dokumen <sup className="text-red-500">*</sup></label>
                        <div className="flex gap-x-4">
                            <div className="p-3 bg-yellow-100 rounded flex items-center gap-x-3 w-fit">
                                <input type="radio" name="dokumen" className="radio radio-warning" />
                                <span className="text-xs">RPJMD</span>
                            </div>
                            <div className="p-3 bg-yellow-100 rounded flex items-center gap-x-3 w-fit">
                                <input type="radio" name="dokumen" className="radio radio-warning" />
                                <span className="text-xs">RPJMD</span>
                            </div>
                            <div className="p-3 bg-yellow-100 rounded flex items-center gap-x-3 w-fit">
                                <input type="radio" name="dokumen" className="radio radio-warning" />
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