import ExportReportButton from "../ExportReportButton";
import RKPTable from "./table/RKPDataTable";

const RKPSection = ({ resultData }: { resultData: any }) => (
  <div className="hidden transition-opacity duration-300 ease-in-out" id="bordered-rkp" role="tabpanel" aria-labelledby="rkp-tab">
    <div className="mb-8">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-5">
          <div className="flex justify-between items-center mb-5">
            <h5 className="text-xl font-bold text-gray-800">Rencana Kerja Pembangunan</h5>
            <ExportReportButton />
          </div>

          {resultData && <RKPTable resultData={resultData} />}
        </div>
      </div>
    </div>
  </div>
);

export default RKPSection;
