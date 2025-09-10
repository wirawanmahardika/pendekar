import AnggaranDesa from "./chart/APBDes";
import APBDTable from "./table/APBDesDataTable";
import FilterAPBD, { FilterAPBDProps } from "./filter/FilterAPBD";
import ExportReportButton from "../ExportReportButton";

export const APBDesSection = ({ dataPembangunan }: FilterAPBDProps) => (
  <div className={`transition-opacity duration-300 ease-in-out`} id="bordered-apbd" role="tabpanel" aria-labelledby="apbd-tab">
    {dataPembangunan && <FilterAPBD dataPembangunan={dataPembangunan} />}
    <div className="mb-8">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-5">
          <div className="flex justify-between items-center mb-5">
            <h5 className="text-xl font-bold text-gray-800">GRAFIK VS REALISASI</h5>
            <ExportReportButton url="export/apbdes" />
          </div>

          <div className="border rounded-lg mb-6">
            <div className="bg-blue-50 p-4 border-b">
              <h5 className="text-lg font-semibold text-gray-800">APBDes</h5>
            </div>
            <div className="p-4">
              {dataPembangunan && <AnggaranDesa dataPembangunan={dataPembangunan as any} />}
            </div>
          </div>

          <div>
            {dataPembangunan && <APBDTable dataPembangunan={dataPembangunan as any} />}
          </div>
        </div>
      </div>
    </div>
  </div>
);
