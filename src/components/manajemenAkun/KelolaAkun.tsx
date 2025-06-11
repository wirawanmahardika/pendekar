import Swal from "sweetalert2";
import { BASE_API_URL } from "../../utils/api";
import { AxiosAuth } from "../../utils/axios";
import { LuSquarePen } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import { AkunType } from "../../types/ManajemenAkunTypes";
import createIdGenerator from "../../utils/idGenerator";
import { manajemenAkunActionType } from "../../hooks/manajemenAkun/reducer";

const getId = createIdGenerator()
export default function KelolaAkun(
    { formMode,
        akunToUpdate,
        openFormKelola,
        setOpenFormKelola,
        dispatch
    }:
        {
            formMode: "add" | "update",
            akunToUpdate: AkunType | null,
            openFormKelola: boolean,
            setOpenFormKelola: React.Dispatch<React.SetStateAction<boolean>>,
            dispatch: React.ActionDispatch<[action: manajemenAkunActionType]>
        }
) {

    const kelolaAkun = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newAkun: AkunType = {
            email: formData.get("email")?.toString() ?? "",
            fullname: formData.get("fullname")?.toString() ?? "",
            level: formData.get("level")?.toString() ?? "admin",
            opd: formData.get("opd")?.toString() ?? "",
            username: formData.get("username")?.toString() ?? "",
            phone: formData.get("phone")?.toString() ?? "",
            id: getId(),
        }

        if (formMode === "update" && akunToUpdate) {
            formData.append("id", akunToUpdate.id.toString())
            try {
                const res = await AxiosAuth.post(BASE_API_URL + "auth/update", formData, { headers: { "Content-Type": "application/x-www-form-urlencoded" } })
                dispatch({ type: "update", payload: newAkun})
                Swal.fire({
                    title: res.data.message,
                    icon: "success",
                    draggable: true
                })
            } catch (err: any) {
                Swal.fire({
                    title: "Gagal mengupdate akun",
                    text: err.response?.data?.message || "Terjadi kesalahan",
                    icon: "error",
                    draggable: true
                })
            }
            return
        }

        try {

            const res = await AxiosAuth.post(BASE_API_URL + "auth/add", formData, { headers: { "Content-Type": "application/x-www-form-urlencoded" } })
            dispatch({ type: "add", payload: newAkun })
            Swal.fire({
                title: res.data.message,
                icon: "success",
                draggable: true
            })
        } catch (err: any) {
            Swal.fire({
                title: "Gagal menambahkan akun",
                text: err.response?.data?.message || "Terjadi kesalahan",
                icon: "error",
                draggable: true
            })
        }
    }

    return <div className={`${!openFormKelola && "hidden"} fixed inset-0 backdrop-brightness-70`}>
        <div className="absolute top-1/2 left-1/2 -translate-1/2 bg-white rounded flex flex-col gap-y-3 p-5 w-1/5">
            <div className="flex w-full items-center">
                <LuSquarePen />
                <span className="ml-2 mr-auto font-normal">{formMode === "add" ? "Tambah Admin" : "Update Admin"}</span>
                <RxCross2 className="hover:text-red-500 cursor-pointer" size={20} onClick={() => setOpenFormKelola(false)} />
            </div>

            <hr className="border-none h-0.5 bg-gray-500 w-full" />

            <form onSubmit={kelolaAkun} className="flex flex-col gap-y-5 mt-3">
                <div className="flex flex-col gap-y-1">
                    <label className="text-sm">Username <sup className="text-red-500">*</sup></label>
                    <input type="text" defaultValue={formMode === "update" ? akunToUpdate?.username : ""} name="username" className="input bg-yellow-100 w-full" required />
                </div>
                <div className="flex flex-col gap-y-1">
                    <label className="text-sm">Nama Lengkap <sup className="text-red-500">*</sup></label>
                    <input type="text" defaultValue={formMode === "update" ? akunToUpdate?.fullname : ""} name="fullname" className="input bg-yellow-100 w-full" required />
                </div>

                {formMode === "add" && <div className="flex flex-col gap-y-1">
                    <label className="text-sm">OPD <sup className="text-red-500">*</sup></label>
                    <input type="text" name="opd" className="input bg-yellow-100 w-full" required />
                </div>}

                <div className="flex flex-col gap-y-1">
                    <label className="text-sm">Alamat Email</label>
                    <input type="email" defaultValue={formMode === "update" ? akunToUpdate?.email : ""} name="email" className="input bg-yellow-100 w-full" />
                </div>
                <div className="flex flex-col gap-y-1">
                    <label className="text-sm">Nomor HP</label>
                    <input type="tel" defaultValue={formMode === "update" ? akunToUpdate?.phone : ""} name="phone" className="input bg-yellow-100 w-full" />
                </div>

                {formMode === "add" && <div className="flex flex-col gap-y-1">
                    <label className="text-sm">Password <sup className="text-red-500">*</sup></label>
                    <input type="password" name="password" className="input bg-yellow-100 w-full" required />
                </div>}

                <button className="btn btn-info w-fit ml-auto text-white">Simpan</button>
            </form>
        </div>

    </div>
}

