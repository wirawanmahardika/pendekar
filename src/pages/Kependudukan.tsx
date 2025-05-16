import { useEffect, useState, useMemo } from "react";
import PageTitle from "../components/PageTitle";
import useAuth from "../hooks/useAuth";
import { AxiosAuth } from "../utils/axios";
import { BASE_API_URL } from "../utils/api";

// import components
import { KependudukanData } from "../types/administrasi/KependudukanTypes";
import StatisticsSection from "../components/kependudukan/statistikKependudukan";
import PopulationTableSection from "../components/kependudukan/PopulasiTableSection";
import LoadingDots from "../components/LoadingDots";
import useTitle from "../hooks/useTitle";

export default function Kependudukan() {
    useAuth();
    useTitle("Kependudukan")
    
    const [loading, setLoading] = useState<boolean>(true);
    const [kependudukanData, setKependudukanData] = useState<KependudukanData | null>(null);
    const [selectedKecamatan, setSelectedKecamatan] = useState<string>("");
    const [selectedDesa, setSelectedDesa] = useState<string>("");
    const [searchText, setSearchText] = useState<string>("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Fetch data
    useEffect(() => {
      AxiosAuth(`${BASE_API_URL}kependudukan?k3=&k4=`).then(({ data: result }) => {
        setKependudukanData(result.data);
        // console.log(result.data)
      }).catch(err => {
        console.error("Error fetching data:", err);
      }).finally(() => setLoading(false));
    }, []);

    // Memoize filtered desa data based on filters
    const filteredDesa = useMemo(() => {
      if (!kependudukanData) return [];

      let filtered = [...kependudukanData.list_desa];
      
      if (selectedKecamatan) {
        filtered = filtered.filter(desa => desa.k3 === selectedKecamatan);
      }
      
      if (selectedDesa) {
        filtered = filtered.filter(desa => desa.k4 === selectedDesa);
      }
      
      if (searchText) {
        filtered = filtered.filter(desa => 
          desa.nama_deskel.toLowerCase().includes(searchText.toLowerCase())
        );
      }
      
      return filtered;
    }, [kependudukanData, selectedKecamatan, selectedDesa, searchText]);

    const availableDesaOptions = useMemo(() => {
      if (!kependudukanData || !selectedKecamatan) return [];
      
      return kependudukanData.list_desa
        .filter(desa => desa.k3 === selectedKecamatan)
        .map(desa => ({
          value: desa.k4,
          label: desa.nama_deskel
        }));
    }, [kependudukanData, selectedKecamatan]);

    useEffect(() => {
      setCurrentPage(1);
    }, [selectedKecamatan, selectedDesa, searchText]);
    if (loading) return <LoadingDots />;
    return (
      <div className="px-4 py-10">
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
