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
