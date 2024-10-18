import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import Navbar from './components/Navbar'
import ProductsPage from './components/ProductsPage'
import CartPage from './components/CartPage'
import AuthPage from './components/AuthPage'
import productReducer from './redux/productSlice'
import cartReducer from './redux/cartSlice'
import authReducer from './redux/authSlice'

const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    auth: authReducer,
  },
})

function App() {
  return (
    
    <Provider store={store}>
      {/*Hello*/}
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <Routes>
            <Route path="/" element={<ProductsPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/auth" element={<AuthPage />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  )
}

export default App