const Pagination = ({ page, pageSize, totalItems, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  const handleNextPage = () => {
    onPageChange(page + 1);
  };

  const handlePageChange = (page) => {
    onPageChange(page);
  };

  return (
    <section className="container mx-auto flex justify-center items-center my-8">
      <button
        className="mr-2 px-2 py-1 border border-gray-300 rounded"
        disabled={page === 1}
        onClick={() => handlePageChange(page - 1)}
      >
        Previous
      </button>
      <span className="mx-2">{`Page ${page} of ${totalPages}`}</span>
      <button
        className="ml-2 px-2 py-1 border border-gray-300 rounded"
        disabled={page === totalPages}
        onClick={() => handlePageChange(page + 1)}
      >
        Next
      </button>
    </section>
  );
};

export default Pagination;
