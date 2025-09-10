export type umkmDataType = {
    last_updated: Date;
    list_desa: any[];
    list_umkm: any[];
    list_kecamatan: any[];
    jenis_umkm: any[];
}

export type umkmCardType = {
    alamat: string;
    foto: string;
    kode_wilayah: string;
    nama_deskel: string;
    nama_kecamatan: string;
    nama_usaha: string;
    tipe_usaha: string;
    map: string;
}

export type umkmChartType = {
    "barang_&_jasa": number;
    "elektronik_&_gadget": number;
    kelautan: number;
    kendaraan: number;
    keperluan_pribadi: number;
    "makanan_&_minuman": number;
    pertanian: number;
    peternakan: number;
    properti: number;
    rumah_tangga: number;
    sembako: number;
}

export type desaKecamatanChartType = {
    jml_umkm?: string;
    k1?: string;
    k2?: string;
    k3?: string;
    k4?: string;
    kode_wilayah?: string;
    nama_kecamatan?: string;
    nama_deskel?: string;
    online?: string;

    "barang_&_jasa": string;
    "elektronik_&_gadget": string;
    kelautan: string;
    kendaraan: string;
    keperluan_pribadi: string;
    "makanan_&_minuman": string;
    pertanian: string;
    peternakan: string;
    properti: string;
    rumah_tangga: string;
    sembako: string;
}