import { useEffect, useState } from "react"
import { beritaCardType, beritaDataType } from "../../types/BeritaTypes"
import { AxiosAuth } from "../../utils/axios"
import { BASE_API_URL } from "../../utils/api"

export default function useBerita() {
    const [loading, setIsLoading] = useState(false)
    const [resultData, setResultData] = useState<beritaDataType>()
    const [search, setSearch] = useState({ text: "", kecamatan: "", desa: "" })
    const [dataTodisplay, setDataToDisplay] = useState<beritaCardType[]>()


    useEffect(() => {
        AxiosAuth
            .get(`${BASE_API_URL}berita?k3=&k4=&search=&limit=`)
            .then((result) => {
                setIsLoading(false)
                setDataToDisplay(result.data.data.list_berita)
                setResultData(result.data.data)
            })
            .catch((error) => alert(error.message))
            .finally(() => setIsLoading(false));
    }, [])

    useEffect(() => {
        const listBerita = resultData?.list_berita.filter(lb => {
            let status: boolean = true;
            if (search.kecamatan) status = status && lb.nama_kecamatan === search.kecamatan
            if (search.desa) status = status && lb.nama_desa === search.desa
            if (search.text) status = status && lb.nama_desa.toLowerCase().includes(search.text.toLowerCase())
            return status
        })
        setDataToDisplay(listBerita)
    }, [search])

    return {
        loading, dataTodisplay, setSearch,
        resultData, search
    }
}