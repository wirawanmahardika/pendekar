export interface Kecamatan {
  kode_wilayah: string;
  k1: string;
  k2: string;
  k3: string;
  k4: string;
  nama_kecamatan: string;
}

export interface Desa {
  kode_wilayah: string;
  k1: string;
  k2: string;
  k3: string;
  k4: string;
  nama_kecamatan: string;
  nama_deskel: string;
  jumlah_penduduk: string | number;
  jumlah_kk: string | number;
  pria: string | number;
  wanita: string | number;
  jml_wktp: string | number;
  u0?: string | number;
  u5?: string | number;
  u10?: string | number;
  u15?: string | number;
  u20?: string | number;
  u25?: string | number;
  u30?: string | number;
  u35?: string | number;
  u40?: string | number;
  u45?: string | number;
  u50?: string | number;
  u55?: string | number;
  u60?: string | number;
  u65?: string | number;
  u70?: string | number;
  u75?: string | number;
  islam?: string | number;
  kristen?: string | number;
  katholik?: string | number;
  hindu?: string | number;
  budha?: string | number;
  konghucu?: string | number;
  kepercayaan?: string | number;
  belum_kawin?: string | number;
  kawin?: string | number;
  cerai_hidup?: string | number;
  cerai_mati?: string | number;
  tidak_blm_sekolah?: string | number;
  belum_tamat_sd?: string | number;
  tamat_sd?: string | number;
  sltp?: string | number;
  slta?: string | number;
  d1_dan_d2?: string | number;
  d3?: string | number;
  s1?: string | number;
  s2?: string | number;
  s3?: string | number;
  wiraswasta?: string | number;
  pelajar_mahasiswa?: string | number;
  mengurus_rumah_tangga?: string | number;
  belum_tidak_bekerja?: string | number;
  guru?: string | number;
  nelayan?: string | number;
  perawat?: string | number;
  perdagangan?: string | number;
  pensiunan?: string | number;
}

export interface KependudukanData {
  last_updated: string;
  list_kecamatan: Kecamatan[];
  list_desa: Desa[];
}

export type chartTypes = 'umur' | 'pendidikan' | 'perkawinan' | 'agama' | 'pekerjaan';

export interface CustomChartData {
  categories: string[];
  data: number[];
}


export interface PopulasiTableSectionProps {
  filteredDesa: Desa[];
  kecamatanList: Kecamatan[] | undefined;
  selectedKecamatan: string;
  setSelectedKecamatan: (value: string) => void;
  selectedDesa: string;
  setSelectedDesa: (value: string) => void;
  searchText: string;
  setSearchText: (value: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  itemsPerPage: number;
  availableDesaOptions: { value: string; label: string }[];
}

export interface BarChartProps {
  type: chartTypes;
  customData: CustomChartData | null;
}