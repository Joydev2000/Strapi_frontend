import Link from 'next/link';

const Pagination = ({ 
  currentPage, 
  totalItems = 0,
  itemsPerPage = 6,
  baseUrl,
  className = ''
}) => {
  // Calculate total pages
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  // Don't show pagination if there's only one page
  if (totalPages <= 1) return null;

  // Generate page numbers to display
  const pageNumbers = [];
  const maxPagesToShow = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  if (endPage - startPage + 1 < maxPagesToShow) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={`flex flex-col items-center justify-center space-y-4 ${className}`}>
      {/* Page Info */}
      <div className="text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center space-x-2">
        {/* First Page */}
        {currentPage > 1 && (
          <Link
            href={`${baseUrl}?page=1`}
            className="px-3 py-1 rounded bg-blue-500 hover:bg-blue-600 text-white transition-colors"
          >
            First
          </Link>
        )}

        {/* Previous Page */}
        {currentPage > 1 ? (
          <Link
            href={`${baseUrl}?page=${currentPage - 1}`}
            className="px-3 py-1 rounded bg-blue-500 hover:bg-blue-600 text-white transition-colors"
          >
            Previous
          </Link>
        ) : (
          <button
            disabled
            className="px-3 py-1 rounded bg-gray-300 cursor-not-allowed"
          >
            Previous
          </button>
        )}

        {/* Page Numbers */}
        {pageNumbers.map(number => (
          <Link
            key={number}
            href={`${baseUrl}?page=${number}`}
            className={`px-3 py-1 rounded transition-colors ${
              currentPage === number 
                ? 'bg-blue-600 text-white'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            {number}
          </Link>
        ))}

        {/* Next Page */}
        {currentPage < totalPages ? (
          <Link
            href={`${baseUrl}?page=${currentPage + 1}`}
            className="px-3 py-1 rounded bg-blue-500 hover:bg-blue-600 text-white transition-colors"
          >
            Next
          </Link>
        ) : (
          <button
            disabled
            className="px-3 py-1 rounded bg-gray-300 cursor-not-allowed"
          >
            Next
          </button>
        )}

        {/* Last Page */}
        {currentPage < totalPages && (
          <Link
            href={`${baseUrl}?page=${totalPages}`}
            className="px-3 py-1 rounded bg-blue-500 hover:bg-blue-600 text-white transition-colors"
          >
            Last
          </Link>
        )}
      </div>

      {/* Page Info */}
      <div className="text-sm text-gray-500">
        Showing {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} items
      </div>
    </div>
  );
};

export default Pagination;