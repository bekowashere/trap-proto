import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import cn from 'classnames'

function CarDetailPage(props) {
  const router = useRouter()
  const car = props.car_detail
  const specs = car.specifications
  const model_information = props.model_detail
  const images = model_information.images

  const spec_types = []
  specs.forEach((spec) => {
    if (!spec_types.includes(spec.specification_type)) {
      spec_types.push(spec.specification_type)
    }
  })

  return (
    <div className="container mx-auto">
      <div className="mt-3 flex flex-col md:flex-row">
        <div className="sm:w-1/3 mb-3 mx-auto ">
          
              <img className=''
                src={model_information.image}
                alt={model_information.name}
                itemProp="logo"
                title={`${model_information.name} logo`}
              />
            
        </div>
        <div className="bg-white px-4 sm:w-2/3 mx-auto">
          <div className="border-b-2 py-4">
            <Link href={`/cars/${car.slug}`}>
              <a itemProp="url" title="">
                <h1 itemProp="name" className="space-x-1 text-2xl">
                  <span className="font-bold text-[#f33]">
                    {model_information.brand_name}
                  </span>
                  <span className="font-semibold text-black">
                    {model_information.name}
                  </span>

                  <em
                    itemProp="vehicleModelDate"
                    className="font-medium text-gray-500"
                  >
                    {model_information.startYear} - {model_information.endYear}
                  </em>
                </h1>
              </a>
            </Link>
            <div
              className="mt-2 space-x-1 text-xs font-semibold md:text-sm"
              itemScope
              itemType="http://schema.org/BreadcrumbList"
            >
              <span
                itemProp="itemListElement"
                itemScope
                itemType="http://schema.org/ListItem"
                className="text-blue-500"
              >
                <meta itemProp="position" content="1" />
                <Link href="/">
                  <a itemProp="item" title="Home">
                    <span itemProp="name">Home</span>
                  </a>
                </Link>
              </span>
              <span className="text-gray-600">/</span>

              <span
                itemProp="itemListElement"
                itemScope
                itemType="http://schema.org/ListItem"
                className="text-blue-500"
              >
                <meta itemProp="position" content="2" />
                <Link href="/brands">
                  <a itemProp="item" title="Cars">
                    <span itemProp="name">Cars</span>
                  </a>
                </Link>
              </span>
              <span className="text-gray-600">/</span>

              <span
                itemProp="itemListElement"
                itemScope
                itemType="http://schema.org/ListItem"
                className="text-blue-500"
              >
                <meta itemProp="position" content="3" />
                <Link href={`/brands/${model_information.brand_slug}`}>
                  <a itemProp="item" title={model_information.brand_name}>
                    <span itemProp="name">{model_information.brand_name}</span>
                  </a>
                </Link>
              </span>
              <span className="text-gray-600">/</span>

              <span
                itemProp="itemListElement"
                itemScope
                itemType="http://schema.org/ListItem"
                className="text-blue-500"
              >
                <meta itemProp="position" content="4" />
                <Link href={`/series/${model_information.series_slug}`}>
                  <a itemProp="item" title={model_information.series_name}>
                    <span itemProp="name">{model_information.series_name}</span>
                  </a>
                </Link>
              </span>
              <span className="text-gray-600">/</span>

              <span
                itemProp="itemListElement"
                itemScope
                itemType="http://schema.org/ListItem"
                className="text-gray-600"
              >
                <meta itemProp="position" content="5" />
                <span itemProp="name">
                  {`${model_information.brand_name} ${model_information.name} (${model_information.startYear} - ${model_information.endYear})`}
                </span>
                <meta
                  itemType="http://schema.org/Thing"
                  itemProp="item"
                  content={`http://localhost:3000/cars/${car.slug}`}
                />
              </span>
            </div>
          </div>
          <div className="flex flex-col space-y-1 border-b-2 py-4">
            {model_information.bodyStyle !== 'Null' && (
              <p className="text-sm font-semibold">
                <span className="font-bold">Body Style : </span>
                <span className="uppercase">{model_information.bodyStyle}</span>
              </p>
            )}

            {model_information.segment !== 'Null' && (
              <p className="text-sm font-semibold">
                <span className="font-bold">Segment : </span>
                {model_information.segment}
              </p>
            )}
          </div>
          <div className="py-4">
            <p className="text-sm font-medium">
              {model_information.description}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-3 flex flex-col border-t-2 border-black md:flex-row">
        <div className="px-2 py-2 md:w-1/3">
          <div className="flex flex-col border-b-2 border-gray-400 p-2">
            <h2 className="text-xs font-semibold text-gray-600">
              {model_information.brand_name}
            </h2>
            <h1 className="text-base font-bold">{model_information.name}</h1>
            <h2 className="text-xs font-semibold text-gray-600">
              {model_information.startYear} - {model_information.endYear}{' '}
            </h2>
          </div>
          <div className="">
            {model_information.fuelType.map((fuel_type) => (
              <div key={fuel_type.id} className="pt-2">
                <h1 className="text-base font-bold uppercase text-[#f33]">
                  {fuel_type.type}
                </h1>

                {model_information.cars.map((carr) => (
                  <div
                    key={carr.id}
                    className={cn(
                      router.asPath == `/cars/${carr.slug}`
                        ? 'bg-gradient-to-r from-transparent to-[#f2f2f2] text-[#3a0]'
                        : 'text-black',
                      'text-sm font-semibold sm:text-base'
                    )}
                  >
                    {carr.fuelType == fuel_type.type && (
                      <Link href={`/cars/${carr.slug}`}>
                        <a itemProp="url" title="">
                          <h1 className="py-1">{carr.engineName}</h1>
                        </a>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white sm:px-2 md:w-2/3">
          <h1 className="block border bg-black py-4 text-center text-base font-bold uppercase text-white sm:hidden">
            Technical Specs
          </h1>
          {spec_types.map((spc_type, spcIndex) => (
            <div key={spcIndex} className="">
              <div className="flex flex-col border-b-2 border-gray-400 bg-gray-200 px-2 py-4 sm:bg-white md:flex-row md:space-x-2">
                <h1 className="text-base font-bold uppercase lg:text-lg">
                  {spc_type}
                </h1>
                {spc_type == 'General Specs' && (
                  <h1 className="text-base font-bold uppercase text-[#277C0D] lg:text-lg">
                    - {car.engineName}
                  </h1>
                )}
              </div>

              {specs.map((spc, spcId) => (
                <div key={spcId} className="px-2">
                  {spc.specification_type == spc_type && (
                    <div className="flex flex-row border-b-2 border-gray-200 py-2">
                      <h1 className="w-1/2 text-sm font-semibold uppercase text-[#999]">
                        {spc.specification}
                      </h1>
                      <h1 className="w-1/2 text-sm sm:text-base">
                        {spc.value}
                      </h1>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async (context) => {
  const res = await fetch(
    `http://127.0.0.1:8000/api/auto/car/detail/${context.params.slug}`
  )
  const car_detail = await res.json()

  const model_slug = car_detail.model_slug
  const model_res = await fetch(
    `http://127.0.0.1:8000/api/auto/model/detail/${model_slug}`
  )
  const model_detail = await model_res.json()

  return {
    props: {
      car_detail,
      model_detail,
    },
  }
}

export default CarDetailPage
