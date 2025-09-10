import Swal from "sweetalert2";
import { AxiosAuth } from "../axios";
import { BASE_API_URL } from "../api";
import { manajemenAkunActionType } from "../../hooks/manajemenAkun/reducer";

export default async function hapusAkun(id: number, dispatch: React.ActionDispatch<[action: manajemenAkunActionType]>) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-error"
        },
        buttonsStyling: false
    });

    const swalFire = await swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
    })

    if (swalFire.isConfirmed) {
        try {
            const formData = new FormData();
            formData.append("id", id.toString());
            const res = await AxiosAuth.post(BASE_API_URL + "auth/delete", formData, { headers: { "Content-Type": "application/x-www-form-urlencoded" } });
            dispatch({ type: "delete", payload: id })
            swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: res.data.message,
                icon: "success"
            });
        } catch (error) {
            swalWithBootstrapButtons.fire({
                title: "Cancelled",
                text: "Gagal menghapus akun",
                icon: "error"
            });
        }
    }
}