import { useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { formatCurrency } from "../../../utils/formatter";

const RKPTable = ({ resultData }: { resultData: any }) => {
  const [query, setQuery] = useState("");
  const { list_rkpdes = [] } = resultData;
  
  // Filter rows based on query
  const filteredRows = list_rkpdes.filter((item: any) => 
    item.nama_deskel.toLowerCase().includes(query.toLowerCase()) ||
    item.nama_kecamatan.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari Desa/Kelurahan..."
            className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <HiOutlineSearch className="h-5 w-5 text-gray-400" />
          </div>
        </div>
        
        <select
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Semua Kecamatan</option>
          {Array.from(new Set(list_rkpdes.map((item: any) => item.nama_kecamatan))).map((kecamatan: unknown, index: number) => (
            <option key={index} value={String(kecamatan)}>
              {String(kecamatan)}
            </option>
          ))}
        </select>
        
        <select
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Semua Desa</option>
          {Array.from(new Set(list_rkpdes.map((item: any) => item.nama_deskel))).map((desa: unknown | undefined, index: number) => (
            <option key={index} value={String(desa)}>
              {String(desa)}
            </option>
          ))}
        </select>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border">
          <thead>
            <tr className="bg-blue-50">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r">No</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r">Kecamatan</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r">Desa</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r">Nama Proyek</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r">Lokasi</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r">Biaya</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r">Tahun</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredRows.map((row: any, index: number) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 border-r">{index + 1}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 border-r">{row.nama_kecamatan}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 border-r">{row.nama_deskel}</td>
                <td className="px-4 py-3 text-sm text-gray-500 border-r">{row.nama_proyek}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 border-r">{row.lokasi}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 border-r">{formatCurrency(row.biaya)}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 border-r">{row.tahun}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RKPTable;