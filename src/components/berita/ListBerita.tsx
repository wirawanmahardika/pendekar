import { useState,  useEffect } from "react";
import { exportReportButtonStyle } from "../../utils/themeSetting";
import { beritaCardType } from "../../types/BeritaTypes";

export default function ListBerita({ data }: { data?: beritaCardType[] }) {
    if (!data) return;

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const paginatedData = data.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const changePage = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    useEffect(() => {
        if (currentPage > totalPages) setCurrentPage(1)
    }, [data])

    return (
        <>
            <div className="flex mt-5 flex-col gap-y-5">

                {paginatedData.map((item) => {
                    return <div className="flex gap-x-3 items-center">
                        <img
                            className="w-1/6 rounded"
                            src={`https://cdn.digitaldesa.com/uploads/profil/${item.kode_wilayah}/berita/thumbs/${item.foto}`}
                            alt="berita"
                        />

                        <div className="flex flex-col gap-y-1">
                            <a href={"https://" + item.slug_desa + ".digitaldesa.id/wisata/" + item.slug} className="font-semibold text-lg text-blue-900">{item.judul}</a>
                            <span className="text-sm line-clamp-2">{item.isi}</span>
                        </div>
                    </div>
                })}
            </div>


            <div className="flex mt-4 justify-center">
                <div className="join">
                    <button
                        style={exportReportButtonStyle}
                        className="join-item btn disabled:!bg-stone-100 disabled:!text-stone-400 text-lg disabled:!cursor-not-allowed text-gray-500  shadow-none"
                        onClick={() => changePage(1)}
                        disabled={currentPage === 1}
                    >
                        {"<<"}
                    </button>
                    <button
                        style={exportReportButtonStyle}
                        className="join-item btn disabled:!bg-stone-100 disabled:!text-stone-400 text-lg disabled:!cursor-not-allowed text-gray-500  shadow-none"
                        onClick={() => changePage(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        {"<"}
                    </button>

                    {Array.from({ length: totalPages }).map((_, idx) => {
                        const page = idx + 1;
                        return (
                            <button
                                key={page}
                                className={`join-item btn ${page === currentPage ? "bg-blue-500 text-white" : "bg-white text-gray-800 disabled:border-black shadow-none"
                                    }`}
                                onClick={() => changePage(page)}
                            >
                                {page}
                            </button>
                        );
                    })}

                    <button
                        style={exportReportButtonStyle}
                        className="join-item btn disabled:!bg-stone-100 disabled:!text-stone-400 text-lg disabled:!cursor-not-allowed text-gray-500  shadow-none"
                        onClick={() => changePage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        {">"}
                    </button>
                    <button
                        style={exportReportButtonStyle}
                        className="join-item btn disabled:!bg-stone-100 disabled:!text-stone-400 text-lg disabled:!cursor-not-allowed text-gray-500  shadow-none"
                        onClick={() => changePage(totalPages)}
                        disabled={currentPage === totalPages}
                    >
                        {">>"}
                    </button>
                </div>
            </div>
        </>
    );
}
