import { useEffect, useState } from "react"
import { BASE_API_URL } from "../../utils/api"
import Swal from "sweetalert2"
import { AxiosAuth } from "../../utils/axios"
import { PerencanaanDokumenType } from "../../types/templateDokumentypes"

export default function useTemplateDokumen() {
    const [openFormTambah, setOpenFormTambah] = useState(false)

    const [documents, setDocuments] = useState<PerencanaanDokumenType[]>([])
    const [filteredDocuments, setFilteredDocuments] = useState<PerencanaanDokumenType[]>([])
    const [filter, setFilter] = useState<{ search: string; tahun: string } | null>(null)
    const [optionsFilterTahun, setOptionsFilterTahun] = useState<string[]>([])

    const [modulType, setModulType] = useState<"APBDes" | "RKPDes" | "RPJMDes">('RPJMDes')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        AxiosAuth.get(BASE_API_URL + "perencanaan/get-document-perencanaan/" + modulType)
            .then(res => {
                const optionsTahun = [...new Set(res.data.data.map((d: PerencanaanDokumenType) => (d.tahun)))].filter((d) => !!d) as string[]
                setOptionsFilterTahun(optionsTahun)
                setDocuments(res.data.data);
                setFilteredDocuments(res.data.data);
                setFilter({ tahun: "", search: "" })
            })
            .finally(() => setLoading(false))
    }, [modulType])

    useEffect(() => {
        const idTimeout = setTimeout(() => {
            const data = documents.filter(d => {
                let status = true
                if (filter?.search) status = status && d.filename.toLowerCase().includes(filter.search.toLocaleLowerCase())
                if (filter?.tahun && d.tahun) status = status && d.tahun.includes(filter.tahun)
                return status
            })
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
        modulType, optionsFilterTahun
    }
}