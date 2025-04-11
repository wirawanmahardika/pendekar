export type dashboardResultDataType = {
    last_updated: Date;
    idm: any[];
    list_berita: any[];
    list_desa: any[];
    list_kabupaten: any[];
    list_kecamatan: any[];
    stunting: any[];
}

export type beritaDashboardType = {
    kode_wilayah: string;
    foto: string;
    judul: string;
    slug_desa: string;
    slug: string;
}