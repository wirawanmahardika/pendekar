import { BiSearch } from "react-icons/bi";
import { tableHeaderStyle } from "../../utils/themeSetting";
import ExportReportButton from "../ExportReportButton";
import { useMemo, useState } from "react";
import { BASE_API_URL, getSlugType, KODE_SLUG } from "../../utils/api";
import { formatIndonesianDate } from "../../utils/formatter";
import { IAdministrasiType } from "../../types/administrasi/AdministrasiTypes";

const AdministrasiDataTable = (props: any) => {
  const { jenis_administrasi, list_kecamatan, list_desa, list_administrasi } =
    props.administrationData;

  const [selectedType, setSelectedType] = useState<IAdministrasiType>(
    jenis_administrasi[0].key
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Melakukan filter pada select kecamatan
  const [selectedKec, setSelectedKec] = useState(
    getSlugType() === "kecamatan"
      ? list_kecamatan.find(
          (kec: any) =>
            kec.nama_kecamatan.toLowerCase() ===
            KODE_SLUG.split("-")[0].toLowerCase()
        )?.kode_wilayah || ""
      : ""
  );
  const [selectedDesa, setSelectedDesa] = useState("");
  const [query, setQuery] = useState("");

  const listDeskel = useMemo(() => {
    setSelectedDesa(""); // Reset selectedDesa ketika selectedKec berubah
    if (selectedKec) {
      return list_desa.filter((d: any) =>
        d.kode_wilayah.startsWith(selectedKec)
      );
    }
    return [];
  }, [list_desa, selectedKec]);

  const listKec = useMemo(() => {
    return list_kecamatan;
  }, [list_kecamatan]);

  const filteredKec = useMemo(() => {
    if (getSlugType() === "kecamatan") {
      const kecamatanName = KODE_SLUG.split("-")[0];
      return list_kecamatan.filter(
        (k: any) =>
          k.nama_kecamatan.toLowerCase() === kecamatanName.toLowerCase()
      );
    }
    return listKec;
  }, [listKec, list_kecamatan]);

  const createCommonColumns = () => [
    {
      name: "No",
      cell: (_row: any, index: any) => index + 1,
    },
    {
      name: "Kecamatan",
      selector: (row: any) => row.nama_kecamatan,
    },
    {
      name: "Desa",
      selector: (row: any) => row.nama_deskel,
    },
    {
      name: "Tanggal Input",
      selector: (row: any) => formatIndonesianDate(row.tanggal_input),
    },
  ];

  const columnConfigs = useMemo(() => ({
    buku_peraturan_di_desa: [
      ...createCommonColumns(),
      {
        name: "Jenis Peraturan",
        selector: (row: any) => row.jenis_peraturan,
      },
      {
        name: "Nomor Peraturan",
        selector: (row: any) => row.nomor_peraturan,
      },
      {
        name: "Tanggal Peraturan",
        selector: (row: any) => formatIndonesianDate(row.tanggal_peraturan),
      },
      {
        name: "Tentang",
        selector: (row: any) => row.tentang,
      },
      {
        name: "Lampiran",
        selector: (row: any) => row.lampiran,
        cell: (row: any) => {
          if (!row.lampiran) return null;
          return (
            <a
              href={`https://online.digitaldesa.id/uploads/${row.kode_wilayah}/buku-peraturan-di-desa/${row.lampiran}`}
              rel="noreferrer"
              target="_blank"
              className="rounded px-4 py-2 bg-indigo-200 hover:bg-indigo-500 hover:text-white cursor-pointer"
            >
              Download
            </a>
          );
        },
      },
    ],
    buku_keputusan_kepala_desa: [
      ...createCommonColumns(),
      {
        name: "Nomor Keputusan",
        selector: (row: any) => row.nomor_keputusan,
      },
      {
        name: "Tanggal Keputusan",
        selector: (row: any) => formatIndonesianDate(row.tanggal_keputusan),
      },
      {
        name: "Tentang",
        selector: (row: any) => row.tentang,
      },
      {
        name: "Lampiran",
        selector: (row: any) => row.lampiran,
        cell: (row: any) => {
          if (!row.lampiran) return null;
          return (
            <a
              href={`https://online.digitaldesa.id/uploads/${row.kode_wilayah}/buku-keputusan-kepala-desa/${row.lampiran}`}
              rel="noreferrer"
              target="_blank"
              className="rounded m-2 px-4 py-2 bg-indigo-200 hover:bg-indigo-500 hover:text-white cursor-pointer"
            >
              Download
            </a>
          );
        },
      },
    ],
    buku_inventaris_dan_kekayaan_desa: [
      ...createCommonColumns(),
      {
        name: "Tahun",
        selector: (row: any) => row.tahun,
      },
      {
        name: "Jenis Barang",
        selector: (row: any) => row.jenis_barang,
      },
      {
        name: "Nilai Beli",
        selector: (row: any) => row.nilai_beli,
      },
      {
        name: "Tanggal Penghapusan",
        selector: (row: any) => formatIndonesianDate(row.tanggal_penghapusan),
      },
    ],
    buku_aparat_pemerintah_desa: [
      ...createCommonColumns(),
      {
        name: "Nama",
        selector: (row: any) => row.nama,
      },
      {
        name: "NIP",
        selector: (row: any) => row.nip,
      },
      {
        name: "Jabatan",
        selector: (row: any) => row.jabatan,
      },
      {
        name: "Tanggal Pengangkatan",
        selector: (row: any) => formatIndonesianDate(row.tanggal_pengangkatan),
      },
      {
        name: "Tanggal Pemberhentian",
        selector: (row: any) => formatIndonesianDate(row.tanggal_pemberhentian),
        width: "220px",
      },
    ],
    buku_tanah_kas_desa: [
      ...createCommonColumns(),
      {
        name: "Asal Tanah",
        selector: (row: any) => row.asal_tanah,
      },
      {
        name: "Nomor Sertifikat",
        selector: (row: any) => row.nomor_sertifikat,
      },
      {
        name: "Luas",
        selector: (row: any) => row.luas,
      },
      {
        name: "Kelas",
        selector: (row: any) => row.kelas,
      },
      {
        name: "Tanggal Perolehan",
        selector: (row: any) => formatIndonesianDate(row.tanggal_perolehan),
        width: "200px",
      },
    ],
    buku_tanah_di_desa: [
      ...createCommonColumns(),
      {
        name: "Nama",
        selector: (row: any) => row.nama,
      },
      {
        name: "Luas Tanah",
        selector: (row: any) => row.luas_tanah,
      },
      {
        name: "Status Tanah",
        selector: (row: any) => row.status_tanah,
      },
      {
        name: "Penggunaan Tanah",
        selector: (row: any) => row.penggunaan_tanah,
        width: "200px",
      },
    ],
    buku_agenda: [
      ...createCommonColumns(),
      {
        name: "Kode Surat",
        selector: (row: any) => row.kode_surat,
      },
      {
        name: "Tanggal",
        selector: (row: any) => formatIndonesianDate(row.tanggal),
      },
      {
        name: "Jenis",
        selector: (row: any) => row.jenis,
      },
      {
        name: "Nomor Surat",
        selector: (row: any) => row.nomor_surat,
      },
      {
        name: "Pelaku Surat",
        selector: (row: any) => row.pelaku_surat,
      },
    ],
    buku_ekspedisi: [
      ...createCommonColumns(),
      {
        name: "Tanggal Pengiriman",
        selector: (row: any) => formatIndonesianDate(row.tanggal_pengiriman),
      },
      {
        name: "Nomor Surat",
        selector: (row: any) => row.nomor_surat,
      },
      {
        name: "Ditujukan Kepada",
        selector: (row: any) => row.ditujukan_kepada,
      },
    ],
    buku_lembaran_desa_dan_berita_desa: [
      ...createCommonColumns(),
      {
        name: "Jenis Peraturan",
        selector: (row: any) => row.jenis_peraturan,
      },
      {
        name: "Nomor Peraturan",
        selector: (row: any) => row.nomor_peraturan,
      },
      {
        name: "Tanggal Peraturan",
        selector: (row: any) => formatIndonesianDate(row.tanggal_peraturan),
      },
      {
        name: "Tentang",
        selector: (row: any) => row.tentang,
      },
    ],
  }), []);

  const DATA = useMemo(() => {
    const selectedData = list_administrasi[selectedType] || [];

    const data = selectedData.filter((desa: any) => {
      if (query !== "") {
        if (desa.nama_deskel.toLowerCase().indexOf(query.toLowerCase()) > -1) {
          return true;
        } else {
          return false;
        }
      }
      if (selectedKec && selectedDesa) {
        return desa.kode_wilayah === selectedDesa;
      } else if (selectedKec) {
        let kode_kec = `${desa.k1}.${desa.k2
          .toString()
          .padStart(2, "0")}.${desa.k3.toString().padStart(2, "0")}`;
        return kode_kec === selectedKec;
      } else {
        return true;
      }
    });

    return [columnConfigs[selectedType], data];
  }, [selectedType, selectedKec, selectedDesa, query, list_administrasi]);

  const currentItems = DATA[1].slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(DATA[1].length / itemsPerPage);
  

  return (
    <div className="p-4 bg-white rounded shadow mt-8">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-xl">Tabel Data Administrasi</h2>
        <div className="flex gap-x-2">
          {selectedType === "buku_aparat_pemerintah_desa" ? (
            <button
              type="button"
              className="rounded bg-blue-300 px-4 py-2 hover:!bg-neutral-300 cursor-pointer"
              onClick={() =>
                window.open(
                  `${BASE_API_URL}export/rekapitulasi_buku_aparat_pemerintah_desa`
                )
              }
            >
              Rekap Data
            </button>
          ) : (
            ""
          )}
          <ExportReportButton />
        </div>
      </div>
      <div className="flex gap-x-5 pt-8">
        <select
          onChange={(e) => setSelectedType(e.target.value as IAdministrasiType)}
          defaultValue="buku_peraturan_di_desa"
          className="focus:border-blue-400 focus:shadow border text-sm border-slate-300 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-1"
        >
          {jenis_administrasi.map((item: any, key: any) => {
            return (
              <option key={key} value={item.key}>
                {item.value}
              </option>
            );
          })}
        </select>

        {getSlugType() !== "kecamatan" && (
          <select
            onChange={(e) => setSelectedKec(e.target.value)}
            value={selectedKec}
            className="focus:border-blue-400 focus:shadow border text-sm border-slate-300 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-1"
          >
            <option value="">Semua Kecamatan</option>
            {filteredKec.map((item: any) => (
              <option key={item.kode_wilayah} value={item.kode_wilayah}>
                {item.nama_kecamatan}
              </option>
            ))}
          </select>
        )}

        <select
          onChange={(e) => setSelectedDesa(e.target.value)}
          value={selectedDesa}
          className="focus:border-blue-400 focus:shadow border text-sm border-slate-300 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-1"
        >
          <option value="">Semua Desa</option>
          {listDeskel.map((item: any) => {
            return (
              <option key={item.kode_wilayah} value={item.kode_wilayah}>
                {item.nama_deskel}
              </option>
            );
          })}
        </select>

        <div className="flex relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari Desa/Kelurahan..."
            className="focus:border-blue-400 focus:shadow border text-sm border-slate-300 rounded text-neutral-600 w-full outline-none pl-2 pr-10 py-1"
          />
          <BiSearch className="absolute right-2 top-1/2 -translate-y-1/2 size-6 fill-slate-600" />
        </div>
      </div>

      <div className="overflow-x-auto mt-5">
        <table className="min-w-full text-neutral-700 text-sm text-left">
          {DATA[1].length > 0 && (
            <thead>
              <tr style={tableHeaderStyle}>
                {DATA[0].map((col: any, index: number) => (
                  <th
                    key={index}
                    className="p-2 text-center border border-gray-300"
                  >
                    {col.name}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {currentItems.length === 0 ? (
              <tr>
                <td
                  colSpan={DATA[0].length}
                  className="text-center rounded-lg bg-red-200 py-8 text-red-700"
                >
                  Tidak ada data yang tersedia!
                </td>
              </tr>
            ) : (
              currentItems.map((row: any, index: number) => (
                <tr key={index}>
                  {DATA[0].map((col: any, colIndex: number) => (
                    <td
                      key={colIndex}
                      className="p-4 border text-center border-gray-300"
                    >
                      {col.cell
                        ? col.cell(row, indexOfFirstItem + index)
                        : col.selector(row, indexOfFirstItem + index)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex mt-4 justify-center">
          <div className="join">
            <button 
              className="join-item btn bg-white text-gray-800"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              {"<<"}
            </button>
            <button 
              className="join-item btn bg-white text-gray-800"
              onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
              disabled={currentPage === 1}
            >
              {"<"}
            </button>
            
            <button className="join-item btn bg-blue-500 text-white">
              {currentPage}
            </button>
            
            {currentPage < totalPages && (
              <button 
                className="join-item btn bg-white text-gray-800"
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                {currentPage + 1}
              </button>
            )}
            
            {currentPage < totalPages - 1 && (
              <button className="join-item btn bg-white text-gray-800">...</button>
            )}
            
            {currentPage < totalPages - 1 && (
              <button 
                className="join-item btn bg-white text-gray-800"
                onClick={() => setCurrentPage(totalPages)}
              >
                {totalPages}
              </button>
            )}
            
            <button 
              className="join-item btn bg-white text-gray-800"
              onClick={() => setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages)}
              disabled={currentPage === totalPages}
            >
              {">"}
            </button>
            <button 
              className="join-item btn bg-white text-gray-800"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
            >
              {">>"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdministrasiDataTable;
