import { usePaginationStore } from "@/stores/use-pagination-store";

export const usePaginationControls = () => {
  // Import from usePaginationStore
  const { skip, take, totalCount, setSkip } = usePaginationStore();

  // Define current page && total page
  const currentPage = Math.floor(skip / take) + 1;
  const totalPage = Math.ceil(totalCount / take);

  // Handle to prev page
  const handlePrevPage = () => {
    if (currentPage > 1) setSkip(skip - take);
  };

  // Handle to next page
  const handleNextPage = () => {
    if (currentPage < totalPage) {
      setSkip(skip + take);
    }
  };

  // Handle to first page
  const handleFirstPage = () => {
    if (currentPage > 1) {
      setSkip(0);
    }
  };

  // Handle to last page
  const handleLastPage = () => {
    if (currentPage < totalPage) {
      setSkip((totalPage - 1) * take);
    }
  };

  return {
    currentPage,
    totalPage,
    handleFirstPage,
    handlePrevPage,
    handleNextPage,
    handleLastPage,
  };
};
