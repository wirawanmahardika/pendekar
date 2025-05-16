
import axios from "axios";
import { useEffect, useState } from "react";
import PageTitle from "../components/PageTitle";
import { BASE_API_URL } from "../utils/api";
import AdministrasiDataCard from "../components/administrasi/AdministrasiViewFilterAndCard";
import AdministrasiDataTable from "../components/administrasi/AdministrasiDataTable";
import LoadingDots from "../components/LoadingDots";
import useTitle from "../hooks/useTitle";

export default function AdministrasiUmum() {
  useTitle("Administrasi Umum")
  const [administrationData, setAdministrationData] = useState();
  const [administrationTypes, setAdministrationTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${BASE_API_URL}administrasi-umum?k3=&k4=`, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then(({ data: result }) => {
        const data = result.data;
        setAdministrationData(data);
        setAdministrationTypes(data.jenis_administrasi);
        setLastUpdated(data.last_updated);
      })
      .catch((error) => {
        alert(error.message);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <LoadingDots />;
  return (
    <div className="px-4 py-10">
      <PageTitle title="Administrasi Umum" last_updated={lastUpdated || ''} />
      {administrationData && <AdministrasiDataCard administrationData={administrationData} />}
      {administrationData && <AdministrasiDataTable administrationData={administrationData} administrationTypes={administrationTypes} />}
    </div>
  );
}
