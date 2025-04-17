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