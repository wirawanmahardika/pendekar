import { FaSearch } from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";
import { LuSquarePen } from "react-icons/lu";
import { BiTrash } from "react-icons/bi";
import { BsArrowRepeat } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { KODE_SLUG } from "../utils/api";
import { useAuthSuperAdmin } from "../hooks/useAuth";
import HeadHtml from "../components/HeadHtml";
import { STRINGS } from "../utils/strings";
import LoadingDots from "../components/LoadingDots";
import hapusAkun from "../utils/manajemenAkun/hapusAkun";
import KelolaAkun from "../components/manajemenAkun/KelolaAkun";
import { ManajemenAkunPagination } from "../utils/manajemenAkun/pagination";
import useManajamenAkun from "../hooks/manajemenAkun/useManajemenAkun";

export default function ManajemenAkun() {
    useAuthSuperAdmin()
    const {
        setOpenFormKelola, setFormMode, setSearchQuery, searchQuery,
        paginatedAkun, loading, setOpenChangePassword, dispatch, resetPassword, setAkunToUpdate, setIdChangePassword,
        currentPage, setCurrentPage, akunToUpdate, openChangePassword, openFormKelola, totalPages, formMode
    } = useManajamenAkun()

    if (loading) return <LoadingDots />
    return <div className="p-3">
        <HeadHtml title="Manajemen Akun" />
        <div className="shadow bg-white rounded p-5 flex flex-col gap-y-4">
            <div className="flex items-center justify-between w-full">
                <span className="font-bold text-xl">Manajemen Akun</span>
                <button onClick={() => { setOpenFormKelola(true); setFormMode("add") }} className="overflow-hidden text-white btn flex gap-x-3" style={{ backgroundColor: STRINGS[KODE_SLUG].theme.color_deep }}>
                    <IoMdPersonAdd />
                    Tambah Admin
                </button>
            </div>

            <div className="flex justify-end">
                <div className="relative">
                    <FaSearch className="absolute top-1/2 text-gray-800 z-10 -translate-y-1/2 left-3" size={16} />
                    <input
                        type="search"
                        className="input bg-gray-200 pl-10"
                        placeholder="Cari PIC..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr className="text-black" style={{ backgroundColor: STRINGS[KODE_SLUG].theme.color_normal }}>
                            <th className="w-1/6">No</th>
                            <th className="w-1/6">Level</th>
                            <th className="w-1/6">Nama Lengkap</th>
                            <th className="w-3/6 text-center">Tindakan</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedAkun.map((akun, idx) => {
                            return <tr key={akun.id}>
                                <th>{idx + 1}</th>
                                <td><span className="rounded px-2 py-1" style={{ backgroundColor: STRINGS[KODE_SLUG].theme.color_normal }}>{akun.level}</span></td>
                                <td>{akun.fullname}</td>
                                <td>
                                    <div className="flex gap-x-2 items-center justify-center">
                                        <button onClick={() => { setIdChangePassword(akun.id); setOpenChangePassword(true) }} className="btn border-blue-500 text-blue-500"><BsArrowRepeat size={24} /> Change Password</button>
                                        <button onClick={() => {
                                            setFormMode("update");
                                            setAkunToUpdate(akun)
                                            setOpenFormKelola(true);
                                        }} className="btn border-sky-400"><LuSquarePen className="stroke-sky-400" size={24} /></button>
                                        <button onClick={async () => await hapusAkun(akun.id, dispatch)} className="btn border-red-600"><BiTrash className="fill-red-600" size={24} /></button>
                                    </div>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>

            <ManajemenAkunPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>

        <KelolaAkun formMode={formMode} akunToUpdate={akunToUpdate} openFormKelola={openFormKelola} setOpenFormKelola={setOpenFormKelola} dispatch={dispatch} />
        <div className={`${!openChangePassword && "hidden"} fixed inset-0 backdrop-brightness-70`}>
            <div className="absolute top-1/2 left-1/2 -translate-1/2 bg-white rounded flex flex-col gap-y-3 p-5 w-1/5">
                <div className="flex w-full items-center">
                    <LuSquarePen />
                    <span className="ml-2 mr-auto font-normal">Change Password</span>
                    <RxCross2 className="hover:text-red-500 cursor-pointer" size={20} onClick={() => setOpenChangePassword(false)} />
                </div>

                <hr className="border-none h-0.5 bg-gray-500 w-full" />

                <form onSubmit={resetPassword} className="flex flex-col gap-y-5 mt-3">
                    <div className="flex flex-col gap-y-1">
                        <label className="text-sm">Password <sup className="text-red-500">*</sup></label>
                        <input type="password" name="password" className="input bg-yellow-100 w-full" required />
                    </div>

                    <button className="btn btn-info w-fit ml-auto text-white">Ganti</button>
                </form>
            </div>
        </div>
    </div>
}
