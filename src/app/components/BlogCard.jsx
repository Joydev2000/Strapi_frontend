import Link from 'next/link';
import Image from 'next/image';

/**
 * A component to display a single blog card.
 *
 * Note: This component uses dangerouslySetInnerHTML for the blog description.
 * Ensure that the HTML content fetched from the CMS is properly sanitized
 * on the server to prevent XSS (Cross-Site Scripting) attacks.
 * Libraries like DOMPurify can be used for this purpose.
 */
const BlogCard = ({ blog }) => {
  // Destructure for cleaner access to blog properties
  const { Title, Description, Features_Image, slug } = blog;

  // Centralize image URL construction for clarity
  const imageUrl = Features_Image?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${Features_Image.url}`
    : "/placeholder.jpg"; // Fallback to a placeholder image

  // Provide a more descriptive alt text, falling back to a generic one
  const imageAlt = Features_Image?.hash || Title || "Blog post image";

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
      <div className="relative w-full h-48">
        {/* Use Next.js Image component for automatic optimization, lazy loading, and better performance */}
        <Image
          src={imageUrl}
          alt={imageAlt}
          layout="fill"
          objectFit="contain"
          className="rounded-t-lg"
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h2 className="text-xl text-gray-800 font-semibold mb-2">{Title}</h2>
        
        {/* Conditionally render the description and handle potentially unsafe HTML */}
        {Description && (
          <div
            className="text-gray-600 mb-4 prose prose-sm max-w-none line-clamp-3"
            dangerouslySetInnerHTML={{ __html: Description }}
          />
        )}
        
        {/* Ensure a link is only rendered if a slug is available */}
        {slug && (
          <Link href={`/Blog/${slug}`} className="text-blue-600 hover:underline mt-auto pt-2">
            Read More
          </Link>
        )}
      </div>
    </div>
  );
};

export default BlogCard;