import { HiOutlineSearch } from "react-icons/hi";

const ProposalSection = () => (
  <div className="hidden transition-opacity duration-300 ease-in-out" id="bordered-proposal" role="tabpanel" aria-labelledby="proposal-tab">
    <div className="mb-8">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-5">
          <h5 className="text-xl font-bold text-gray-800 mb-5">PROGRES PROPOSAL APBDes</h5>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <h6 className="text-sm text-gray-600 font-medium mb-1">PENGAJUAN</h6>
              <h5 className="text-xl font-bold">13 Desa/Kelurahan</h5>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <h6 className="text-sm text-gray-600 font-medium mb-1">REVISI</h6>
              <h5 className="text-xl font-bold">13 Desa/Kelurahan</h5>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h6 className="text-sm text-gray-600 font-medium mb-1">MASUK RKD</h6>
              <h5 className="text-xl font-bold">13 Desa/Kelurahan</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="p-5">
        <h5 className="text-xl font-bold text-gray-800 mb-5">PROPOSAL DANA TRANSFER</h5>
        
        <div className="mb-4">
          <div className="relative max-w-xs">
            <input 
              type="text" 
              name="query" 
              placeholder="Nama Desa..." 
              className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <HiOutlineSearch className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 border">
            <thead>
              <tr className="bg-gray-50">
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r">No</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r">Kecamatan</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r">Desa</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r">Jenis Proposal</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r">Nominal</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status Proposal</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[1, 2, 3, 4, 5].map((row) => (
                <tr key={row} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">{row}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-r">Manggala</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-r">Pilanggede</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-r">-</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-r">-</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);
export default ProposalSection;