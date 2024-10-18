import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts, addToCart, addProduct, deleteProduct } from '../redux/actions'
import { PlusCircle, Trash2 } from 'lucide-react'

const ProductsPage = () => {
  const dispatch = useDispatch()
  const { products, status, error } = useSelector(state => state.products)
  const isAdmin = useSelector(state => state.auth.user?.isAdmin)
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const [newProduct, setNewProduct] = useState({ name: '', description: '', img: '', prix: '' })

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  const handleAddProduct = (e) => {
    e.preventDefault()
    dispatch(addProduct({ ...newProduct, prix: parseFloat(newProduct.prix) }))
    setNewProduct({ name: '', description: '', img: '', prix: '' })
  }

  const handleDeleteProduct = (productId) => {
    dispatch(deleteProduct(productId))
  }

  if (status === 'loading') return <div className="text-center mt-8">Loading...</div>
  if (status === 'failed') return <div className="text-center mt-8 text-red-500">Error: {error}</div>

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      
      {isAdmin && (
        <form onSubmit={handleAddProduct} className="mb-8 p-4 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
              className="border rounded px-3 py-2"
              required
            />
            <input
              type="number"
              placeholder="Price"
              value={newProduct.prix}
              onChange={(e) => setNewProduct({...newProduct, prix: e.target.value})}
              className="border rounded px-3 py-2"
              required
            />
            <input
              type="text"
              placeholder="Description"
              value={newProduct.description}
              onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
              className="border rounded px-3 py-2"
              required
            />
            <input
              type="url"
              placeholder="Image URL"
              value={newProduct.img}
              onChange={(e) => setNewProduct({...newProduct, img: e.target.value})}
              className="border rounded px-3 py-2"
              required
            />
          </div>
          <button type="submit" className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors flex items-center">
            <PlusCircle className="mr-2" size={18} />
            Add Product
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product.id} className="border rounded-lg p-4 flex flex-col justify-between bg-white shadow-md">
            <div>
              <img src={product.img} alt={product.name} className="w-full h-48 object-contain mb-4" />
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-2">${product.prix.toFixed(2)}</p>
              <p className="text-gray-500 text-sm mb-4">{product.description.slice(0, 100)}...</p>
            </div>
            <div className="flex justify-between items-center">
              {isAdmin &&  (
              <button
                onClick={() => dispatch(addToCart(product))}
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
              >
                Add to Cart
              </button> )}
              {isAdmin &&  (
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductsPage