export type dataToDisplayPerencanaanType = {
  id_dokumen: string;
  desa: string;
  kecamatan: string;
  kode: string;
  komentar: string;
  nama_dokumen: string;
  status: "Revisi" | "Ditolak" | "Disetujui" | "Baru";
  tahun: string;
  url_dokumen: string;
}[]

export type dataToDisplayPartType = {
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

export type TabelDokumenDanPerencanaanDesaFilterType = {
  tahun: string[],
  kecamatan: string[],
  desa: string[]
}

export type TabelDokumenDanPerencanaanDesaSelectedFilterType = {
  tahun: string,
  kecamatan: string,
  desa: string
}

export type ringkasanPerencanaanType = {
  ringkasan_perencaanaan: {
    desa_belum_upload: number;
    desa_sudah_upload: number;
    total_desa: number;
    dokumen_baru: number;
    dokumen_disetujui: number;
    dokumen_ditolak: number;
    dokumen_revisi: number;
  };
  status_perencanaan: {
    desa_dokumen_baru: number;
    desa_dokumen_disetujui: number;
    desa_dokumen_ditolak: number;
    desa_dokumen_revisi: number;
    total_seluruh_desa: number;
  };
  persentase_dokumen: {
    rpjmdes: number;
    rkpdes: number;
    apbdes: number;
  };
};

export type KelengkapanDokumen = {
  kode: string;
  kecamatan: string;
  desa: string;
  rpjmdes: boolean;
  rkpdes: boolean;
  apbdes: boolean;
  tahun: string;
  progress: number;
}

export type KelengkapanDokumenType = KelengkapanDokumen[];


export type DaftarKelengkapanDokumenFilterType = {
  tahun: string[],
  kecamatan: string[],
  desa: string[]
}


export type DaftarKelengkapanDokumenSelectedFilterType = {
  tahun: string,
  kecamatan: string,
  desa: string
}

export type KecamatanOption = {
  k3: string;
  kecamatan: string;
}

export type DesaOption = {
  k4: string;
  deskel: string;
}