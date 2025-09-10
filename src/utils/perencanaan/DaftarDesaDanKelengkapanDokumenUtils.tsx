import { KelengkapanDokumen } from "../../types/perencaan/DaftarDesaDanKelengkapanDokumentTypes";

export const calculateProgress = (desa: KelengkapanDokumen, tahun: string, totalDokumen: { [key: string]: number; }) => {
  const dataPerTahun = desa.data_per_tahun.find(
    (data) => data.tahun.toString() === tahun
  );
  if (!dataPerTahun) return 0;

  const totalRpjmdes = totalDokumen.rpjmdes || 0;
  const totalRkpdes = totalDokumen.rkpdes || 0;
  const totalApbdes = totalDokumen.apbdes || 0;

  const uploadedRpjmdes = dataPerTahun.rpjmdes.length;
  const uploadedRkpdes = dataPerTahun.rkpdes.length;
  const uploadedApbdes = dataPerTahun.apbdes.length;

  const totalDokumenAll = totalRpjmdes + totalRkpdes + totalApbdes;
  const uploadedAll = uploadedRpjmdes + uploadedRkpdes + uploadedApbdes;

  return totalDokumenAll > 0
    ? Math.round((uploadedAll / totalDokumenAll) * 100)
    : 0;
};