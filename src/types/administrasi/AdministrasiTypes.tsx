export type IAdministrasiCard  = {
  title : string,
  data : any,
  dataPerWeek : any
}


export type ColumnDef = {
  name: string;
  selector: (row: any, index?: number) => any;
  cell?: (row: any, index?: number) => React.ReactNode;
};

export interface ColsType {
  buku_peraturan_di_desa: ColumnDef[];
  buku_keputusan_kepala_desa: ColumnDef[];
  buku_inventaris_dan_kekayaan_desa: ColumnDef[];
  buku_aparat_pemerintah_desa: ColumnDef[];
  buku_tanah_kas_desa: ColumnDef[];
  buku_tanah_di_desa: ColumnDef[];
  buku_agenda: ColumnDef[];
  buku_ekspedisi: ColumnDef[];
  buku_lembaran_desa_dan_berita_desa: ColumnDef[];
}

export type IAdministrasiType = keyof ColsType;
