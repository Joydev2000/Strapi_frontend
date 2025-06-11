import React from 'react'

async function page({ params }) {
  const res = await fetch(`https://fakestoreapi.com/products?limit=10`)
  const products = await res.json()
  const product = products.find(p => p.id === parseInt(params.Cart))
  
 

  return (
    <div className="container min-h-screen flex justify-center items-center mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center space-x-4">
          <img src={product.image} alt={product.title} className="w-24 h-24 object-contain" />
          <div>
            <h2 className="text-xl font-semibold">{product.title}</h2>
            <p className="text-gray-600">${product.price + "50"}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page

