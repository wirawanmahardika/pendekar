import { useEffect, useState, useMemo } from "react";

// import components
import { BASE_API_URL } from "../../utils/api";
import { AxiosAuth } from "../../utils/axios";
import { KependudukanData } from "../../types/administrasi/KependudukanTypes";

export default function useKependudukan() {
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

    return {
        loading,
        selectedDesa,
        filteredDesa,
        setSelectedDesa,
        setSelectedKecamatan,
        selectedKecamatan,
        searchText,
        setSearchText,
        currentPage,
        setCurrentPage,
        itemsPerPage,
        availableDesaOptions,
        kependudukanData
    }
}