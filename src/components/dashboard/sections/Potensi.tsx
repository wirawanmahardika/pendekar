import { useState, useEffect } from "react";
import { dashboardResultDataType } from "../../../types/DashboardTypes";
import { tableHeaderStyle } from "../../../utils/themeSetting";
import ExportReportButton from "../../ExportReportButton";
import { PotensiBarChart, PotensiRadarChart } from "../charts/PotensiCharts";
import { STRINGS } from "../../../utils/strings";
import { KODE_SLUG } from "../../../utils/api";

export default function Potensi({ resultData }: { resultData?: dashboardResultDataType }) {
  const [selectedKecamatan, setSelectedKecamatan] = useState<string>("");
  const [selectedDesa, setSelectedDesa] = useState<string>("");
  const [kecamatanList, setKecamatanList] = useState<any[]>([]);
  const [, setDesaList] = useState<any[]>([]);
  const [currentKecamatanData, setCurrentKecamatanData] = useState<any>(null);
  const [currentDesaData, setCurrentDesaData] = useState<any>(null);

  useEffect(() => {
    if (resultData?.list_kecamatan && resultData.list_kecamatan.length > 0) {
      setKecamatanList(resultData.list_kecamatan);
      handleKecamatanSelect(resultData.list_kecamatan[0].nama_kecamatan);
    }
    if (resultData?.list_desa) {
      setDesaList(resultData.list_desa);
    }
  }, [resultData]);

  const handleKecamatanSelect = (kecamatanName: string) => {
    setSelectedKecamatan(kecamatanName);

    // Cari data kecamatan yang dipilih
    const kecamatan = resultData?.list_kecamatan?.find(
      (k) => k.nama_kecamatan === kecamatanName
    );
    if (kecamatan) {
      setCurrentKecamatanData(kecamatan);
    }

    // Filter desa berdasarkan kecamatan yang dipilih
    const filteredDesa = resultData?.list_desa?.filter(
      (d) => d.nama_kecamatan === kecamatanName
    );

    // Reset desa yang dipilih, pilih yang pertama jika ada
    if (filteredDesa && filteredDesa.length > 0) {
      handleDesaSelect(filteredDesa[0].nama_deskel);
    } else {
      setSelectedDesa("");
      setCurrentDesaData(null);
    }
  };

  const handleDesaSelect = (desaName: string) => {
    setSelectedDesa(desaName);

    // Cari data desa yang dipilih
    const desa = resultData?.list_desa?.find(
      (d) => d.nama_deskel === desaName && d.nama_kecamatan === selectedKecamatan
    );

    if (desa) {
      setCurrentDesaData(desa);
    } else {
      setCurrentDesaData(null);
    }
  };

  const getPotensiManusiaData = () => {
    const data = currentDesaData || currentKecamatanData;
    if (!data) return [120, 160, 150]; // Default values

    // Kita bisa menggunakan berbagai indikator yang mewakili potensi manusia
    // Misalnya, dari skor IKS, IKE, dan IKL (jika tersedia)
    // Atau dari capaian SDGs yang berkaitan dengan manusia

    if (data.skor_iks && data.skor_ike && data.skor_ikl) {
      // Menggunakan skor indeks kesejahteraan sosial, ekonomi, dan lingkungan
      return [
        parseFloat(data.skor_iks) * 100 || 0,
        parseFloat(data.skor_ike) * 100 || 0,
        parseFloat(data.skor_ikl) * 100 || 0
      ];
    }

    // Alternatif jika tidak ada skor IKS, IKE, dan IKL
    // Bisa gunakan indikator SDGs terkait manusia, seperti SDGs 1 (No Poverty), 3 (Good Health), 4 (Quality Education)
    return [
      parseFloat(data.sdgs_1) || 0,
      parseFloat(data.sdgs_3) || 0,
      parseFloat(data.sdgs_4) || 0
    ];
  };

  // Mengambil data SDA
  const getSDAData = () => {
    const data = currentDesaData || currentKecamatanData;
    if (!data) return [120, 160, 150]; // Default values

    return [
      parseInt(data.sda_perikanan) || 0,
      parseInt(data.sda_pertanian) || 0,
      parseInt(data.sda_perkebunan) || 0
    ];
  };

  // Mengambil data Sarana Prasarana
  const getSarprasData = () => {
    const data = currentDesaData || currentKecamatanData;
    if (!data) return [120, 160, 150]; // Default values

    return [
      parseInt(data.sarpras_ibadah) || 0,
      parseInt(data.sarpras_sekolah) || 0,
      parseInt(data.sarpras_umum) || 0
    ];
  };

  // Filter desa berdasarkan kecamatan yang dipilih
  const filteredDesaList = resultData?.list_desa?.filter(
    (desa) => desa.nama_kecamatan === selectedKecamatan
  ) || [];

  return <div className="p-4 bg-white rounded shadow mt-8">
    <div className="flex items-center justify-between">
      <h2 className="font-bold text-xl">Potensi</h2>
      <ExportReportButton url="export/potensi" />
    </div>

    <div className="flex flex-col text-gray-700 mt-3">
      <span>Menampilkan Potensi Kecamatan, Desa/Kelurahan</span>

      <div className="grid grid-cols-5 mt-2 gap-3">
        <div className="rounded flex flex-col border border-gray-300">
          <span style={tableHeaderStyle} className="w-full rounded-t p-3 text-xl text-center font-semibold">KECAMATAN</span>
          <div className="flex flex-col overflow-y-auto">
            {kecamatanList.map((kecamatan, index) => (
              <button
                key={index}
                style={{
                  backgroundColor: selectedKecamatan === kecamatan.nama_kecamatan && STRINGS[KODE_SLUG].theme.color_light,
                  color: selectedKecamatan === kecamatan.nama_kecamatan && ("white" as any)
                }}
                className={`px-3 py-2 font-semibold text-left text-black hover:text-black hover:bg-gray-200`}
                onClick={() => handleKecamatanSelect(kecamatan.nama_kecamatan)}
              >
                {kecamatan.nama_kecamatan}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded flex col-span-2 flex-col border border-gray-300">
          <span style={tableHeaderStyle} className="w-full rounded-t p-3 text-xl text-center font-semibold">Potensi Manusia</span>
          <div className="overflow-y-auto">
            <PotensiBarChart
              data={getPotensiManusiaData()}
              categories={['Pendidikan', 'Kesehatan', 'Ekonomi']}
            />
          </div>
        </div>

        <div className="rounded flex col-span-2 flex-col border border-gray-300">
          <span style={tableHeaderStyle} className="w-full rounded-t p-3 text-xl text-center font-semibold">Potensi SDA</span>
          <div className="overflow-y-auto h-full">
            <PotensiBarChart data={getSDAData()} />
          </div>
        </div>

        <div className="rounded flex flex-col border border-gray-300 overflow-hidden">
          <span style={tableHeaderStyle} title='Desa/Kelurahan' className="w-full rounded-t p-3 text-xl text-center font-semibold">DESA/KELURAHAN</span>
          <div className="flex flex-col overflow-y-auto">
            {filteredDesaList.length > 0 ? (
              filteredDesaList.map((desa, index) => (
                <button
                  key={index}
                  style={{
                    backgroundColor: selectedDesa === desa.nama_deskel && STRINGS[KODE_SLUG].theme.color_light,
                    color: selectedDesa === desa.nama_deskel && ("white" as any)
                  }}
                  className={`px-3 py-2 font-semibold text-left text-black hover:text-black hover:bg-gray-200`}
                  onClick={() => handleDesaSelect(desa.nama_deskel)}
                >
                  {desa.nama_deskel}
                </button>
              ))
            ) : (
              <div className="px-3 py-2 text-gray-500">Tidak ada desa/kelurahan</div>
            )}
          </div>
        </div>

        <div className="rounded flex col-span-2 flex-col border border-gray-300">
          <span style={tableHeaderStyle} className="w-full rounded-t p-3 text-xl text-center font-semibold">Lembaga Kemsyarakatan</span>
          <div className="overflow-y-auto">
            <PotensiRadarChart data={currentDesaData || currentKecamatanData} />
          </div>
        </div>

        <div className="rounded flex col-span-2 flex-col border border-gray-300">
          <span style={tableHeaderStyle} className="w-full rounded-t p-3 text-xl text-center font-semibold">Sarana Dan Prasarana</span>
          <div className="flex flex-col overflow-y-auto h-full">
            <PotensiBarChart
              data={getSarprasData()}
              categories={['Ibadah', 'Sekolah', 'Umum']}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
}
