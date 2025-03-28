import { useEffect, useState } from "react";
import useTitle from "../hooks/useTitle";

export default function Perencanaan() {
    useTitle('Perencanaan')
    return (
        <div className="p-4">
            <div className="bg-white p-5 rounded shadow">
                <span className="text-base font-bold">Monitoring Perencanaan Desa</span>
                <div className="grid grid-cols-3 gap-3 mb-16 mt-2">
                    <div className="bg-[#AEDDF5] p-3 rounded shadow-md text-[#056596] flex flex-col gap-y-1 py-4">
                        <div className="bg-white p-1 rounded-md text-center w-full font-semibold">Ringkasan Perencanaan Desa</div>

                        <div className="flex justify-between p-2">
                            <div className="flex p-1 gap-x-3 items-center">
                                <span className="text-4xl font-bold">38</span>
                                <div className="flex flex-col text-sm">
                                    <span>Desa</span>
                                    <span>Upload</span>
                                </div>
                            </div>

                            <div className="flex p-1 gap-x-3 items-center">
                                <span className="text-4xl font-bold">38</span>
                                <div className="flex flex-col text-sm">
                                    <span>Desa Belum</span>
                                    <span>Upload</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between">
                            <span className="font-bold">14 <span className="font-normal">Baru</span></span>
                            <span className="font-bold">36 <span className="font-normal">Disetujui</span></span>
                            <span className="font-bold">6 <span className="font-normal">Ditolak</span></span>
                        </div>
                    </div>

                    <div className="flex flex-col border rounded shadow-md">
                        <div className="flex flex-col p-3 w-full gap-y-2">
                            <span className="font-bold">Status Perencanaan</span>
                            <div className="flex justify-around w-full mt-2">
                                <div className="flex gap-x-2 items-center">
                                    <span className="bg-yellow-400 rounded-full size-3"></span>
                                    <span className="text-sm">Baru</span>
                                </div>
                                <div className="flex gap-x-2 items-center">
                                    <span className="bg-green-400 rounded-full size-3"></span>
                                    <span className="text-sm">Disetujui</span>
                                </div>
                                <div className="flex gap-x-2 items-center">
                                    <span className="bg-red-400 rounded-full size-3"></span>
                                    <span className="text-sm">Ditolak</span>
                                </div>

                            </div>
                        </div>
                        <div className="grid grid-cols-3 h-1/2 justify-items-center mt-auto">
                            <div className="flex flex-col w-2/3">
                                <span className="text-center text-sm">14 Desa</span>
                                <div className="bg-yellow-400 h-2/3 rounded-top w-2/3 mx-auto mt-auto"></div>
                            </div>
                            <div className="flex flex-col w-2/3">
                                <span className="text-center text-sm">36 Desa</span>
                                <div className="bg-green-400 h-full rounded-top w-2/3 mx-auto mt-auto"></div>
                            </div>
                            <div className="flex flex-col w-2/3">
                                <span className="text-center text-sm">5 Desa</span>
                                <div className="bg-red-400 h-1/6 rounded-top w-2/3 mx-auto mt-auto"></div>
                            </div>
                        </div>

                    </div>

                    <div className="flex flex-col border p-5 rounded shadow-md gap-y-3">
                        <span className="font-bold">Persentase Dokumen Yang Diunggah</span>

                        <div className="flex justify-between">
                            <div className="flex gap-x-2 items-center">
                                <span className="bg-sky-400 rounded-full size-3"></span>
                                <span className="text-sm">RPJMD</span>
                            </div>
                            <div className="flex gap-x-2 items-center">
                                <span className="bg-orange-400 rounded-full size-3"></span>
                                <span className="text-sm">RPJMD</span>
                            </div>
                            <div className="flex gap-x-2 items-center">
                                <span className="bg-emerald-400 rounded-full size-3"></span>
                                <span className="text-sm">RPJMD</span>
                            </div>
                        </div>

                        <div className="flex justify-between">
                            <svg className="size-16" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="40" stroke="#e5e7eb" stroke-width="10" fill="none" />
                                <circle cx="50" cy="50" r="40" stroke="#008DF9" stroke-width="10" fill="none"
                                    stroke-dasharray="188.4 251.2" stroke-linecap="round" transform="rotate(-90 50 50)" />
                                <text x="50" y="55" text-anchor="middle" font-size="14" font-weight="bold" fill="#333">75%</text>
                            </svg>

                            <svg className="size-16" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="40" stroke="#e5e7eb" stroke-width="10" fill="none" />
                                <circle cx="50" cy="50" r="40" stroke="#FF8000" stroke-width="10" fill="none"
                                    stroke-dasharray="113 251.2" stroke-linecap="round" transform="rotate(-90 50 50)" />
                                <text x="50" y="55" text-anchor="middle" font-size="14" font-weight="bold" fill="#333">45%</text>
                            </svg>

                            <svg className="size-16" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="40" stroke="#e5e7eb" stroke-width="10" fill="none" />
                                <circle cx="50" cy="50" r="40" stroke="#06D97D" stroke-width="10" fill="none"
                                    stroke-dasharray="226.08 251.2" stroke-linecap="round" transform="rotate(-90 50 50)" />
                                <text x="50" y="55" text-anchor="middle" font-size="14" font-weight="bold" fill="#333">90%</text>
                            </svg>
                        </div>

                    </div>
                </div>

                <span className="text-base font-bold">Daftar Desa & Dokumen Ditolak</span>
                <div className="flex gap-x-5 pt-2">
                    <select name="" className="border-2 border-neutral-500 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-2">
                        <option value="">Pilih Tahun</option>
                        <option value="">Pilih Tahun</option>
                        <option value="">Pilih Tahun</option>
                    </select>

                    <select name="" className="border-2 border-neutral-500 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-2">
                        <option value="">Semua Kecamatan</option>
                        <option value="">Semua Kecamatan</option>
                        <option value="">Semua Kecamatan</option>
                    </select>

                    <select name="" className="border-2 border-neutral-500 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-2">
                        <option value="">Pilih Desa</option>
                        <option value="">Pilih Desa</option>
                        <option value="">Pilih Desa</option>
                    </select>


                </div>
                <table className="rounded text-sm w-full mt-4 overflow-hidden">
                    <thead>
                        <tr className="bg-[#AEDDF5] text-gray-700">
                            <th className="border-2 border-gray-100 text-center w-1/5 py-2">Nama Kecamatan</th>
                            <th className="border-2 border-gray-100 text-center w-1/5 py-2">Nama Desa</th>
                            <th className="border-2 border-gray-100 text-center w-1/5 py-2">Status</th>
                            <th className="border-2 border-gray-100 text-center w-2/5 py-2">Dokumen Kurang</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-neutral-200 px-2 py-3">Manggala</td>
                            <td className="border border-neutral-200 px-2 py-3">Surantih</td>
                            <td className="border border-neutral-200 px-2 py-3">
                                <span className="bg-red-300 border border-red-500 rounded px-3 py-1">Ditolak</span>
                            </td>
                            <td className="border border-neutral-200 px-2 py-3">APB Des, RKP Des</td>
                        </tr>
                        <tr>
                            <td className="border border-neutral-200 px-2 py-3">Manggala</td>
                            <td className="border border-neutral-200 px-2 py-3">Surantih</td>
                            <td className="border border-neutral-200 px-2 py-3">
                                <span className="bg-red-300 border border-red-500 rounded px-3 py-1">Ditolak</span>
                            </td>
                            <td className="border border-neutral-200 px-2 py-3">APB Des, RKP Des</td>
                        </tr>
                        <tr>
                            <td className="border border-neutral-200 px-2 py-3">Manggala</td>
                            <td className="border border-neutral-200 px-2 py-3">Surantih</td>
                            <td className="border border-neutral-200 px-2 py-3">
                                <span className="bg-red-300 border border-red-500 rounded px-3 py-1">Ditolak</span>
                            </td>
                            <td className="border border-neutral-200 px-2 py-3">APB Des, RKP Des</td>
                        </tr>
                    </tbody>
                </table>
                <div className="flex mt-9">
                    <div className="flex gap-x-4 items-center ml-auto">
                        <span>Page</span>
                        <select name="" id="" className="border-2 border-neutral-200 rounded-lg text-neutral-800 outline-none pl-2 pr-1 py-1">
                            <option value="">1</option>
                            <option className="bg-red-600" value="">2</option>
                            <option value="">3</option>
                        </select>
                        <span>of 10</span>
                    </div>
                </div>
            </div>

            <div className="bg-white p-5 mt-10 rounded shadow">
                <span className="text-base font-bold">Tabel Dokumen dan Perencanaan Desa</span>
                <div className="flex gap-x-5 pt-2">
                    <select name="" className="border-2 border-neutral-500 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-2">
                        <option value="">Pilih Tahun</option>
                        <option value="">Pilih Tahun</option>
                        <option value="">Pilih Tahun</option>
                    </select>

                    <select name="" className="border-2 border-neutral-500 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-2">
                        <option value="">Semua Kecamatan</option>
                        <option value="">Semua Kecamatan</option>
                        <option value="">Semua Kecamatan</option>
                    </select>

                    <select name="" className="border-2 border-neutral-500 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-2">
                        <option value="">Pilih Desa</option>
                        <option value="">Pilih Desa</option>
                        <option value="">Pilih Desa</option>
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
                        <tr>
                            <td className="border-2 border-neutral-100 px-2 py-3">Manggala</td>
                            <td className="border-2 border-neutral-100 px-2 py-3">Surantih</td>
                            <td className="border-2 border-neutral-100 px-2 py-3">Rencana Pembangunan Jangka Mengengah Desa</td>
                            <td className="border-2 border-neutral-100 px-2 py-3">
                                <div className="flex bg-neutral-200 rounded text-sky-400 w-fit gap-x-2 px-2 py-1">
                                    <span>Lihat Berkas</span>
                                    <i className="bi bi-eye"></i>
                                </div>
                            </td>
                            <td className="border-2 border-neutral-100 px-2 py-3">
                                <div className="flex justify-around gap-x-2 items-center">
                                    <StatusChanger defaultStatus="ditolak" />
                                    <img className="cursor-pointer" src="/img/icon/message-add.svg" alt="message" />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="border-2 border-neutral-100 px-2 py-3">Manggala</td>
                            <td className="border-2 border-neutral-100 px-2 py-3">Surantih</td>
                            <td className="border-2 border-neutral-100 px-2 py-3">Rencana Pembangunan Jangka Mengengah Desa</td>
                            <td className="border-2 border-neutral-100 px-2 py-3">
                                <div className="flex bg-neutral-200 rounded text-sky-400 w-fit gap-x-2 px-2 py-1">
                                    <span>Lihat Berkas</span>
                                    <i className="bi bi-eye"></i>
                                </div>
                            </td>
                            <td className="border-2 border-neutral-100 px-2 py-3">
                                <div className="flex justify-around gap-x-2 items-center">
                                    <StatusChanger defaultStatus="disetujui" />
                                    <img className="cursor-pointer" src="/img/icon/message-add.svg" alt="message" />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="border-2 border-neutral-100 px-2 py-3">Manggala</td>
                            <td className="border-2 border-neutral-100 px-2 py-3">Surantih</td>
                            <td className="border-2 border-neutral-100 px-2 py-3">Rencana Pembangunan Jangka Mengengah Desa</td>
                            <td className="border-2 border-neutral-100 px-2 py-3">
                                <div className="flex bg-neutral-200 rounded text-sky-400 w-fit gap-x-2 px-2 py-1">
                                    <span>Lihat Berkas</span>
                                    <i className="bi bi-eye"></i>
                                </div>
                            </td>
                            <td className="border-2 border-neutral-100 px-2 py-3">
                                <div className="flex justify-around gap-x-2 items-center">
                                    <StatusChanger defaultStatus="baru" />
                                    <img className="cursor-pointer" src="/img/icon/message-add.svg" alt="message" />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>


    );
};

const StatusChanger = ({ defaultStatus }: { defaultStatus: "baru" | "ditolak" | "disetujui" }) => {
    const [status, setStatus] = useState(defaultStatus)
    const [color, setColor] = useState('bg-yellow-200 border-yellow-500')

    useEffect(() => {
        if (status === 'baru') setColor('bg-yellow-200 border-yellow-500')
        else if (status === 'ditolak') setColor('bg-red-200 border-red-500')
        else setColor('bg-green-200 border-green-500')
    }, [status])

    return <div className={`flex ${color} border rounded w-fit gap-x-1 items-center`}>
        <select onChange={(e: any) => setStatus(e.target.value)} name="status" id="" className="px-3 py-1">
            <option selected={status === 'baru'} value="baru">Baru</option>
            <option selected={status === 'disetujui'} value="disetujui">Disetujui</option>
            <option selected={status === 'ditolak'} value="ditolak">Ditolak</option>
        </select>
    </div>
}
