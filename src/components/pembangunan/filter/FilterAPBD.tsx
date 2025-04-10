import React, { useMemo, useState } from "react";
import { formatCurrency } from '../../../utils/utils/formatter';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';

export interface FilterAPBDProps {
  resultData: {
    tahun: string;
    last_updated?: string;
    list_kecamatan: {
      kode_wilayah: string;
      nama_kecamatan: string;
      online?: string;
      [key: string]: any; // For dynamic properties like anggaran_2023, realisasi_2023, etc.
    }[];
    apbd: {
      desa: number;
      anggaran: number;
      realisasi: number;
      penyerapan: number;
    };
    list_desa?: any[];
    list_rkpdes?: any[];
  }
}

const FilterAPBD: React.FC<FilterAPBDProps> = (props) => {
  const { tahun, list_kecamatan } = props.resultData;
  const [selectedTahun, setSelectedTahun] = useState(tahun);
  
  // Determine if we're in kecamatan mode
  const getSlugType = () => {
    // Placeholder - replace with your actual implementation
    return "kabupaten";
  };
  
  const KODE_SLUG = "";
  
  // Filter on select kecamatan
  const [selectedKec, setSelectedKec] = useState(
    getSlugType() === "kecamatan"
      ? list_kecamatan.find(
          (k) =>
            k.nama_kecamatan.toLowerCase() ===
            KODE_SLUG.split("-")[0].toLowerCase()
        )?.kode_wilayah || ""
      : ""
  );

  // Memoized filtered kecamatan
  const filteredKec = useMemo(() => {
    if (getSlugType() === "kecamatan") {
      const kecamatanName = KODE_SLUG.split("-")[0];
      return list_kecamatan.filter(
        (k) => k.nama_kecamatan.toLowerCase() === kecamatanName.toLowerCase()
      );
    }
    return list_kecamatan;
  }, [list_kecamatan]);

  // Generate list of years
  const list_tahun = [];
  for (let year = parseInt(tahun); year > parseInt(tahun) - 3; year--) {
    list_tahun.push(year.toString());
  }

  // Calculate APBD data based on selections
  const APBD = useMemo(() => {
    let desa = 0;
    let anggaran = 0;
    let realisasi = 0;
    let penyerapan = 0;

    if (selectedTahun) {
      if (selectedKec) {
        const kec = list_kecamatan.find((d) => d.kode_wilayah === selectedKec);
        if (kec) {
          // Use nullish coalescing to handle undefined values
          desa = parseInt(kec.online ?? "0");
          anggaran = parseInt(String(kec[`anggaran_${selectedTahun}`] ?? 0));
          realisasi = parseInt(String(kec[`realisasi_${selectedTahun}`] ?? 0));
          penyerapan = parseFloat(String(kec[`penyerapan_${selectedTahun}`] ?? 0));
        }
      } else {
        list_kecamatan.forEach((d) => {
          desa += parseInt(d.online ?? "0");
          anggaran += parseInt(String(d[`anggaran_${selectedTahun}`] ?? 0));
          realisasi += parseInt(String(d[`realisasi_${selectedTahun}`] ?? 0));
        });
        penyerapan = anggaran > 0 ? parseFloat(((realisasi / anggaran) * 100).toFixed(2)) : 0;
      }
    }

    return {
      desa,
      anggaran,
      realisasi,
      penyerapan,
    };
  }, [list_kecamatan, selectedKec, selectedTahun]);

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="w-full md:w-1/4">
          <select
            value={selectedTahun}
            onChange={(e) => setSelectedTahun(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Select year"
          >
            {list_tahun.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        
        {/* Show "All Districts" option only if not in kecamatan mode */}
        {getSlugType() !== "kecamatan" && (
          <div className="w-full md:w-1/4">
            <select
              value={selectedKec}
              onChange={(e) => setSelectedKec(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Select district"
            >
              <option value="">Semua Kecamatan</option>
              {filteredKec.map((item) => (
                <option key={item.kode_wilayah} value={item.kode_wilayah}>
                  {item.nama_kecamatan}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <h6 className="text-sm text-gray-600 font-medium mb-2">JUMLAH DESA</h6>
          <div className="flex items-center">
            <div className="bg-blue-100 text-blue-600 p-2 rounded-full mr-3">
              <HiOutlineOfficeBuilding className="h-6 w-6" />
            </div>
            <h5 className="text-xl font-bold">{APBD.desa}</h5>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <h6 className="text-sm text-gray-600 font-medium mb-2">ANGGARAN</h6>
          <h5 className="text-xl font-bold">{formatCurrency(APBD.anggaran)}</h5>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <h6 className="text-sm text-gray-600 font-medium mb-2">REALISASI</h6>
          <h5 className="text-xl font-bold">{formatCurrency(APBD.realisasi)}</h5>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <h6 className="text-sm text-gray-600 font-medium mb-2">% PENYERAPAN</h6>
          <div className="w-full bg-gray-200 rounded-full h-4 mb-1">
            <div
              className="bg-blue-600 h-4 rounded-full text-xs text-white flex items-center justify-center"
              style={{ width: `${APBD.penyerapan}%` }}
            >
              {APBD.penyerapan}%
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterAPBD;