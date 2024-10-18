import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
  },
  reducers: {
    login: (state, action) => {
      if (action.payload.email === 'admin@example.com' && action.payload.password === 'admin123') {
        state.user = { email: action.payload.email, isAdmin: true }
        state.isAuthenticated = true
      } else if (action.payload.email === 'user@example.com' && action.payload.password === 'user123') {
        state.user = { email: action.payload.email, isAdmin: false }
        state.isAuthenticated = true
      }
    },
    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
    },
  },
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer