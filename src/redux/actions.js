import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = 'http://localhost:3000'

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await axios.get(`${API_URL}/products`)
    return response.data
  }
)

export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (product) => {
    const response = await axios.post(`${API_URL}/products`, {
      name: product.name,
      description: product.description,
      img: product.img,
      prix: product.prix
    })
    return response.data
  }
)

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (productId) => {
    await axios.delete(`${API_URL}/products/${productId}`)
    return productId
  }
)

export const addToCart = (product) => ({
  type: 'cart/addToCart',
  payload: {
    id: product.id,
    name: product.name,
    prix: product.prix,
    img: product.img,
    quantity: 1
  }
})

export const removeFromCart = (productId) => ({
  type: 'cart/removeFromCart',
  payload: productId
})

export const updateQuantity = (productId, quantity) => ({
  type: 'cart/updateQuantity',
  payload: { productId, quantity }
})

export const login = (credentials) => ({
  type: 'auth/login',
  payload: credentials
})

export const logout = () => ({
  type: 'auth/logout',
})

