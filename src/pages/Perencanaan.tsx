import useTitle from "../hooks/useTitle";
import StatusChanger from "../components/perencanaan/StatusChanger";
import { FaMessage } from "react-icons/fa6";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import PageTitle from "../components/PageTitle";
import MonitoringPerencanaan from "../components/perencanaan/MonitoringPerencanaan";
import DaftarPenolakanPerencanaan from "../components/perencanaan/DaftarPenolakanPerencanaan";

export default function Perencanaan() {
    useAuth()
    useTitle('Perencanaan')

    return (
        <div className="p-4">
            <PageTitle title="Perencanaan" />

           <MonitoringPerencanaan />
           <DaftarPenolakanPerencanaan />

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
                                <div className="flex justify-around items-center">
                                    <StatusChanger defaultStatus="ditolak" />
                                    <FaMessage onClick={() => {
                                        Swal.fire({
                                            title: "Komentar",
                                            text: "Ini merupakan komentar yang diberikan oleh operator",
                                            icon: "info"
                                          });
                                    }} className="cursor-pointer text-sky-700" size={20} />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};
