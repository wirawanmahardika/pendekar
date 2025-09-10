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

export type PolygonDesa = {
  provinsi: string;
  kabupaten: string;
  kecamatan: string;
  deskel: string;
  link: string;
  ar: any;
  idm: number;
  kd: string;
  program: any;
  sdgs: number;
  sda: number;
  sdm: number;
  lk: number;
  sarpras: number;
  potensiData: {
    sda: {
      perikanan: number;
      pertanian: number;
      perkebunan: number;
    };
    sdm: number;
    lk: number;
    sarpras: {
      ibadah: number;
      sekolah: number;
      umum: number;
    };
  };
  polyDes: any;
};

export type PolygonKec = {
  polyKec: any;
  nama_kecamatan: string;
};

export interface MapWithPolygonsProps {
  resultData: any;
  selectedOption: OptionsType;
}

export type idmDataTypes = {
  nama_desa: string;
  rows: {
    CSR: string | null;
    DESA: string | null;
    INDIKATOR: string | null;
    KAB: string | null;
    KEGIATAN: string | null;
    KETERANGAN: string | null;
    LAINNYA: string | null;
    NILAI: string | null;
    NO: string | null;
    PROV: string | null;
    PUSAT: string | null;
    ROW_CELL: string | null;
    SKOR: string | null;
  }[],
}

export type sdgsDataTypes = {
  average: number;
  data: {
    goals: number;
    image: string;
    score: number;
    title: string;
  }[]
}
