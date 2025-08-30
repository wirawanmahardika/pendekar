import { useMemo, useState, Fragment } from "react";
import DataTable from "react-data-table-component";
import { formatCurrency } from "../../../utils/formatter";

interface KecamatanData {
  nama_kecamatan: string;
  anggaran_2023: number;
  realisasi_2023: number;
  sisa_2023: number;
  kode_wilayah: string;
  k1: number;
  k2: number;
  k3: number;
}

interface APBDTableProps {
  dataPembangunan?: {
    list_kecamatan: KecamatanData[];
  };
  showFilters?: boolean;
}

// Generate fake data for the table
const generateFakeData = (): KecamatanData[] => {
  const kecamatanNames = [
    "Bogor Barat", "Bogor Selatan", "Bogor Tengah", "Bogor Timur", "Bogor Utara",
    "Tanah Sareal", "Ciawi", "Cibinong", "Cileungsi", "Ciomas",
    "Cisarua", "Dramaga", "Gunung Putri", "Jasinga", "Kemang"
  ];

  return kecamatanNames.map((name, index) => {
    const k1 = 3;
    const k2 = Math.floor(index / 10) + 1;
    const k3 = (index % 10) + 1;

    const anggaran = Math.floor(Math.random() * 10000000000) + 10000000000;
    const realisasi = Math.floor(Math.random() * anggaran);
    const sisa = anggaran - realisasi;

    return {
      nama_kecamatan: name,
      anggaran_2023: anggaran,
      realisasi_2023: realisasi,
      sisa_2023: sisa,
      kode_wilayah: `${k1}.${k2.toString().padStart(2, "0")}.${k3.toString().padStart(2, "0")}`,
      k1,
      k2,
      k3
    };
  });
};

const APBDTable = (props: APBDTableProps) => {
  // Use fake data if no data is provided
  const fakeData = useMemo(() => generateFakeData(), []);
  const list_kecamatan = props.dataPembangunan?.list_kecamatan || fakeData;
  const { showFilters = true } = props;

  // Filter on select kecamatan
  const [selectedKec, setSelectedKec] = useState("");

  // Memoized filtered kecamatan
  const filteredKec = useMemo(() => {
    return list_kecamatan;
  }, [list_kecamatan]);

  const [query, setQuery] = useState("");

  const rows = useMemo(() => {
    let data = list_kecamatan;
    if (selectedKec !== "" && selectedKec !== "0") {
      data = data.filter((item) => {
        const itemKec = `${item.k1}.${item.k2
          .toString()
          .padStart(2, "0")}.${item.k3.toString().padStart(2, "0")}`;

        return itemKec === selectedKec;
      });
    }

    if (query !== "" && query !== "0") {
      data = data.filter((item) => {
        return item.nama_kecamatan.toLowerCase().includes(query.toLowerCase());
      });
    }

    return data;
  }, [list_kecamatan, selectedKec, query]);

  const customStyles = {
    headCells: {
      style: {
        fontSize: "14px",
        fontWeight: "bold",
        backgroundColor:"#EBF5FF", // Tailwind blue-100 (lighter blue) or "#3B82F6", // Tailwind blue-500
        borderRight: "1px solid #EDEDED",
        borderTop: "1px solid #EDEDED",
      },
    },
    cells: {
      style: {
        fontSize: "14px",
        borderRight: "1px solid #EDEDED",
      },
    },
  };

  return (
    <Fragment>
      {showFilters && (
        <div className="grid grid-cols-12 gap-4 mb-4">
          <div className="col-span-3">
            <div className="relative">
              <input
                type="text"
                name="query"
                placeholder="Cari Kecamatan..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setQuery(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>
          </div>

          <div className="col-span-3">
            <select
              onChange={(e) => setSelectedKec(e.target.value)}
              defaultValue="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Pilih Kecamatan"
            >
              <option value="">Semua Kecamatan</option>
              {filteredKec.map((item, key) => (
                <option key={key} value={item.kode_wilayah}>
                  {item.nama_kecamatan}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
      <DataTable
        columns={[
          {
            name: "No",
            selector: (_, rowIndex: number = 0) => rowIndex + 1,
            width: "60px",
            style: {
              borderLeft: "1px solid #EDEDED",
            },
          },
          {
            name: "Kecamatan",
            sortable: true,
            selector: (row: KecamatanData) => row.nama_kecamatan,
            wrap: true,
          },
          {
            name: "Anggaran",
            sortable: true,
            selector: (row: KecamatanData) => formatCurrency(row.anggaran_2023),
            wrap: true,
          },
          {
            name: "Realisasi",
            sortable: true,
            selector: (row: KecamatanData) => formatCurrency(row.realisasi_2023),
            wrap: true,
          },
          {
            name: "Sisa",
            sortable: true,
            selector: (row: KecamatanData) => formatCurrency(row.sisa_2023),
            wrap: true,
          },
        ]}
        data={rows}
        customStyles={customStyles}
        pagination
      />
    </Fragment>
  );
};

export default APBDTable;
