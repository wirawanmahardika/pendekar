import { useState, useMemo, useEffect } from "react";
import { exportReportButtonStyle } from "../../utils/themeSetting";
import { desaBansos, SortKeyBansos } from "../../types/BansosTypes";


export default function TabelRekapPenerimaBansos({ data }: { data?: desaBansos[] }) {
  if (!data) return;
  const [sortKey, setSortKey] = useState<SortKeyBansos>("nama_kecamatan");

  const handleSort = (key: SortKeyBansos) => {
    setSortKey(key);
    setCurrentPage(1);
  };

  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      const valA = a[sortKey].toLowerCase();
      const valB = b[sortKey].toLowerCase();
      return valA.localeCompare(valB);
    });
  }, [data, sortKey]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const changePage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(1)
  }, [data])

  return (
    <>
      <table className="overflow-x-auto min-w-full mt-5 text-center">
        <thead>
          <tr>
            <th className="p-2 border font-semibold border-gray-300">No</th>
            <th
              className="p-2 border font-semibold border-gray-300 cursor-pointer"
              onClick={() => handleSort("nama_kecamatan")}
            >
              Kecamatan
            </th>
            <th
              className="p-2 border font-semibold border-gray-300 cursor-pointer"
              onClick={() => handleSort("nama_deskel")}
            >
              Desa
            </th>
            <th className="p-2 border font-semibold border-gray-300">Jenis Bantuan</th>
            <th className="p-2 border font-semibold border-gray-300">Individu</th>
            <th className="p-2 border font-semibold border-gray-300">KK</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item, index) => (
            <tr key={`${item.kode_wilayah}-${item.jenis_bansos}`}>
              <td className="p-3 border border-gray-300">
                {(currentPage - 1) * itemsPerPage + index + 1}
              </td>
              <td className="p-3 border border-gray-300">{item.nama_kecamatan}</td>
              <td className="p-3 border border-gray-300">{item.nama_deskel}</td>
              <td className="p-3 border border-gray-300">{item.jenis_bansos}</td>
              <td className="p-3 border border-gray-300">{item.jml_penerima}</td>
              <td className="p-3 border border-gray-300">{item.jml_penerima_kk}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex mt-4 justify-center">
        <div className="join">
          <button
            style={exportReportButtonStyle}
            className="join-item btn disabled:!bg-stone-100 disabled:!text-stone-400 text-lg disabled:!cursor-not-allowed text-gray-500  shadow-none"
            onClick={() => changePage(1)}
            disabled={currentPage === 1}
          >
            {"<<"}
          </button>
          <button
            style={exportReportButtonStyle}
            className="join-item btn disabled:!bg-stone-100 disabled:!text-stone-400 text-lg disabled:!cursor-not-allowed text-gray-500  shadow-none"
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {"<"}
          </button>

          {getPaginationRange(currentPage, totalPages).map((item, index) => {
            if (typeof item === 'string') {
              return (
                <button
                  key={`ellipsis-${index}`}
                  className="join-item btn border text-gray-400"
                >
                  ...
                </button>
              );
            }

            return (
              <button
                key={item}
                className={`join-item btn ${item === currentPage
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-800 shadow-none"
                  }`}
                onClick={() => changePage(item)}
              >
                {item}
              </button>
            );
          })}

          <button
            style={exportReportButtonStyle}
            className="join-item btn disabled:!bg-stone-100 disabled:!text-stone-400 text-lg disabled:!cursor-not-allowed text-gray-500  shadow-none"
            onClick={() => changePage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            {">"}
          </button>
          <button
            style={exportReportButtonStyle}
            className="join-item btn disabled:!bg-stone-100 disabled:!text-stone-400 text-lg disabled:!cursor-not-allowed text-gray-500  shadow-none"
            onClick={() => changePage(totalPages)}
            disabled={currentPage === totalPages}
          >
            {">>"}
          </button>
        </div>
      </div>
    </>
  );
}


function getPaginationRange(currentPage: number, totalPages: number) {
  const delta = 1; // jumlah halaman di kiri dan kanan currentPage
  const range = [];
  const rangeWithDots = [];

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - delta && i <= currentPage + delta)
    ) {
      range.push(i);
    }
  }

  let prev = 0;
  for (let i of range) {
    if (prev && i - prev !== 1) {
      rangeWithDots.push("...");
    }
    rangeWithDots.push(i);
    prev = i;
  }

  return rangeWithDots;
}
