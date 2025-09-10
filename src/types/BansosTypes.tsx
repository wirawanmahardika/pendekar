export type bansosType = {
    last_updated: Date
    list_bansos: any[]
    list_desa: any[]
    list_kabupaten: any[]
    list_kecamatan: any[]

}

export type desaBansos = {
    kode_wilayah: string;
    nama_kecamatan: string;
    nama_deskel: string;
    jenis_bansos: string;
    jml_penerima: number;
    jml_penerima_kk: number;
    link: string;
}


export type SortKeyBansos = "nama_kecamatan" | "nama_deskel";
