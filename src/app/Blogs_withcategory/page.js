import PaginationComponent from '../components/PaginationComponent';

export default async function BlogPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const currentPage = Number(resolvedSearchParams?.page) || 1;
  const pageSize = 5;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/blog-categories?populate=blogs&pagination[page]=${currentPage}&pagination[pageSize]=${pageSize}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
      },
      cache: 'no-store',
    }
  );

  const { data: posts, meta } = await res.json();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Blog Categories</h1>

      <ul className="space-y-2">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <li key={post.id} className="border p-4">
              <h3 className="font-semibold">
                {post.Name || 'Untitled'}
              </h3>
              {post.createdAt && (
                <p className="text-sm text-gray-500 mt-1">
                  Created: {new Date(post.createdAt).toLocaleDateString()}
                </p>
              )}
              {post.blogs && post.blogs.length > 0 && (
                <p className="text-sm text-blue-600 mt-1">
                  {post.blogs.length} blog{post.blogs.length !== 1 ? 's' : ''}
                </p>
              )}
            </li>
          ))
        ) : (
          <li className="border p-4 text-gray-500">No blog categories found.</li>
        )}
      </ul>

      {/* Pagination Controls using react-paginate */}
      <PaginationComponent
        totalPages={meta.pagination.pageCount}
        currentPage={currentPage}
        totalItems={meta.pagination.total}
        basePath="/Blogs_withcategory"
      />
    </div>
  );
}
