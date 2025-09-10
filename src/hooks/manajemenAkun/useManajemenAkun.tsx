import { useEffect, useReducer, useState } from "react";
import Swal from "sweetalert2";
import manajemenAkunReducer from "./reducer";
import { BASE_API_URL } from "../../utils/api";
import { AxiosAuth } from "../../utils/axios";
import { AkunType } from "../../types/ManajemenAkunTypes";

export default function useManajamenAkun() {
    const [loading, setIsLoading] = useState(true)
    const [openFormKelola, setOpenFormKelola] = useState(false)
    const [akun, dispatch] = useReducer(manajemenAkunReducer, [])
    const [formMode, setFormMode] = useState<"add" | "update">("add")
    const [akunToUpdate, setAkunToUpdate] = useState<AkunType | null>(null)
    const [idChangePassword, setIdChangePassword] = useState<number | null>(null);
    const [openChangePassword, setOpenChangePassword] = useState(false);

    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const filteredAkun = akun.filter(a => a.fullname.toLowerCase().includes(searchQuery.toLowerCase()));

    const totalPages = Math.ceil(filteredAkun.length / itemsPerPage);
    const paginatedAkun = filteredAkun.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, akun]);

    useEffect(() => {
        AxiosAuth.post(BASE_API_URL + "auth")
            .then(res => { dispatch({ type: "fill", payload: res.data.data }); })
            .catch(err => { console.log(err) })
            .finally(() => setIsLoading(false))
    }, [])

    const resetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        formData.append("id", idChangePassword?.toString() || "0");
        try {
            const res = await AxiosAuth.post(BASE_API_URL + "auth/ChangePassword", formData, { headers: { "Content-Type": "application/x-www-form-urlencoded" } })
            Swal.fire({
                title: res.data.message,
                icon: "success",
                draggable: true
            })
        } catch (err: any) {
            Swal.fire({
                title: "Gagal mereset password",
                text: err.response?.data?.message || "Terjadi kesalahan",
                icon: "error",
                draggable: true
            })
        }
        setOpenChangePassword(false);
    }


    return {
        setFormMode, setOpenFormKelola, setSearchQuery, resetPassword,
        searchQuery, paginatedAkun, loading, setIdChangePassword, setOpenChangePassword,
        setAkunToUpdate, dispatch, currentPage, setCurrentPage, totalPages, itemsPerPage,
        akunToUpdate, openChangePassword, openFormKelola, formMode
    }
}