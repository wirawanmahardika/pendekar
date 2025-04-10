import { useEffect, useState } from "react";
import { AxiosAuth } from "../../utils/axios";
import { BASE_API_URL } from "../../utils/api";
import { DesaProfilDesa } from "../../types/ProfileDesaTypes";

export default function useSetDataToDisplayProfilDesa(search: {kecamatan: string, text: string}) {
  const [dataToDisplay, setDataToDisplay] = useState<DesaProfilDesa[]>([])

  useEffect(() => {
    const idTimeout = setTimeout(() => {
      AxiosAuth
        .get(`${BASE_API_URL}profil?k3=${search.kecamatan}&k4=&search=${search.text}`)
        .then((result) => {
          const data = result.data.data;
          setDataToDisplay(data.list_desa)
        })
        .catch((error) => {
          alert(error.message);
        })

    }, 500);
    return () => clearTimeout(idTimeout)
  }, [search]);

  return dataToDisplay
}