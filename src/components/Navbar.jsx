import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ShoppingCart, Package, User } from 'lucide-react'

const Navbar = () => {
  const cartItemsCount = useSelector(state => state.cart.items.length)
  const isAdmin = useSelector(state => state.auth.user?.isAdmin)
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)



  return (
    <nav className="bg-indigo-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">E-Shop</Link>
        <div className="flex space-x-4">
          <Link to="/products" className="flex items-center">
            <Package className="mr-1" />
            Products
          </Link>
          <Link to="/cart" className="flex items-center">
            <ShoppingCart className="mr-1" />
            Cart ({cartItemsCount})
          </Link>
          <Link to="/auth" className="flex items-center">
            <User className="mr-1" />
            {isAuthenticated ? isAdmin ? 'Admin' : 'User' : 'Login'}
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar