// app/Blogs/[id]/page.js

import blogs from "../../data/Blogs"; // adjust the path if needed
import Link from "next/link";
import React from "react";

export async function generateMetadata({ params }) {
  const { data } = await blogs(1, 100);
  const blog = data.find((b) => b.slug === params.slug);

  if (!blog) {
    return {
      title: 'Blog Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  return {
    title: blog.Meta_Tittle || blog.Title,
    description: blog.Meta_Description || 'Read this interesting blog post at MyGovindas.',
  };
}

export default async function BlogDetailPage({ params }) {
  // Get all blogs by setting a large pageSize
  const { data } = await blogs(1, 100);
  const blog = data.find((b) => b.slug === params.slug);


  

  if (!blog) {
    return (
      <div className="container mx-auto p-4 mt-20">
        <h1 className="text-2xl font-bold mb-4">Blog not found</h1>
        <Link href="/Blogs" className="text-blue-500 hover:underline">
          Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 mt-20">
      <div>
        <h1 className="text-4xl font-bold mb-6">{blog.Title}</h1>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img
  src={
    blog.Features_Image?.url
      ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${blog.Features_Image.url}`
      : "/placeholder.jpg"
  }
  alt={blog.Title}
  className="w-full h-96 object-contain"
/>
          <div className="p-6">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
              {blog.category}
            </span>
            <div
              className="mt-4 text-gray-700 text-lg leading-relaxed prose max-w-none [&_img]:w-full [&_img]:h-auto"
              dangerouslySetInnerHTML={{ __html: blog.Description}}
            />

            <div className="mt-6">
              <Link href="/Blogs" className="text-blue-500 hover:underline">
                Back to Blogs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}