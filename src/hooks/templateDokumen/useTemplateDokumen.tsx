import { useEffect, useState } from "react"
import { BASE_API_URL } from "../../utils/api"
import Swal from "sweetalert2"
import { AxiosAuth } from "../../utils/axios"
import { PerencanaanDokumenType } from "../../types/templateDokumentypes"

export default function useTemplateDokumen() {
    const [openFormTambah, setOpenFormTambah] = useState(false)

    const [documents, setDocuments] = useState<PerencanaanDokumenType[]>([])
    const [filteredDocuments, setFilteredDocuments] = useState<PerencanaanDokumenType[]>([])
    const [filter, setFilter] = useState('')

    const [modulType, setModulType] = useState<"APBDes" | "RKPDes" | "RPJMDes">('RPJMDes')
    const [loading, setLoading] = useState(true)

    useEffect(() => { 
        setLoading(true)
        AxiosAuth.get(BASE_API_URL + "perencanaan/get-document-perencanaan/" + modulType)
            .then(res => { setDocuments(res.data.data); setFilteredDocuments(res.data.data); setFilter('') })
            .finally(() => setLoading(false))
    }, [modulType])

    useEffect(() => {
        const idTimeout = setTimeout(() => {
            const data = documents.filter(d => d.filename.toLowerCase().includes(filter.toLocaleLowerCase()))
            setFilteredDocuments(data)
        }, 300);

        return () => clearTimeout(idTimeout)
    }, [filter, documents])

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

    return {
        openFormTambah, filteredDocuments, setModulType, loading, handleDeleteDokumen, setOpenFormTambah, setFilter, filter,
        modulType
    }
}