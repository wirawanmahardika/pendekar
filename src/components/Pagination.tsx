import { JSX, useEffect, useState } from "react";
import { exportReportButtonStyle } from "../utils/themeSetting";

export default function Pagination<T>({ data, displayData }: { data: Array<T>, displayData: (pageData: T[]) => JSX.Element }) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const paginatedData = data.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    useEffect(() => {
        if (currentPage > totalPages) setCurrentPage(1);
    }, [data, totalPages, currentPage]);

    const changePage = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return <>
        {displayData(paginatedData)}

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

                {getPaginationRange(currentPage, totalPages).map((item, index) => {
                    if (typeof item === 'string') {
                        return (
                            <button
                                key={`ellipsis-${index}`}
                                className="join-item btn border text-gray-400"
                            >
                                ...
                            </button>
                        );
                    }

                    return (
                        <button
                            key={item}
                            className={`join-item btn ${item === currentPage
                                ? "bg-blue-500 text-white"
                                : "bg-white text-gray-800 shadow-none"
                                }`}
                            onClick={() => changePage(item)}
                        >
                            {item}
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
}


export function getPaginationRange(currentPage: number, totalPages: number) {
  const delta = 1; // jumlah halaman di kiri dan kanan currentPage
  const range = [];
  const rangeWithDots = [];

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - delta && i <= currentPage + delta)
    ) {
      range.push(i);
    }
  }

  let prev = 0;
  for (let i of range) {
    if (prev && i - prev !== 1) {
      rangeWithDots.push("...");
    }
    rangeWithDots.push(i);
    prev = i;
  }

  return rangeWithDots;
}

