
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

