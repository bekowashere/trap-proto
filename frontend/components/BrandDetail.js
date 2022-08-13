import React from 'react'
import Link from 'next/link'

function BrandDetail({ brand }) {
  const brand_series = brand.some_series

  return (
    <div className="mx-3 flex flex-row rounded-lg border py-1 px-1 shadow-md">
      <div>
        <Link href={`/brands/${brand.slug}/`}>
          <a>
            <img src={brand.image} alt={brand.name} />
          </a>
        </Link>
      </div>

      <div className="mx-4 my-4 flex w-2/3 flex-col justify-center divide-y-2">
        <div>
        <Link href={`/brands/${brand.slug}/`}>
          <a>
          <h1 className="text-sm font-bold uppercase">{brand.name}</h1>
          </a>
        </Link>
          
        </div>

        <div className="py-1">
          <ul className="flex flex-row space-x-2 md:space-x-5 lg:space-x-8">
            {brand_series.map((series) => (
              <li
                key={series.id}
                className="text-sm font-semibold text-gray-600"
              >
                <Link href={`/brands/${brand.slug}/${series.slug}/`}>
                  <a>{series.name}</a>
                </Link>
              </li>
              
              
            ))}
          </ul>
        </div>
      </div>

      <div className="hidden flex-col justify-center border-l-2 px-4 lg:flex">
        <p className="text-sm font-semibold text-gray-600">
          <span className="font-bold text-[#277C0D]">
            {brand.in_production_count}
          </span>{' '}
          IN PRODUCTION
        </p>
        <p className="text-sm font-semibold text-gray-600">
          <span className="font-bold text-[#f33]">
            {brand.discontinued_count}
          </span>{' '}
          DISCONTINUED
        </p>
      </div>
    </div>
  )
}

export default BrandDetail
