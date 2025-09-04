import PageTitle from "../components/PageTitle";
import useAuth from "../hooks/useAuth";
import TabelDesaKecamatan from "../components/profilDesa/TableDesaKecamatan";
import LoadingDots from "../components/LoadingDots";
import HeadHtml from "../components/HeadHtml";
import useProfilDesa from "../hooks/profilDesa/useProfilDesa";
import FilterProfilDesa from "../components/profilDesa/FilterProfilDesa";


export default function ProfilDesa() {
  useAuth()
  const { isLoading, dataProfilDesa, setSearch, search, dataTodisplay } = useProfilDesa()

  if (isLoading) return <LoadingDots />;
  return <div className="px-4 py-10">
    <HeadHtml title="Profil Desa" />
    <PageTitle title="PROFIL DESA/KELURAHAN" last_updated={dataProfilDesa?.last_updated} />
    <div className="p-4 bg-white rounded shadow mt-8">
      <FilterProfilDesa
        dataProfilDesa={dataProfilDesa}
        search={search}
        setSearch={setSearch}
      />
      <TabelDesaKecamatan data={dataTodisplay} />
    </div>
  </div>
}