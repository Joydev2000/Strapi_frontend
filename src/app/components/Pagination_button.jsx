import Link from 'next/link';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  baseUrl,
  className = ''
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className={`flex flex-col items-center justify-center space-y-4 ${className}`}>
      {/* Page Info */}
      <div className="text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center space-x-4">
        {/* First Page */}
        {currentPage > 1 && (
          <Link
            href={`${baseUrl}?page=1`}
            className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white transition-colors"
          >
            First
          </Link>
        )}

        {/* Previous Page */}
        {currentPage > 1 ? (
          <Link
            href={`${baseUrl}?page=${currentPage - 1}`}
            className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white transition-colors"
          >
            Previous
          </Link>
        ) : (
          <button
            disabled
            className="px-4 py-2 rounded bg-gray-300 cursor-not-allowed"
          >
            Previous
          </button>
        )}
        
        {/* Current Page Indicator */}
        <span className="text-gray-600 font-medium">
          {currentPage}
        </span>
        
        {/* Next Page */}
        {currentPage < totalPages ? (
          <Link
            href={`${baseUrl}?page=${currentPage + 1}`}
            className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white transition-colors"
          >
            Next
          </Link>
        ) : (
          <button
            disabled
            className="px-4 py-2 rounded bg-gray-300 cursor-not-allowed"
          >
            Next
          </button>
        )}

        {/* Last Page */}
        {currentPage < totalPages && (
          <Link
            href={`${baseUrl}?page=${totalPages}`}
            className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white transition-colors"
          >
            Last
          </Link>
        )}
      </div>

      {/* Page Size Info */}
      <div className="text-sm text-gray-500">
        Showing page {currentPage} of {totalPages}
      </div>
    </div>
  );
};

export default Pagination; 