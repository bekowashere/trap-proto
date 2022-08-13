import React from 'react'
import Link from 'next/link'
import cn from 'classnames'
import Image from 'next/image'

function SeriesDetail({ series_element, continued }) {
  return (
    <div className="mx-3 flex flex-row items-center rounded-lg border py-1 px-1 shadow-md">
      <div>
        <Link href={`/series/${series_element.slug}/`}>
          <a title={`${series_element.name} specs and photos`}>
            <img
              src={`http://127.0.0.1:8000${series_element.image}`}
              alt={series_element.name}
              width="90"
              height="60"
              className={cn(
                continued == 'continued' ? 'opacity-100' : 'opacity-70'
              )}
            />
          </a>
        </Link>
      </div>

      <div className="mx-4 my-4 flex w-2/3 flex-col justify-center">
        <div>
          <Link href={`/series/${series_element.slug}/`}>
            <a>
              <h1 className="text-sm font-bold uppercase">
                {series_element.name}
              </h1>
            </a>
          </Link>
        </div>

        {series_element.bodyStyle !== 'Null' && (
          <div className="py-1">
            <p className="text-sm font-semibold uppercase text-gray-600">
              {series_element.bodyStyle}
            </p>
          </div>
        )}

        <div className="py-1">
            <ul className="flex flex-row space-x-2 md:space-x-5 lg:space-x-8">
                <li className="text-sm font-semibold text-gray-400">
                    Diesel
                </li>
                <li className="text-sm font-semibold text-gray-400">
                    Gasoline
                </li>
                <li className="text-sm font-semibold text-gray-400">
                    Electric
                </li>
            </ul>
        </div>
      </div>

      <div className="flex flex-col justify-center">
        <p className="text-sm font-semibold text-gray-600">
          <span
            className={cn(
              continued == 'continued' ? 'text-[#277C0D]' : 'text-[#f33]',
              'font-bold'
            )}
          >
            {series_element.generation_count}
          </span>{' '}
          GENERATIONS
        </p>
        <p className="text-sm font-semibold text-gray-500">
          {series_element.generation_oldest_year} -{' '}
          {series_element.generation_newest_year}
        </p>
      </div>
    </div>
  )
}

export default SeriesDetail
