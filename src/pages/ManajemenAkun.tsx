import { FaSearch } from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";
import DATAS from "../utils/datas";
import { LuSquarePen } from "react-icons/lu";
import { BiTrash } from "react-icons/bi";
import { BsArrowRepeat } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { useEffect, useState } from "react";
import useTitle from "../hooks/useTitle";
import { AxiosAuth } from "../utils/axios";
import { BASE_API_URL } from "../utils/api";
import { AkunType } from "../types/ManajemenAkunTypes";
import Swal from "sweetalert2";

export default function ManajemenAkun() {
    useTitle("Manajemen Akun")
    const [openFormTambah, setOpenFormTambah] = useState(false)
    const [akun, setAkun] = useState<AkunType[]>([])

    useEffect(() => {
        AxiosAuth.post(BASE_API_URL + "auth")
            .then(res => { setAkun(res.data.data) })
            .catch(err => { console.log(err) })
    }, [])

    const tambahAkun = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        formData.append("asdf", "admin");
        formData.forEach((value, key) => {
            console.log(`${key}: ${value}`);
        })

        AxiosAuth.post(BASE_API_URL + "auth/add", formData, { headers: { "Content-Type": "application/x-www-form-urlencoded" } })
            .then(res => {
                Swal.fire({
                    title: res.data.message,
                    icon: "success",
                    draggable: true
                })
            })
            .catch(err => {
                Swal.fire({
                    title: "Gagal menambahkan akun",
                    text: err.response?.data?.message || "Terjadi kesalahan",
                    icon: "error",
                    draggable: true
                })
            })
    }

    return <div className="p-3">
        <div className="shadow bg-white rounded p-5 flex flex-col gap-y-4">
            <div className="flex items-center justify-between w-full">
                <span className="font-bold text-xl">Manajemen Akun</span>
                <button onClick={() => setOpenFormTambah(true)} className="overflow-hidden text-white btn flex gap-x-3" style={{ backgroundColor: DATAS.theme.color_deep }}>
                    <IoMdPersonAdd />
                    Tambah Admin
                </button>
            </div>

            <div className="flex justify-end">
                <div className="relative">
                    <FaSearch className="absolute top-1/2 text-gray-800 z-10 -translate-y-1/2 left-3" size={16} />
                    <input type="search" className="input bg-gray-200 pl-10" placeholder="Cari PIC..." />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="text-black" style={{ backgroundColor: DATAS.theme.color_normal }}>
                            <th className="w-1/6">No</th>
                            <th className="w-1/6">Level</th>
                            <th className="w-2/6">Nama Lengkap</th>
                            <th className="w-2/6">Tindakan</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            akun.map((akun, idx) => {
                                return <tr key={akun.id}>
                                    <th>{idx + 1}</th>
                                    <td><span className="rounded px-2 py-1" style={{ backgroundColor: DATAS.theme.color_normal }}>{akun.level}</span></td>
                                    <td>{akun.fullname}</td>
                                    <td>
                                        <div className="flex gap-x-2 items-center">
                                            <button className="btn border-blue-500 text-blue-500"><BsArrowRepeat size={24} /> Reset Password</button>
                                            <button className="btn border-sky-400"><LuSquarePen className="stroke-sky-400" size={24} /></button>
                                            <button className="btn border-red-600"><BiTrash className="fill-red-600" size={24} /></button>
                                        </div>
                                    </td>
                                </tr>
                            })
                        }

                    </tbody>
                </table>
            </div>

            <div className="flex justify-end items-center gap-x-5">
                <span>Page</span>
                <select name="" className="select w-fit">
                    <option value="">1</option>
                    <option value="">2</option>
                    <option value="">3</option>
                    <option value="">4</option>
                </select>
                <span>of 10</span>
            </div>
        </div>


        <div className={`${!openFormTambah && "hidden"} fixed inset-0 backdrop-brightness-70`}>
            <div className="absolute top-1/2 left-1/2 -translate-1/2 bg-white rounded flex flex-col gap-y-3 p-5 w-1/5">
                <div className="flex w-full items-center">
                    <LuSquarePen />
                    <span className="ml-2 mr-auto font-normal">Tambah Admin</span>
                    <RxCross2 className="hover:text-red-500 cursor-pointer" size={20} onClick={() => setOpenFormTambah(false)} />
                </div>

                <hr className="border-none h-0.5 bg-gray-500 w-full" />

                <form onSubmit={tambahAkun} className="flex flex-col gap-y-5 mt-3">
                    <div className="flex flex-col gap-y-1">
                        <label className="text-sm">Username <sup className="text-red-500">*</sup></label>
                        <input type="text" name="username" className="input bg-yellow-100 w-full" required />
                    </div>
                    <div className="flex flex-col gap-y-1">
                        <label className="text-sm">Nama Lengkap <sup className="text-red-500">*</sup></label>
                        <input type="text" name="fullname" className="input bg-yellow-100 w-full" required />
                    </div>
                    <div className="flex flex-col gap-y-1">
                        <label className="text-sm">OPD <sup className="text-red-500">*</sup></label>
                        <input type="text" name="opd" className="input bg-yellow-100 w-full" required />
                    </div>
                    <div className="flex flex-col gap-y-1">
                        <label className="text-sm">Alamat Email</label>
                        <input type="email" name="email" className="input bg-yellow-100 w-full" />
                    </div>
                    <div className="flex flex-col gap-y-1">
                        <label className="text-sm">Nomor HP</label>
                        <input type="tel" name="phone" className="input bg-yellow-100 w-full" />
                    </div>
                    <div className="flex flex-col gap-y-1">
                        <label className="text-sm">Password</label>
                        <input type="password" name="password" className="input bg-yellow-100 w-full" />
                    </div>

                    <button className="btn btn-info w-fit ml-auto text-white">Simpan</button>
                </form>
            </div>

        </div>
    </div>
}