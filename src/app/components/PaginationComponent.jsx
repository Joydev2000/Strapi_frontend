'use client';

import ReactPaginate from 'react-paginate';
import { useRouter, useSearchParams } from 'next/navigation';

export default function PaginationComponent({ 
  totalPages, 
  currentPage, 
  totalItems,
  basePath = '/Blogs_withcategory' 
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageClick = (event) => {
    const newPage = event.selected + 1; // react-paginate uses 0-based indexing
    
    // Create new URLSearchParams to preserve other query parameters
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    
    // Navigate to the new page
    router.push(`${basePath}?${params.toString()}`);
  };

  // Don't render pagination if there's only one page or no pages
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex flex-col items-center mt-6 space-y-4">
      {/* Pagination Controls */}
      <ReactPaginate
        breakLabel="..."
        nextLabel="Next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        pageCount={totalPages}
        previousLabel="< Previous"
        renderOnZeroPageCount={null}
        forcePage={currentPage - 1} // react-paginate uses 0-based indexing
        
        // Custom CSS classes
        containerClassName="flex items-center space-x-1"
        pageClassName="px-3 py-2 rounded border bg-gray-200 hover:bg-gray-300 cursor-pointer transition-colors"
        pageLinkClassName="block w-full h-full text-center text-gray-700 hover:text-gray-900"
        activeClassName="bg-blue-500 text-white hover:bg-blue-600"
        activeLinkClassName="text-white"
        previousClassName="px-3 py-2 rounded border bg-gray-200 hover:bg-gray-300 cursor-pointer transition-colors"
        previousLinkClassName="block w-full h-full text-center text-gray-700 hover:text-gray-900"
        nextClassName="px-3 py-2 rounded border bg-gray-200 hover:bg-gray-300 cursor-pointer transition-colors"
        nextLinkClassName="block w-full h-full text-center text-gray-700 hover:text-gray-900"
        disabledClassName="opacity-50 cursor-not-allowed"
        disabledLinkClassName="text-gray-400"
        breakClassName="px-3 py-2 text-gray-500"
        breakLinkClassName="block w-full h-full text-center"
      />
      
      {/* Page Info */}
      <div className="text-sm text-gray-600">
        Page {currentPage} of {totalPages} ({totalItems} total items)
      </div>
    </div>
  );
}
