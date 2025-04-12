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

export type idmScoresType = {
    tahun: string;
    skor_idm: number;
}[]

export type skorIdmType = {
    current_status: string
    skor_idm: number;
    skor_ike: number;
    skor_ikl: number;
    skor_iks: number;
    skor_min: number;
    skor_up: number;
    tahun: number;
    target_status: string;
}

export type skorIdmChartType = 'bar' | 'line';