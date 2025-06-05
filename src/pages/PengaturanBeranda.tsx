import bupati_konawe from "../assets/profil/bupati_konawe.jpg";
import HeadHtml from "../components/HeadHtml";
import { useAuthSuperAdmin } from "../hooks/useAuth";

export default function PengaturanBeranda() {
    useAuthSuperAdmin()
    return <div className="p-6 bg-white">
        <HeadHtml title="Pengaturan Beranda" />
        <div className="p-6">
            <div className="max-w-7xl items-center mx-auto shadow rounded p-4">
                <span className="font-bold text-lg">Edit Foto Pejabat</span>

                <div className="grid grid-cols-2 gap-x-10 mt-4">
                    <div className="col-span-1 shadow rounded p-4 bg-gray-100">
                        <div className="rounded p-4 mb-4">
                            <div className="relative w-full h-90 bg-gray-200 rounded overflow-hidden">
                                <img 
                                    src={bupati_konawe} 
                                    alt="Preview" 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex justify-between mt-4">
                                <button className="bg-gray-400 text-gray-700 px-4 py-2 rounded flex justify-center gap-x-2 w-full">
                                    <span>Unggah Foto</span>
                                </button>
                                <button className="text-red-500 px-4 py-2 rounded">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Form Inputs */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Nama</label>
                                <input 
                                    value={"Bapak Jamal S.pd, M.Pd, M.si, M.kom"}
                                    type="text"
                                    className="mt-1 block w-full text-gray-500 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="Masukkan nama"
                                    disabled
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Jabatan</label>
                                <input 
                                    value={"Bupati Konawe"}
                                    type="text"
                                    className="mt-1 block w-full text-gray-500 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="Masukkan jabatan"
                                    disabled
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Profile Info */}
                    <div className="col-span-1 shadow rounded p-4 bg-gray-100">
                        <div className="rounded p-4 mb-4">
                            <div className="w-full h-90 bg-gray-200 rounded flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-25 h-25 text-gray-400">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                </svg>
                            </div>
                            <button className="w-full bg-blue-500 text-white px-4 py-2 rounded mt-4">
                                Unggah Foto
                            </button>
                        </div>

                        {/* Form Inputs */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Nama</label>
                                <input 
                                    type="text"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="Masukkan nama"
                                    disabled
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Jabatan</label>
                                <input 
                                    type="text"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="Masukkan jabatan"
                                    disabled
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end mt-4 py-6">
                    <button className="bg-blue-500 text-white px-6 py-2 rounded">
                        Simpan
                    </button>
                </div>
            </div>
        </div>
    </div>
}
