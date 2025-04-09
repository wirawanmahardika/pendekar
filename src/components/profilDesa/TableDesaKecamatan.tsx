import { useState, useMemo } from "react";
import { GiWorld } from "react-icons/gi";
import { DesaProfilDesa, SortKeyProfilDesa } from "../../types/ProfileDesaTypes";


export default function TabelDesaKecamatan({ data }: { data?: DesaProfilDesa[] }) {
    if(!data) return;
  const [sortKey, setSortKey] = useState<SortKeyProfilDesa>("kode_wilayah");
  
  const handleSort = (key: SortKeyProfilDesa) => {
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

  return (
    <>
      <table className="overflow-x-auto min-w-full mt-5 text-center">
        <thead>
          <tr>
            <th className="p-2 border font-semibold border-gray-300">No</th>
            <th
              className="p-2 border font-semibold border-gray-300 cursor-pointer"
              onClick={() => handleSort("kode_wilayah")}
            >
              Kode Wilayah
            </th>
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
            <th className="p-2 border font-semibold border-gray-300">Website</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item, index) => (
            <tr key={`${item.kode_wilayah}-${item.nama_deskel}`}>
              <td className="p-3 border border-gray-300">
                {(currentPage - 1) * itemsPerPage + index + 1}
              </td>
              <td className="p-3 border border-gray-300">{item.kode_wilayah}</td>
              <td className="p-3 border border-gray-300">{item.nama_kecamatan}</td>
              <td className="p-3 border border-gray-300">{item.nama_deskel}</td>
              <td className="p-3 border border-gray-300 flex items-center gap-x-3 justify-center">
                <GiWorld />
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-sky-600"
                >
                  Website Desa
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex mt-4 justify-center">
        <div className="join">
          <button
            className="join-item btn bg-white text-gray-800"
            onClick={() => changePage(1)}
            disabled={currentPage === 1}
          >
            {"<<"}
          </button>
          <button
            className="join-item btn bg-white text-gray-800"
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {"<"}
          </button>

          {Array.from({ length: totalPages }).map((_, idx) => {
            const page = idx + 1;
            return (
              <button
                key={page}
                className={`join-item btn ${
                  page === currentPage ? "bg-blue-500 text-white" : "bg-white text-gray-800"
                }`}
                onClick={() => changePage(page)}
              >
                {page}
              </button>
            );
          })}

          <button
            className="join-item btn bg-white text-gray-800"
            onClick={() => changePage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            {">"}
          </button>
          <button
            className="join-item btn bg-white text-gray-800"
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
