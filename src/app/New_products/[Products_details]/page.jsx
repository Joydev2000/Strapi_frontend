import Link from 'next/link'
import React from 'react'

async function page({ params }) {
  const res = await fetch(`https://fakestoreapi.com/products?limit=20`)
  const products = await res.json()
  const product = products.find(p => p.id === parseInt(params.Products_details))
  
  // Decode the URL parameter (e.g., %20 → space)
  // const decodedTitle = decodeURIComponent(params.Products_details)

  // // Find the product by matching the title
  // const product = products.find(p => p.title === decodedTitle)

  // console.log("Decoded Title:", decodedTitle)
  // console.log("Found Product:", product)

  // Handle case where product is not found
  if (!product) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <img src={product.image} alt={product.title} className="w-48 h-48 object-contain mb-4 mx-auto" />
        <h2 className="text-xl text-gray-600 mb-2">{product.title}</h2>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg text-gray-600 font-semibold">${product.price}</span>
          <Link href={`/cart/${product.id}`} className="bg-blue-500 text-white px-4 py-2 rounded">
            Add to Cart
          </Link>
        </div>
      </div>
    </div>
  )
}

export default page
