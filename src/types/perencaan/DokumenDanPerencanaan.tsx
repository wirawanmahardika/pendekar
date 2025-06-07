export type dokumenDanPerencaanType = {
  id?: number;
  id_dokumen: string;
  pic: string;
  jenis_dokumen: string;
  tanggal_perubahan: string;
  desa: string;
  kecamatan: string;
  kode: string;
  komentar: string;
  nama_dokumen: string;
  status: "Revisi" | "Ditolak" | "Disetujui" | "Baru";
  tahun: string;
  url_dokumen: string;
}

export type dokumenDanPerencaanFilterType = {
  tahun: string;
  kecamatan: string;
  desa: string;
}

export type dokumenDanPerencaanPartType = {
  id_dokumen: string;
  desa: string;
  kecamatan: string;
  kode: string;
  komentar: string;
  nama_dokumen: string;
  status: "Revisi" | "Ditolak" | "Disetujui" | "Baru";
  tahun: string;
  url_dokumen: string;
}