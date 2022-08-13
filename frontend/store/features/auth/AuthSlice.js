import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { HYDRATE } from "next-redux-wrapper";

const API_URL = 'http://127.0.0.1:8000/api'

export const registerCustomer = createAsyncThunk(
  'auth/registerCustomer',
  async (
    { email, firstName, lastName, password, passwordConfirm },
    { rejectWithValue }
  ) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const response = await axios.post(
        `${API_URL}/account/register/customer/`,
        {
          email: email,
          first_name: firstName,
          last_name: lastName,
          password: password,
          password2: passwordConfirm,
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

export const loginCustomer = createAsyncThunk(
  'auth/loginCustomer',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const response = await axios.post(
        `${API_URL}/token/`,
        {
          email: email,
          password: password,
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


export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (
    { firstName, lastName, email},
    { getState, rejectWithValue }
  ) => {
    const currentUser = getState().auth.currentUser
    const token = currentUser.token

    console.log(token)


    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
      
      const response = await axios.post(
        `${API_URL}/account/profile/update/identity/`,
        {
          email: email,
          first_name: firstName,
          last_name: lastName,
        },
        config
      )

      console.log("sonrası")

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

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    currentUser: null,
    isAuthenticated: false,
    isLoading: false,
    isSuccess: false,
    isError: false,
  },
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload
    },
    doLogout(state) {
      state.currentUser = {}
      state.isAuthenticated = false
      
    },
    
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      console.log("HYDRATE", state, action.payload)
      return {
        ...state,
        ...action.payload.some,
      }
    },
    [registerCustomer.pending]: (state, action) => {
      state.isLoading = true
    },
    [registerCustomer.fulfilled]: (state, action) => {
      state.isAuthenticated = true
      state.isLoading = false
      state.isSuccess = true
      state.currentUser = action.payload
    },
    [registerCustomer.rejected]: (state, action) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = true
    },
    [loginCustomer.pending]: (state, action) => {
      state.isLoading = true
    },
    [loginCustomer.fulfilled]: (state, action) => {
      state.isAuthenticated = true
      state.isLoading = false
      state.isSuccess = true
      state.currentUser = action.payload
    },
    [loginCustomer.rejected]: (state, action) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = true
    },
    [updateProfile.pending]: (state, action) => {
      state.isLoading = true
    },
    [updateProfile.fulfilled]: (state, action) => {
      state.isLoading = false
      state.isSuccess = true
    },
    [updateProfile.rejected]: (state, action) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = true
    }
  },
})

export const { setCurrentUser, doLogout } = authSlice.actions
export default authSlice.reducer
