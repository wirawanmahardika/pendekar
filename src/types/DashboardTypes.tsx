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


export type OptionsType =
  | "kd"
  | "idm"
  | "sdgs"
  | "ar"
  | "program"
  | "sda"
  | "sdm"
  | "lk"
  | "sarpras";

  // Definisikan tipe data stunting
 export interface StuntingDataItem {
      tahun: number;
      keluarga_sasaran?: number;
      berisiko?: number;
      kk_memiliki_baduta?: number;
      kk_memiliki_balita?: number;
      kk_memiliki_pus?: number;
      kk_memiliki_pushamil?: number;
      persen_stunting?: number;
      prevalensi?: number;
  }
  
export type skorIdmChartType = 'bar' | 'line';