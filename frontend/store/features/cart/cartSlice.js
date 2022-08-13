import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { HYDRATE } from 'next-redux-wrapper'

const API_URL = 'http://127.0.0.1:8000/api'

export const createAddress = createAsyncThunk(
  'cart/createAddress',
  async (
    {
      addressName,
      firstName,
      lastName,
      companyName,
      phoneNumber,
      streetAddress1,
      streetAddress2,
      postalCode,
      city,
      cityArea,
      country,
    },
    { getState, rejectWithValue }
  ) => {
    const currentUser = getState().auth.currentUser
    const token = currentUser.token

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }

      const response = await axios.post(
        `${API_URL}/account/customer/create/address/`,
        {
          address_name: addressName,
          first_name: firstName,
          last_name: lastName,
          company_name: companyName,
          phone_number: phoneNumber,
          street_address_1: streetAddress1,
          street_address_2: streetAddress2,
          postal_code: postalCode,
          city: city,
          city_area: cityArea,
          country: country,
        },
        config
      )

      if (response.status === 200) {
        return response.data
      }
    } catch (error) {
      if (error.response.data.detail) {
        return rejectWithValue(error.response.data.detail)
      } else {
        return rejectWithValue(error)
      }
    }
  }
)



export const createOrder = createAsyncThunk(
  'cart/createOrder',
  async (
    {
      cartItems,
      totalPrice,
      paymentMethod,
      shippingId,
      shippingMethod,
      shippingPrice,
    },
    { getState, rejectWithValue }
  ) => {
    const currentUser = getState().auth.currentUser
    const token = currentUser.token

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }

      const response = await axios.post(
        `${API_URL}/order/create/`,
        {
          cartItems: cartItems,
          total_price: totalPrice,
          payment_method: paymentMethod,
          shipping_address: shippingId,
          shipping_method: shippingMethod,
          shipping_price: shippingPrice,
        },
        config
      )

      if (response.status === 200) {
        return response.data
      }
    } catch (error) {
      if (error.response.data.detail) {
        return rejectWithValue(error.response.data.detail)
      } else {
        return rejectWithValue(error)
      }
    }
  }
)


export const getMyOrders = createAsyncThunk(
  'cart/getMyOrders',
  async (
    { user }, { getState, rejectWithValue }
  ) => {
    const currentUser = getState().auth.currentUser
    const userId = currentUser.id

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const response = await axios.get(
        `${API_URL}/order/orders/?user=${userId}`,
        config
      )

      if (response.status === 200) {
        return response.data
      }
    } catch (error) {
      if (error.response.data.detail) {
        return rejectWithValue(error.response.data.detail)
      } else {
        return rejectWithValue(error)
      }
    }
  }
)

const initialState = {
  cartItems: [],
  totalProducts: 0,
  subtotalPrice: 0,
  totalPrice: 0,
  paymentMethod: '',
  shippingAddress: {},
  shippingMethod: '',
  shippingPrice: 0,
  isAddressLoading: false,
  isAddressSuccess: false,
  isAddressError: false,
  isPaymentLoading: false,
  isPaymentSuccess: false,
  isPaymentError: false,
  isOrderLoading: false,
  isOrderSuccess: false,
  isOrderError: false,
  myOrders: [],
  isMyOrdersLoading:false,
  isMyOrdersSuccess:false,
  isMyOrdersError:false,
  actionMessage: ''
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id } = action.payload
      const existItem = state.cartItems.find((item) => item.id === id)

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                quantity: item.quantity + 1,
              }
            }
            return item
          }),
        }
      } else {
        /* action.payload["quantity"] = 1 */
        state.cartItems.push({ ...action.payload, quantity: 1 })
        state.totalProducts += 1
      }
    },

    removeFromCart: (state, action) => {
      const { id } = action.payload
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== id),
        totalProducts: state.totalProducts - 1,
      }
    },
    increment: (state, action) => {
      /* action ile id göndericez */
      return {
        ...state,
        cartItems: state.cartItems.map((item) => {
          if (item.id === action.payload) {
            return {
              ...item,
              quantity: item.quantity + 1,
            }
          }
          return item
        }),
      }
    },
    decrement: (state, action) => {
      /* action ile id göndericez */
      return {
        ...state,
        cartItems: state.cartItems.map((item) => {
          if (item.id === action.payload) {
            if (item.quantity > 1) {
              return {
                ...item,
                quantity: item.quantity - 1,
              }
            } else {
              return {
                ...state,
                cartItems: state.cartItems.filter(
                  (item) => item.id !== action.payload
                ),
              }
            }
          }
          return item
        }),
      }
    },
    getCartTotal: (state, action) => {
      let { subtotalPrice, totalProducts } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price_discounted, quantity } = cartItem
          const itemTotal = price_discounted * quantity

          cartTotal.subtotalPrice += itemTotal
          cartTotal.totalProducts += quantity
          return cartTotal
        },
        {
          subtotalPrice: 0,
          totalProducts: 0,
        }
      )
      state.subtotalPrice = subtotalPrice
      state.totalProducts = totalProducts
      state.totalPrice = subtotalPrice + state.shippingPrice
    },
    setPaymentMethod : (state, action) => {
      state.paymentMethod = action.payload
      state.isPaymentSuccess = true
    }
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      console.log('HYDRATE', state, action.payload)
      return {
        ...state,
        ...action.payload.some,
      }
    },
    [createAddress.pending]: (state, action) => {
      state.isAddressLoading = true
    },
    [createAddress.fulfilled]: (state, action) => {
      state.isAddressLoading = false
      state.isAddressSuccess = true
      state.shippingAddress = action.payload
      state.shippingMethod = 'Ship'
      state.shippingPrice = 25
    },
    [createAddress.rejected]: (state, action) => {
      state.isAddressLoading = false
      state.isAddressSuccess = false
      state.isAddressError = true
    },
    [createOrder.pending]: (state, action) => {
      state.isOrderLoading = true
    },
    [createOrder.fulfilled]: (state, action) => {
      state.isOrderLoading = false
      state.isOrderSuccess = true
      state.cartItems = []
      state.totalProducts = 0
      state.totalPrice = 0
      state.subtotalPrice = 0
      state.paymentMethod = ''
      state.shippingAddress = {}
      state.shippingMethod = ''
      state.shippingPrice = 0
      state.actionMessage = action.payload
      state.isAddressLoading = false
      state.isAddressSuccess = false
      state.isAddressError = false
      state.isPaymentLoading = false
      state.isPaymentSuccess = false
      state.isPaymentError = false

    },
    [createOrder.rejected]: (state, action) => {
      state.isOrderLoading = false
      state.isOrderSuccess = false
      state.isOrderError = true
    },
    [getMyOrders.pending]: (state, action) => {
      state.isMyOrdersLoading = true
    },
    [getMyOrders.fulfilled]: (state, action) => {
      state.isMyOrdersLoading = false
      state.isMyOrdersSuccess = true
      state.myOrders = action.payload
    },
    [getMyOrders.rejected]: (state, action) => {
      state.isMyOrdersLoading = false
      state.isMyOrdersSuccess = false
      state.isMyOrdersError = true
    },
  },
})

export const { addToCart, removeFromCart, increment, decrement, getCartTotal, setPaymentMethod } =
  cartSlice.actions
export default cartSlice.reducer
