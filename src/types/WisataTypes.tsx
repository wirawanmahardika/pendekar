export type wisataDataType = {
    last_updated: Date;
    list_desa: any[];
    list_wisata: any[];
    list_kecamatan: any[];
}

export type wisataCardType = {
    kode_wilayah: string;
    foto: string;
    judul: string;
    slug: string;
    slug_desa: string;
    subjudul: string;
}
