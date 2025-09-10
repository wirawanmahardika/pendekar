import PageTitle from "../components/PageTitle";
import useAuth from "../hooks/useAuth";

// import components
import StatisticsSection from "../components/kependudukan/statistikKependudukan";
import PopulationTableSection from "../components/kependudukan/PopulasiTableSection";
import LoadingDots from "../components/LoadingDots";
import HeadHtml from "../components/HeadHtml";
import useKependudukan from "../hooks/kependudukan/useKependudukan";

export default function Kependudukan() {
  useAuth();
  const {
    kependudukanData,
    loading,
    filteredDesa,
    setSelectedKecamatan,
    selectedDesa,
    selectedKecamatan,
    availableDesaOptions,
    setSelectedDesa,
    setSearchText,
    searchText,
    currentPage,
    setCurrentPage,
    itemsPerPage,
  } = useKependudukan()

  if (loading) return <LoadingDots />;
  return (
    <div className="px-4 py-10">
      <HeadHtml title="Administrasi Kependudukan" />
      <PageTitle title="ADMINISTRASI KEPENDUDUKAN" last_updated={kependudukanData?.last_updated} />

      {/* Populasi Chart Section */}
      <StatisticsSection
        filteredDesa={filteredDesa}
        kecamatanList={kependudukanData?.list_kecamatan}
        selectedKecamatan={selectedKecamatan}
        setSelectedKecamatan={setSelectedKecamatan}
        selectedDesa={selectedDesa}
        setSelectedDesa={setSelectedDesa}
        availableDesaOptions={availableDesaOptions}
      />

      {/* Populasi Data Table Section */}
      <PopulationTableSection
        filteredDesa={filteredDesa}
        kecamatanList={kependudukanData?.list_kecamatan}
        selectedKecamatan={selectedKecamatan}
        setSelectedKecamatan={setSelectedKecamatan}
        selectedDesa={selectedDesa}
        setSelectedDesa={setSelectedDesa}
        searchText={searchText}
        setSearchText={setSearchText}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
        availableDesaOptions={availableDesaOptions}
      />
    </div>
  );
}
