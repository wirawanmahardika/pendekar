import { BiSearch } from "react-icons/bi";
import PageTitle from "../components/PageTitle";
import useAuth from "../hooks/useAuth";
import { AxiosAuth } from "../utils/axios";
import { useEffect, useState } from "react";
import { BASE_API_URL } from "../utils/api";
import useGetResultData from "../hooks/useGetResultData";
import { beritaCardType } from "../types/BeritaTypes";
import { wisataDataType } from "../types/WisataTypes";
import ListBerita from "../components/berita/ListBerita";

export default function Berita() {
    useAuth()

    const resultData = useGetResultData<wisataDataType>(`${BASE_API_URL}berita?k3=&k4=&search=&limit=100`)
    const [search, setSearch] = useState({ text: "", kecamatan: "", desa: "" })
    const [dataTodisplay, setDataToDisplay] = useState<beritaCardType[]>()


    useEffect(() => {
        const idTimeout = setTimeout(() => {
            AxiosAuth
                .get(`${BASE_API_URL}berita?k3=${search.kecamatan}&k4=${search.desa}&search=${search.text}&limit=100`)
                .then((result) => {
                    setDataToDisplay(result.data.data.list_berita)
                })
                .catch((error) => alert(error.message))
        }, 500);
        return () => clearTimeout(idTimeout)
    }, [search])



    const listKecamatan = resultData?.list_kecamatan.map(d => {
        return <option key={d.kode_wilayah} value={d.k3}>{d.nama_kecamatan}</option>
    })

    const listDesa = resultData?.list_desa.map(d => {
        if (d.k3 === search.kecamatan) return <option key={d.kode_wilayah} value={d.k4}>{d.nama_deskel}</option>
    })

    const pencarianChangeEvenet = (e: any) => {
        setSearch(p => ({ ...p, text: e.target.value }))
    }

    const kecamatanChangeEvent = (e: any) => {
        setSearch(p => ({ ...p, kecamatan: e.target.value, desa: "" }))
    }

    const desaChangeEvent = (e: any) => {
        setSearch(p => ({ ...p, desa: e.target.value }))
    }

    return <div className="px-4 py-10">
      <PageTitle title="BERITA"  last_updated={ resultData?.last_updated }/>

        <div className="flex mt-9 flex-col bg-white p-4 rounded shadow">
            <span className="font-bold text-2xl">Berita Desa Terbaru</span>
            <div className="flex gap-x-5 mt-4 justify-between">
                <div className="flex relative w-1/3">
                    <input onChange={pencarianChangeEvenet} type="text" placeholder="Cari Desa/Kelurahan..." className="focus:border-blue-400 focus:shadow border bg-white text-sm border-slate-300 rounded text-neutral-600 w-full outline-none pl-2 pr-10 py-1" />
                    <BiSearch className="absolute right-2 top-1/2 -translate-y-1/2 size-6 fill-slate-600" />
                </div>

                <select onChange={kecamatanChangeEvent} className="focus:border-blue-400 focus:shadow border text-sm bg-white border-slate-300 rounded text-neutral-600 w-1/3 outline-none pl-2 pr-4 py-1">
                    <option value="">Semua Kecamatan</option>
                    {listKecamatan}
                </select>

                <select onChange={desaChangeEvent} className="focus:border-blue-400 mr-auto focus:shadow border text-sm bg-white border-slate-300 rounded text-neutral-600 w-1/3 outline-none pl-2 pr-4 py-1">
                    <option value="">Semua Desa</option>
                    {listDesa}
                </select>
            </div>

            <ListBerita data={dataTodisplay} />
            {/* <div className="flex mt-5 flex-col gap-y-5">
                {
                    dataTodisplay?.map(b => {
                        return <BeritaCard
                            key={b.id}
                            kode_wilayah={b.kode_wilayah}
                            foto={b.foto}
                            judul={b.judul}
                            isi={b.isi}
                            url={"https://" + b.slug_desa + ".digitaldesa.id/wisata/" + b.slug}
                        />
                    })
                }
            </div>


            <div className="flex mt-4 justify-center">
                <div className="join">
                    <button className="join-item btn bg-white text-gray-800">{"<<"}</button>
                    <button className="join-item btn bg-white text-gray-800">1</button>
                    <button className="join-item btn bg-white text-gray-800">...</button>
                    <button className="join-item btn bg-white text-gray-800">9</button>
                    <button className="join-item btn bg-white text-gray-800">{">>"}</button>
                </div>
            </div> */}
        </div>
    </div>
}
