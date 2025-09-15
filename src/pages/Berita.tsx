import PageTitle from "../components/PageTitle";
import useAuth from "../hooks/useAuth";
import ListBerita from "../components/berita/ListBerita";
import LoadingDots from "../components/LoadingDots";
import HeadHtml from "../components/HeadHtml";
import useBerita from "../hooks/berita/useBerita";
import FilterBerita from "../components/berita/Filter";

export default function Berita() {
    useAuth()

    const { loading, dataTodisplay, search, dataBerita, setSearch } = useBerita()
    if (loading) return <LoadingDots />

    return <div className="px-4 py-10">
        <HeadHtml title="Berita" />
        <PageTitle title="BERITA" last_updated={dataBerita?.last_updated} />
        <div className="flex mt-9 flex-col bg-white p-4 rounded shadow">
            <span className="font-bold text-2xl">Berita Desa Terbaru</span>
            <FilterBerita dataBerita={dataBerita} search={search} setSearch={setSearch} />
            <ListBerita data={dataTodisplay} />
        </div>
    </div>
}
