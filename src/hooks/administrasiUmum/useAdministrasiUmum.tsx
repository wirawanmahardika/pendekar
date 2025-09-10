import { useEffect, useState } from "react";
import { BASE_API_URL } from "../../utils/api";
import { AxiosAuth } from "../../utils/axios";

export default function useAdministrasiUmum() {
    const [administrationData, setAdministrationData] = useState();
    const [administrationTypes, setAdministrationTypes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [lastUpdated, setLastUpdated] = useState("");

    useEffect(() => {
        setIsLoading(true);
        AxiosAuth.get(`${BASE_API_URL}administrasi-umum?k3=&k4=`)
            .then(({ data: result }) => {
                const data = result.data;
                setAdministrationData(data);
                setAdministrationTypes(data.jenis_administrasi);
                setLastUpdated(data.last_updated);
            })
            .catch((error) => { alert(error.message); })
            .finally(() => setIsLoading(false));
    }, []);

    return {
        administrationData,
        administrationTypes,
        isLoading,
        lastUpdated,
    }
}