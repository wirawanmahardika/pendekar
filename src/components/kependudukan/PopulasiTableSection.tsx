import { useMemo } from "react";
import ExportReportButton from "../../components/ExportReportButton";
import { BiSearch } from "react-icons/bi";
import { tableHeaderStyle } from "../../utils/themeSetting";

import { PopulasiTableSectionProps } from '../../types/administrasi/KependudukanTypes'

export default function PopulationTableSection({
  filteredDesa,
  kecamatanList,
  selectedKecamatan,
  setSelectedKecamatan,
  selectedDesa,
  setSelectedDesa,
  searchText,
  setSearchText,
  currentPage,
  setCurrentPage,
  itemsPerPage,
  availableDesaOptions
}: PopulasiTableSectionProps) {

  const paginationData = useMemo(() => {
    const totalPages = Math.ceil(filteredDesa.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredDesa.slice(indexOfFirstItem, indexOfLastItem);

    return {
      totalPages,
      indexOfFirstItem,
      indexOfLastItem,
      currentItems
    };
  }, [filteredDesa, currentPage, itemsPerPage]);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="p-4 bg-white rounded shadow mt-8">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-xl">Rekap Kependudukan</h2>
        <ExportReportButton />
      </div>
      
      <div className="flex gap-x-5 pt-2">
        <div className="flex relative">
          <input 
            type="text" 
            placeholder="Cari Desa/Kelurahan..." 
            className="focus:border-blue-400 focus:shadow border text-sm border-slate-300 rounded text-neutral-600 w-full outline-none pl-2 pr-10 py-1"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <BiSearch className="absolute right-2 top-1/2 -translate-y-1/2 size-6 fill-slate-600" />
        </div>

        <select 
          name="kecamatan-filter" 
          className="focus:border-blue-400 focus:shadow border text-sm border-slate-300 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-1"
          value={selectedKecamatan}
          onChange={(e) => setSelectedKecamatan(e.target.value)}
        >
          <option value="">Semua Kecamatan</option>
          {kecamatanList?.map((kec) => (
            <option key={kec.kode_wilayah} value={kec.k3}>
              {kec.nama_kecamatan}
            </option>
          ))}
        </select>

        <select 
          name="desa-filter" 
          className="focus:border-blue-400 focus:shadow border text-sm border-slate-300 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-1"
          value={selectedDesa}
          onChange={(e) => setSelectedDesa(e.target.value)}
          disabled={!selectedKecamatan}
        >
          <option value="">Semua Desa</option>
          {availableDesaOptions.map((desa) => (
            <option key={desa.value} value={desa.value}>
              {desa.label}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full mt-5 text-neutral-700 text-center">
          <thead>
            <tr style={tableHeaderStyle}>
              <th className="p-2 border border-gray-300">No</th>
              <th className="p-2 border border-gray-300">Kecamatan</th>
              <th className="p-2 border border-gray-300">Desa</th>
              <th className="p-2 border border-gray-300">Laki-Laki</th>
              <th className="p-2 border border-gray-300">Perempuan</th>
              <th className="p-2 border border-gray-300">Jumlah Penduduk</th>
              <th className="p-2 border border-gray-300">Jumlah KK</th>
              <th className="p-2 border border-gray-300">Wajib KTP</th>
            </tr>
          </thead>
          <tbody>
            {paginationData.currentItems.length > 0 ? (
              paginationData.currentItems.map((desa, index) => (
                <tr key={desa.kode_wilayah}>
                  <td className="p-2 border border-gray-300">{paginationData.indexOfFirstItem + index + 1}</td>
                  <td className="p-2 border border-gray-300">{desa.nama_kecamatan}</td>
                  <td className="p-2 border border-gray-300">{desa.nama_deskel}</td>
                  <td className="p-2 border border-gray-300">{desa.pria || 0}</td>
                  <td className="p-2 border border-gray-300">{desa.wanita || 0}</td>
                  <td className="p-2 border border-gray-300">{desa.jumlah_penduduk || 0}</td>
                  <td className="p-2 border border-gray-300">{desa.jumlah_kk || 0}</td>
                  <td className="p-2 border border-gray-300">{desa.jml_wktp || 0}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="p-2 border border-gray-300 text-center">
                  Tidak ada data yang ditemukan
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {paginationData.totalPages > 1 && (
        <div className="flex mt-4 justify-center">
          <div className="join">
            <button 
              className="join-item btn bg-white text-gray-800" 
              onClick={() => paginate(1)}
              disabled={currentPage === 1}
            >{"<<"}</button>
            
            {Array.from({ length: Math.min(5, paginationData.totalPages) }).map((_, i) => {
              // Show page numbers near current page
              let pageNum;
              if (paginationData.totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= paginationData.totalPages - 2) {
                pageNum = paginationData.totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              
              return (
                <button 
                  key={i}
                  className={`join-item btn ${currentPage === pageNum ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'}`}
                  onClick={() => paginate(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}
            
            {paginationData.totalPages > 5 && currentPage < paginationData.totalPages - 2 && (
              <>
                <button className="join-item btn bg-white text-gray-800">...</button>
                <button 
                  className="join-item btn bg-white text-gray-800"
                  onClick={() => paginate(paginationData.totalPages)}
                >
                  {paginationData.totalPages}
                </button>
              </>
            )}
            
            <button 
              className="join-item btn bg-white text-gray-800"
              onClick={() => paginate(paginationData.totalPages)}
              disabled={currentPage === paginationData.totalPages}
            >{">>"}</button>
          </div>
        </div>
      )}
    </div>
  );
}