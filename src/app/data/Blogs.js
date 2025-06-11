const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
const TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN;

const blogs = async (page = 1, pageSize = 6) => {
  try {
    const res = await fetch(`${API_URL}/api/blogs?populate=*`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      next: {
        revalidate: 30, // ⏱ ISR: Regenerate the page every 60 seconds
      },
    });
    
    if (!res.ok) return { data: [], total: 0 };
    
    const response = await res.json();
    const allData = response?.data || [];
    
    // Calculate pagination
    const total = allData.length;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = allData.slice(startIndex, endIndex);

    return {
      data: paginatedData,
      total: total
    };
  } catch (error) {
    return { data: [], total: 0 };
  }
};

export default blogs;