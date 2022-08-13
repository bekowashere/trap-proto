import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  fetchBrands,
  fetchSeries,
  fetchModels,
  fetchCars,
} from '../store/features/auto/autoSlice'

import Link from 'next/link'

function Hero() {
  const dispatch = useDispatch()
  const { brandList, seriesList, modelList, carList } = useSelector(
    (state) => state.auto
  )

  const [brands, setBrands] = useState([])
  const [brand, setBrand] = useState('')

  const [series, setSeries] = useState([])
  const [seri, setSeri] = useState('')

  const [models, setModels] = useState([])
  const [model, setModel] = useState('')

  const [cars, setCars] = useState([])
  const [car, setCar] = useState('')

  const [slug, setSlug] = useState(`/products/ds-automobiles-ds-3-12l-puretech-5at-82-hp`)

  useEffect(() => {
    dispatch(fetchBrands()).then((data) => setBrands(data.payload))
  }, [])

  useEffect(() => {
    if (brand !== '') {
      dispatch(fetchSeries({ brand })).then((data) => setSeries(data.payload))
    }
  }, [brand])

  useEffect(() => {
    if (seri !== '') {
      dispatch(fetchModels({ seri })).then((data) => setModels(data.payload))
    }
  }, [seri])

  useEffect(() => {
    if (model !== '') {
      dispatch(fetchCars({ model })).then((data) => setCars(data.payload))
    }
  }, [model])

  const changeBrand = (e) => {
    setBrand(e.target.value)
  }

  const changeSeries = (e) => {
    setSeri(e.target.value)
  }

  const changeModel = (e) => {
    setModel(e.target.value)
  }

  const changeCar = (e) => {
    setCar(e.target.value)
    console.log(e.target.value)
  }

  console.log(cars)

  

  return (
    <div className="mx-auto mt-10 max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
      <div className="sm:text-center lg:text-left">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
          <span className="block xl:inline">Data to enrich your</span>{' '}
          <span className="block text-indigo-600 xl:inline">
            online business
          </span>
        </h1>

        <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
          <div className="mt-3 sm:mt-0 sm:ml-3">
            <select
              onChange={changeBrand}
              defaultValue={'default'}
              className="flex w-full items-center justify-center rounded-md border border-transparent bg-gray-800 px-8 py-3 text-base font-medium text-white hover:bg-gray-700 md:py-4 md:px-10 md:text-lg"
            >
              <option value={'default'} disabled>
                Select Brand
              </option>
              {brands.map((brand_element) => (
                <option value={brand_element.id} key={brand_element.id}>
                  {brand_element.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-3 sm:mt-0 sm:ml-3">
            <select
              onChange={changeSeries}
              defaultValue={'default'}
              className="flex w-full items-center justify-center rounded-md border border-transparent bg-gray-800 px-8 py-3 text-base font-medium text-white hover:bg-gray-700 md:py-4 md:px-10 md:text-lg"
            >
              <option value={'default'} disabled>
                Select Series
              </option>
              {series.map((series_element) => (
                <option value={series_element.id} key={series_element.id}>
                  {series_element.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-3 sm:mt-0 sm:ml-3">
            <select
              onChange={changeModel}
              defaultValue={'default'}
              className="flex w-full items-center justify-center rounded-md border border-transparent bg-gray-800 px-8 py-3 text-base font-medium text-white hover:bg-gray-700 md:py-4 md:px-10 md:text-lg"
            >
              <option value={'default'} disabled>
                Select Model
              </option>
              {models.map((model_element) => (
                <option value={model_element.id} key={model_element.id}>
                  {model_element.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-3 sm:mt-0 sm:ml-3">
            <select
              onChange={changeCar}
              defaultValue={'default'}
              className="flex w-full items-center justify-center rounded-md border border-transparent bg-gray-800 px-8 py-3 text-base font-medium text-white hover:bg-gray-700 md:py-4 md:px-10 md:text-lg"
            >
              <option value={'default'} disabled>
                Select Car
              </option>
              {cars.map((car_element) => (
                <option value={car_element.id} key={car_element.id} id={car_element.slug}>
                  {car_element.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-3 sm:mt-0 sm:ml-3">
          <Link href={{ pathname: slug, query: { car_id: car } }}>
              <a
                itemProp="url"
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-100 px-8 py-3 text-base font-medium text-indigo-700 hover:bg-indigo-200 md:py-4 md:px-10 md:text-lg"
              >
                Search
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
