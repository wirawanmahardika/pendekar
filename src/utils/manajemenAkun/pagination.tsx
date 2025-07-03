
interface PaginationSimpleProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export function ManajemenAkunPagination({ currentPage, totalPages, onPageChange }: PaginationSimpleProps) {
    if (totalPages <= 1) return null;
    return (
        <div className="flex justify-end items-center gap-x-3 mt-4">
            <button
                className="btn"
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >{"<"}</button>
            <span>Page</span>
            <select
                className="select w-fit"
                value={currentPage}
                onChange={e => onPageChange(Number(e.target.value))}
            >
                {Array.from({ length: totalPages }, (_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
            </select>
            <span>of {totalPages}</span>
            <button
                className="btn"
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >{">"}</button>
        </div>
    );
}