import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { HYDRATE } from "next-redux-wrapper";

const API_URL = 'http://127.0.0.1:8000/api'

export const fetchBrands = createAsyncThunk('auto/fetchBrands', async () => {
  try {
    const config = {
      header: {
        'Content-Type': 'application/json',
      },
    }

    const response = await axios.get(`${API_URL}/auto/search/brands`, config)

    if (response.status === 200) {
      return response.data
    }
  } catch (error) {
    return 'hata'
  }
})

export const fetchSeries = createAsyncThunk(
  'auto/fetchSeries',
  async ({ brand }, { rejectWithValue }) => {
    try {
      const config = {
        header: {
          'Content-Type': 'application/json',
        },
      }

      const response = await axios.get(
        `${API_URL}/auto/search/series?brand=${brand}`,
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

export const fetchModels = createAsyncThunk(
  'auto/fetchModels',
  async ({ seri }, { rejectWithValue }) => {
    try {
      const config = {
        header: {
          'Content-Type': 'application/json',
        },
      }

      const response = await axios.get(
        `${API_URL}/auto/search/model?series=${seri}`,
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

export const fetchCars = createAsyncThunk(
  'auto/fetchCars',
  async ({ model }, { rejectWithValue }) => {
    try {
      const config = {
        header: {
          'Content-Type': 'application/json',
        },
      }

      const response = await axios.get(
        `${API_URL}/auto/search/car?model=${model}`,
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

export const autoSlice = createSlice({
  name: 'auto',
  initialState: {
    brandList: [],
    seriesList: [],
    modelList: [],
    carList: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
  },
  reducers: {},
  extraReducers: {
    [HYDRATE]: (state, action) => {
      console.log("HYDRATE", state, action.payload)
      return {
        ...state,
        ...action.payload.some,
      }
    },
    [fetchBrands.pending]: (state, action) => {
      state.brandList = []
    },
    [fetchBrands.fulfilled]: (state, action) => {
      state.brandList = action.payload
    },
    [fetchBrands.rejected]: (state, action) => {
      state.isError = true
    },
    [fetchSeries.pending]: (state, action) => {
      state.seriesList = []
    },
    [fetchSeries.fulfilled]: (state, action) => {
      state.seriesList = action.payload
    },
    [fetchSeries.rejected]: (state, action) => {
      state.isError = true
    },
    [fetchModels.pending]: (state, action) => {
      state.modelList = []
    },
    [fetchModels.fulfilled]: (state, action) => {
      state.modelList = action.payload
    },
    [fetchModels.rejected]: (state, action) => {
      state.isError = true
    },
    [fetchCars.pending]: (state, action) => {
      state.carList = []
    },
    [fetchCars.fulfilled]: (state, action) => {
      state.carList = action.payload
    },
    [fetchCars.rejected]: (state, action) => {
      state.isError = true
    },
  },
})

export default autoSlice.reducer
