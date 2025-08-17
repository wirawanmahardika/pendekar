
import PageTitle from "../components/PageTitle";
import AdministrasiDataCard from "../components/administrasi/AdministrasiViewFilterAndCard";
import AdministrasiDataTable from "../components/administrasi/AdministrasiDataTable";
import LoadingDots from "../components/LoadingDots";
import HeadHtml from "../components/HeadHtml";
import useAdministrasiUmum from "../hooks/administrasiUmum/useAdministrasiUmum";
import useAuth from "../hooks/useAuth";

export default function AdministrasiUmum() {
  useAuth()
  const { isLoading, lastUpdated, administrationData, administrationTypes } = useAdministrasiUmum()

  if (isLoading) return <LoadingDots />;
  return (
    <div className="px-4 py-10">
      <HeadHtml title="Administrasi Umum" />
      <PageTitle title="Administrasi Umum" last_updated={lastUpdated || ''} />
      {administrationData && <AdministrasiDataCard administrationData={administrationData} />}
      {administrationData && <AdministrasiDataTable administrationData={administrationData} administrationTypes={administrationTypes} />}
    </div>
  );
}
