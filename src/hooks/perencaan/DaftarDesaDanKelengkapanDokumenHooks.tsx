import { useEffect, useState } from "react"
import { AxiosAuth } from "../../utils/axios"
import { BASE_API_URL } from "../../utils/api"
import { DesaOption, KecamatanOption } from "../../types/perencaan/DaftarDesaDanKelengkapanDokumentTypes"

export const useGetTahunFilter = () => {
  const [tahun, setTahun] = useState<string[]>([])

  useEffect(() => {
    AxiosAuth.post(BASE_API_URL + "perencanaan/GetOption", new URLSearchParams({ type: "tahun" })).then(res => setTahun(res.data.data))
  }, [])
  return tahun
}

export const useGetKecamatanFilter = () => {
  const [kecamatan, setKecamatan] = useState<KecamatanOption[]>([])
  useEffect(() => {
    AxiosAuth.post(BASE_API_URL + "perencanaan/GetOption", new URLSearchParams({ type: "kecamatan" })).then(res => setKecamatan(res.data.data))
  }, [])
  return kecamatan
}

export const useGetInitialDesaFilter = () => {
  const [desaOptions, setDesaOptions] = useState<DesaOption[]>([]);
  
  useEffect(() => {
    AxiosAuth.post(BASE_API_URL + "perencanaan/GetOption", new URLSearchParams({ type: "deskel" })).then(res => setDesaOptions(res.data.data))
  }, [])
  return { desaOptions, setDesaOptions }
}
