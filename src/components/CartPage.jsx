import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart, updateQuantity } from '../redux/cartSlice'
import { Trash2, Plus, Minus } from 'lucide-react'

const CartPage = () => {
  const dispatch = useDispatch()
  const cartItems = useSelector(state => state.cart.items)

  const total = cartItems.reduce((sum, item) => sum + item.prix * item.quantity, 0)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map(item => (
            <div key={item.id} className="flex items-center border-b py-4">
              <img src={item.img} alt={item.name} className="w-16 h-16 object-contain mr-4" />
              <div className="flex-grow">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-600">${item.prix.toFixed(2)}</p>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => dispatch(updateQuantity({ productId: item.id, quantity: Math.max(1, item.quantity - 1) }))}
                    className="bg-gray-200 p-1 rounded"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    onClick={() => dispatch(updateQuantity({ productId: item.id, quantity: item.quantity + 1 }))}
                    className="bg-gray-200 p-1 rounded"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
          <div className="mt-6">
            <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
            <button className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition-colors">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartPage