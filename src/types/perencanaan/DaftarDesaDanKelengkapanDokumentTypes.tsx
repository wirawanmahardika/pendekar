export type BlankoPerencanaan = {
    total_rpjmdes: number;
    data: BlankoDocument[];
}

export type BlankoDocument = {
    id: number;
    modul: string;
    filename: string;
}


export type DesaOption = {
    id: number;
    deskel: string;
}

export type FilterState = {
    tahun: string;
    kecamatan: string;
    desa: string;
    progress: string;
};

export type KecamatanOption = {
    k3: string;
    kecamatan: string;
    k4_list: string[];
    deskel_list: string[];
}

export type KelengkapanDokumen = {
    kode: string;
    k3: string;
    kecamatan: string;
    k4: string;
    desa: string;
    data_per_tahun: [
        {
            tahun: string;
            rpjmdes: number[];
            rkpdes: number[];
            apbdes: number[];
        }
    ]

}

export type TransformedData = {
    kecamatan: string;
    desa: string;
    tahun: string;
    rpjmdes: number[];
    rkpdes: number[];
    apbdes: number[];
    progress: number;
}
