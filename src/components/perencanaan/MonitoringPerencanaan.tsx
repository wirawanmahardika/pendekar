import { useEffect, useState } from "react";
import { ringkasanPerencanaanType } from "../../types/PerencanaanTypes";
import { BASE_API_URL } from "../../utils/api";
import { AxiosAuth } from "../../utils/axios";
import { loadingDotsColors } from "../../utils/themeSetting";

const MonitoringPerencanaan = () => {
  const [loading, setLoading] = useState(true)
  const [monitoringData, setMonitoringData] =
    useState<ringkasanPerencanaanType | null>(null);

  useEffect(() => {
    AxiosAuth
      .get(`${BASE_API_URL}perencanaan`)
      .then(({ data }) => setMonitoringData(data.data))
      .catch((error) => alert(error.message))
      .finally(() => setLoading(false))
  }, []);

  const statusPerencanaan = monitoringData?.status_perencanaan;
  const maxValue = Math.max(
    statusPerencanaan?.desa_dokumen_baru || 0,
    statusPerencanaan?.desa_dokumen_revisi || 0,
    statusPerencanaan?.desa_dokumen_disetujui || 0,
    statusPerencanaan?.desa_dokumen_ditolak || 0
  );

  const calculateChartSize = (percentage: any) => {
    const fullCircle = 251.2;
    const strokeLength = (percentage / 100) * fullCircle;
    const remainingLength = fullCircle - strokeLength;
    return `${strokeLength} ${remainingLength}`;
  };


  return (
    <div className="bg-white p-5 rounded shadow">
      <span className="text-base font-bold">Monitoring Perencanaan Desa</span>
      {loading ?
        <div className="grid place-items-center">
          <span className="loading loading-dots w-16 mx-auto" style={loadingDotsColors}></span>
        </div>
        :
        <div className="grid grid-cols-3 gap-3 mb-16 mt-2">
          <div className="bg-[#AEDDF5] p-3 rounded shadow-md text-[#056596] flex flex-col gap-y-1 py-4">
            <div className="bg-white p-1 rounded-md text-center w-full font-semibold">
              Ringkasan Perencanaan Desa
            </div>

            <div className="flex justify-between p-2">
              <div className="flex p-1 gap-x-3 items-center">
                <span className="text-4xl font-bold">
                  {monitoringData?.ringkasan_perencaanaan?.desa_sudah_upload ?? 0}
                </span>
                <div className="flex flex-col text-sm">
                  <span>Desa</span>
                  <span>Upload</span>
                </div>
              </div>

              <div className="flex p-1 gap-x-3 items-center">
                <span className="text-4xl font-bold">
                  {monitoringData?.ringkasan_perencaanaan?.desa_belum_upload ?? 0}
                </span>
                <div className="flex flex-col text-sm">
                  <span>Desa Belum</span>
                  <span>Upload</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <span className="font-bold">
                {monitoringData?.ringkasan_perencaanaan?.dokumen_baru ?? 0}
                <span className="font-normal px-1">Baru</span>
              </span>
              <span className="font-bold">
                {monitoringData?.ringkasan_perencaanaan?.dokumen_disetujui ?? 0}
                <span className="font-normal px-1">Disetujui</span>
              </span>
              <span className="font-bold">
                {monitoringData?.ringkasan_perencaanaan?.dokumen_ditolak ?? 0}
                <span className="font-normal px-1">Ditolak</span>
              </span>
            </div>
          </div>

          <div className="bg-[#AEDDF5] flex flex-col rounded shadow-md">
            <div className="flex flex-col p-3 w-full gap-y-2">
              <span className="font-bold">Status Perencanaan</span>
              <div className="flex justify-around w-full mt-2">
                <div className="flex gap-x-2 items-center">
                  <span className="bg-sky-400 rounded-full size-3"></span>
                  <span className="text-sm">Baru</span>
                </div>
                <div className="flex gap-x-2 items-center">
                  <span className="bg-yellow-400 rounded-full size-3"></span>
                  <span className="text-sm">Revisi</span>
                </div>
                <div className="flex gap-x-2 items-center">
                  <span className="bg-green-400 rounded-full size-3"></span>
                  <span className="text-sm">Disetujui</span>
                </div>
                <div className="flex gap-x-2 items-center">
                  <span className="bg-red-400 rounded-full size-3"></span>
                  <span className="text-sm">Ditolak</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 h-1/2 justify-items-center mt-auto">
              <div className="flex flex-col w-2/3">
                <span className="text-center text-sm">
                  {monitoringData?.status_perencanaan?.desa_dokumen_baru ?? 0}{" "}
                  Desa
                </span>
                <div
                  className="bg-sky-400 rounded-top w-2/3 mx-auto mt-auto"
                  style={{
                    height: `${((statusPerencanaan?.desa_dokumen_baru || 0) / maxValue) *
                      100
                      }%`,
                  }}
                ></div>
              </div>
              <div className="flex flex-col w-2/3">
                <span className="text-center text-sm">
                  {monitoringData?.status_perencanaan?.desa_dokumen_revisi ?? 0}{" "}
                  Desa
                </span>
                <div
                  className="bg-yellow-400 rounded-top w-2/3 mx-auto mt-auto"
                  style={{
                    height: `${((statusPerencanaan?.desa_dokumen_revisi || 0) / maxValue) *
                      100
                      }%`,
                  }}
                ></div>
              </div>
              <div className="flex flex-col w-2/3">
                <span className="text-center text-sm">
                  {monitoringData?.status_perencanaan?.desa_dokumen_disetujui ??
                    0}{" "}
                  Desa
                </span>
                <div
                  className="bg-green-400 rounded-top w-2/3 mx-auto mt-auto"
                  style={{
                    height: `${((statusPerencanaan?.desa_dokumen_disetujui || 0) /
                      maxValue) *
                      100
                      }%`,
                  }}
                ></div>
              </div>
              <div className="flex flex-col w-2/3">
                <span className="text-center text-sm">
                  {monitoringData?.status_perencanaan?.desa_dokumen_ditolak ?? 0}{" "}
                  Desa
                </span>
                <div
                  className="bg-red-400 h-1/6 rounded-top w-2/3 mx-auto mt-auto"
                  style={{
                    height: `${((statusPerencanaan?.desa_dokumen_ditolak || 0) /
                      maxValue) *
                      100
                      }%`,
                  }}
                ></div>
              </div>
            </div>
          </div>

          <div className="bg-[#AEDDF5] flex flex-col p-5 rounded shadow-md gap-y-3">
            <span className="font-bold">Persentase Dokumen Yang Diunggah</span>

            <div className="flex justify-between">
              <div className="flex gap-x-2 items-center">
                <span className="bg-sky-400 rounded-full size-3"></span>
                <span className="text-sm">RPJMD</span>
              </div>
              <div className="flex gap-x-2 items-center">
                <span className="bg-orange-400 rounded-full size-3"></span>
                <span className="text-sm">RKPDes</span>
              </div>
              <div className="flex gap-x-2 items-center">
                <span className="bg-emerald-400 rounded-full size-3"></span>
                <span className="text-sm">APB Des</span>
              </div>
            </div>

            <div className="flex justify-between">
              <svg className="size-16" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="white"
                  stroke-width="10"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#008DF9"
                  stroke-width="10"
                  fill="none"
                  stroke-dasharray={calculateChartSize(
                    monitoringData?.persentase_dokumen?.rpjmdes
                  )}
                  stroke-linecap="round"
                  transform="rotate(-90 50 50)"
                />
                <text
                  x="50"
                  y="55"
                  text-anchor="middle"
                  font-size="20"
                  font-weight="bold"
                  fill="#333"
                >
                  {monitoringData?.persentase_dokumen?.rpjmdes}%
                </text>
              </svg>

              <svg className="size-16" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="white"
                  stroke-width="10"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#FF8000"
                  stroke-width="10"
                  fill="none"
                  stroke-dasharray={calculateChartSize(
                    monitoringData?.persentase_dokumen?.rkpdes
                  )}
                  stroke-linecap="round"
                  transform="rotate(-90 50 50)"
                />
                <text
                  x="50"
                  y="55"
                  text-anchor="middle"
                  font-size="20"
                  font-weight="bold"
                  fill="#333"
                >
                  {monitoringData?.persentase_dokumen?.rkpdes}%
                </text>
              </svg>

              <svg className="size-16" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="white"
                  stroke-width="10"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#06D97D"
                  stroke-width="10"
                  fill="none"
                  stroke-dasharray={calculateChartSize(
                    monitoringData?.persentase_dokumen?.apbdes
                  )}
                  stroke-linecap="round"
                  transform="rotate(-90 50 50)"
                />
                <text
                  x="50"
                  y="55"
                  text-anchor="middle"
                  font-size="20"
                  font-weight="bold"
                  fill="#333"
                >
                  {monitoringData?.persentase_dokumen?.apbdes}%
                </text>
              </svg>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default MonitoringPerencanaan;
