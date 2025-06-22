// Fetch all blog categories
const Blog_category = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/blog-categories?populate=*`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
      },
      next: {
        revalidate: 30,
      },
    });

    if (!res.ok) return { data: [], total: 0 };

    const response = await res.json();
    const allData = response?.data || [];

    return {
      data: allData,
      total: allData.length
    };
  } catch (error) {
    return { data: [], total: 0 };
  }
};

// Fetch blogs by category with pagination
const BlogsByCategory = async (categoryId = null, page = 1, pageSize = 6) => {
  try {
    let url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/blogs?populate=*`;

    // Add category filter if categoryId is provided
    if (categoryId) {
      url += `&filters[blog_categories][id][$eq]=${categoryId}`;
    }

    // Add pagination parameters
    url += `&pagination[page]=${page}&pagination[pageSize]=${pageSize}`;

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
      },
      next: {
        revalidate: 30,
      },
    });

    if (!res.ok) return { data: [], pagination: { page: 1, pageSize, pageCount: 0, total: 0 } };

    const response = await res.json();

    return {
      data: response?.data || [],
      pagination: response?.meta?.pagination || { page: 1, pageSize, pageCount: 0, total: 0 }
    };
  } catch (error) {
    return { data: [], pagination: { page: 1, pageSize, pageCount: 0, total: 0 } };
  }
};

export default Blog_category;
export { BlogsByCategory };