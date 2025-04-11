export type profilDesaDataType = {
    last_updated: Date;
    list_desa: any[];
    list_kecamatan: any[];
}

export type SortKeyProfilDesa = "kode_wilayah" | "nama_kecamatan" | "nama_deskel";

export type desaProfilDesa = {
  kode_wilayah: string;
  nama_kecamatan: string;
  nama_deskel: string;
  link: string;
};

export type pencarianDesa = {
    kecamatan: string;
    desa: string;
}