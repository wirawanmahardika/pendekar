import { useEffect, useState } from "react"
import { wisataCardType, wisataDataType } from "../../types/WisataTypes"
import { BASE_API_URL } from "../../utils/api"
import { AxiosAuth } from "../../utils/axios"

export default function useWisata() {
    const [loading, setIsLoading] = useState(true)
    const [dataWisata, setDataWisata] = useState<wisataDataType>()

    const [search, setSearch] = useState({ text: "", kecamatan: "", desa: "" })
    const [dataTodisplay, setDataToDisplay] = useState<wisataCardType[]>()

    useEffect(() => {
        AxiosAuth
            .get(`${BASE_API_URL}wisata?k3=&k4=&search=&limit=100`)
            .then((result) => {
                setDataWisata(result.data.data)
                setDataToDisplay(result.data.data.list_wisata)
            })
            .catch((error) => alert(error.message))
            .finally(() => setIsLoading(false))
    }, [])

    useEffect(() => {
        const listWisata = dataWisata?.list_wisata.filter(lb => {
            let status: boolean = true;
            if (search.kecamatan) status = status && lb.k3 === search.kecamatan
            if (search.desa) status = status && lb.k4 === search.desa
            if (search.text) status = status && lb.nama_deskel.toLowerCase().includes(search.text.toLowerCase())
            return status
        })
        setDataToDisplay(listWisata)
    }, [search])

    return {
        loading, search, setSearch, dataTodisplay, dataWisata
    }
}