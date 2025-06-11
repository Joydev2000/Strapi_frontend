import Link from 'next/link'

export default function page() {
  return (
    <div>
      <header className="bg-white  shadow-md fixed top-0 z-[99] w-full py-3">
        <nav className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-gray-800">
                MyStore
              </Link>
            </div>
            
            <div className="hidden md:flex space-x-6">
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                Home
              </Link>
              <Link href="/Products" className="text-gray-600 hover:text-gray-900">
                Products
              </Link>
              <Link href="/About" className="text-gray-600 hover:text-gray-900">
                About
              </Link>
              <Link href="/Blog" className="text-gray-600 hover:text-gray-900">
                Blogs
              </Link>
              <Link href="/Contact" className="text-gray-600 hover:text-gray-900">
                Blogs
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-gray-900">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
              <button className="text-gray-600 hover:text-gray-900">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}

