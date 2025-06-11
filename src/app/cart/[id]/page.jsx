import React from 'react'

async function CartPage({ params }) {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${params.id}`)
    const product = await res.json()

    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center space-x-4">
            <img src={product.image} alt={product.title} className="w-24 h-24 object-contain" />
            <div>
              <h2 className="text-xl font-semibold">{product.title}</h2>
              <p className="text-gray-600">${product.price}</p>
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p className="text-red-500">Failed to load product details</p>
      </div>
    )
  }
}

export default CartPage 