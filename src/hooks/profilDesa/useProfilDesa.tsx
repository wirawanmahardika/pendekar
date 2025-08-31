import { useEffect, useState } from "react";
import { AxiosAuth } from "../../utils/axios";
import { BASE_API_URL } from "../../utils/api";
import { desaProfilDesa, profilDesaDataType } from "../../types/ProfileDesaTypes";

export default function useProfilDesa() {
  const [search, setSearch] = useState({ text: "", kecamatan: "", desa: "" })
  const [dataTodisplay, setDataToDisplay] = useState<desaProfilDesa[]>()
  const [isLoading, setIsLoading] = useState(true);
  const [dataProfilDesa, setDataProfilDesa] = useState<profilDesaDataType>()

  useEffect(() => {
    AxiosAuth
      .get(`${BASE_API_URL}profil?k3=&k4=&search=`)
      .then((result) => {
        setDataProfilDesa(result.data.data)
        setDataToDisplay(result.data.data.list_desa)
      })
      .catch((error) => alert(error.message))
      .finally(() => setIsLoading(false))
  }, []);

  useEffect(() => {
    const listDesa = dataProfilDesa?.list_desa.filter(lb => {
      let status: boolean = true;
      if (search.kecamatan) status = status && lb.k3 === search.kecamatan
      if (search.desa) status = status && lb.k4 === search.desa
      if (search.text) status = status && lb.nama_deskel.toLowerCase().includes(search.text.toLowerCase())
      return status
    })
    setDataToDisplay(listDesa)
  }, [search])

  return {
    search, setSearch, dataTodisplay, isLoading, dataProfilDesa,
  }
}
