import Link from "next/link";
import blogs from "../data/Blogs";
import Pagination from "../components/Pagination";
// import Pagination from "../components/Pagination_button";

export default async function Page({ searchParams }) {
  const currentPage = Number(searchParams?.page) || 1;
  const { data, total } = await blogs(currentPage);
  
  if (!data || data.length === 0) {
    return (
      <div className="container mx-auto p-4 mt-20">
        <h1 className="text-2xl font-bold mb-4">Blog not found</h1>
      </div>
    );
  }

  return (
    <div className="w-full mt-20 p-4 min-h-screen flex justify-center items-center">
      <div>
        <h2 className="text-6xl font-bold text-center py-9">Our Recent Blogs</h2>
        <div className="container mx-auto grid mt-4 mb-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.length > 0 ? (
            data.map((blog) => (
              <div key={blog.id} className="bg-white rounded-lg shadow p-6">
                <img 
                  src={
                    blog.Features_Image?.url
                      ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${blog.Features_Image.url}`
                      : "/placeholder.jpg"
                  }
                  alt={blog.Features_Image?.hash || blog.Title || "Blog image"} 
                  className="w-full h-48 object-contain mb-4" 
                />
                <h2 className="text-xl text-gray-700 font-semibold mb-2">{blog.Title}</h2>
                <div 
                  className="text-gray-600 mb-4 text-[1.2em] prose prose-sm max-w-none line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: blog.Description}}
                />
                <Link href={`/Blog/${blog.slug}`} className="text-blue-500 hover:underline">
                  Read More
                </Link>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 text-xl py-10">
              No blogs found.
            </div>
          )}
        </div>

        <Pagination 
          currentPage={currentPage}
          totalItems={total}
          itemsPerPage={6}
          baseUrl="/Blogs"
        />
      </div>
    </div>
  );
}

