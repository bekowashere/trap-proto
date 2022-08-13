import React from 'react'
import Link from 'next/link'
import { ArrowNarrowRightIcon, ArrowRightIcon } from '@heroicons/react/outline'


function ModelDetail({ model_element, brand_name }) {
  const first_car = model_element.cars[0]
  const meta_name = `${brand_name} ${model_element.name} (${model_element.startYear} - ${model_element.endYear}) specs and photos`
  const fuel_types = model_element.fuelType

  const car_list = model_element.cars
  
  return (
    <div className="rounded-lg border bg-white shadow-lg">
      <div className="m-2 flex flex-row md:m-3 lg:m-5">
        <div className="flex w-2/6 flex-col pr-2 sm:w-2/5 md:w-2/5 lg:w-1/4">
          <div className="text-sm font-semibold md:text-lg md:font-bold">
            <Link href={`/cars/${first_car.slug}/`}>
              <a itemProp="url" title={meta_name}>
                <h1 itemProp="name" className="space-x-1">
                  <span itemProp="brand">{brand_name}</span>
                  <span className="text-[#f33]">{model_element.name}</span>
                </h1>
              </a>
            </Link>
          </div>

          <div className="pt-2">
            <Link href={`/cars/${first_car.slug}/`}>
              <a
                title={`${model_element.name} ${model_element.startYear}-${model_element.endYear} photo gallery`}
              >
                <img
                  src={`http://127.0.0.1:8000${model_element.image}`}
                  alt={model_element}
                  width="200"
                  height="133"
                />
              </a>
            </Link>
          </div>
        </div>

        <div className="flex w-4/6 flex-col space-y-2 sm:w-3/5 md:w-3/5 lg:w-3/4">
          <div className="">
            <meta
              itemProp="vehicleModelDate"
              content={model_element.startYear}
            />
            <Link href={`/cars/${first_car.slug}/`}>
              <a itemProp="url" title={meta_name}>
                <h1 className="text-sm font-semibold md:text-lg md:font-bold">
                  {model_element.startYear} - {model_element.endYear}
                </h1>
              </a>
            </Link>
          </div>
          <div className="">
            <p className="text-sm text-gray-600" itemProp="description">
              {model_element.description}..
            </p>
            <Link href={`/cars/${first_car.slug}/`}>
              <a itemProp="url" title={`More info about ${meta_name}`}>
                <h1 className="text-sm font-semibold md:text-lg md:font-bold flex flex-row">
                <span className="mr-1">Full description and technical specifications</span>
                <ArrowRightIcon className="h-4 w-4 my-auto" aria-hidden="true" />
                </h1>
              </a>
            </Link>
          </div>

          <div className="">
            {fuel_types.map((fuel_type) =>(
              <div key={fuel_type.id} className="pt-2">
              <h1 className="text-sm font-semibold md:text-lg md:font-bold border-b-2 border-slate-600 text-slate-600">{fuel_type.type}</h1>
              
              {car_list.map((car) => (
                <div key={car.id} className="">
                {car.fuelType == fuel_type.type && (
                <Link href={`/cars/${car.slug}`}>
                <a itemProp="url" title={`More info about ${meta_name}`}>
                <p className="text-xs font-semibold sm:text-sm md:text-base text-gray-600 pb-1 space-x-1 border-b-2">
                  <span>{brand_name} {model_element.name}</span>
                  <span className="text-[#277C0D]">{car.engineName}</span>
                </p>
                </a>
                </Link>
                )}
                </div>
              ))}
              
              </div>
              
            ))}
            
          </div>



        </div>
      </div>
    </div>
  )
}

export default ModelDetail
