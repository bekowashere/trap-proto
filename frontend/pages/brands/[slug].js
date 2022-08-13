import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import SeriesList from '../../components/SeriesList'

function BrandDetailPage(props) {
  const brand = props.brand_detail
  const series_continued = brand.continued_series
  const series_discontinued = brand.discontinued_series
  

  return (
    <div
      className="container mx-auto"
      itemScope
      itemType="https://schema.org/Brand"
    >
      <Head>
        <title>{brand.name}</title>
        <meta
          name="description"
          content={`List of production and discontinued ${brand.name} models with full specs and photo galleries`}
        />
        <meta
          name="keywords"
          content={`${brand.name}, ${brand.name} models, ${brand.name} history, ${brand.name} specs, specifications`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="rounded-lg border bg-white shadow-lg">
        <div className="m-2 flex flex-row md:m-3 lg:m-5">
          <div className="flex flex-row sm:w-2/5 lg:w-1/4">
            <div>
              <Link href={`/brands/${brand.slug}/`}>
                <a>
                  <img
                    src={brand.image}
                    alt={brand.name}
                    itemProp="logo"
                    title={`${brand.name} logo`}
                  />
                </a>
              </Link>
            </div>
            <div className="flex flex-col justify-center divide-y-2 pl-2 pr-2">
              <div className="pb-2">
                <p className="font-bold text-[#277C0D]">
                  {brand.in_production_count}
                </p>
                <p className="text-xs font-semibold text-gray-600 md:text-sm">
                  PRODUCTION MODELS
                </p>
              </div>
              <div className="pt-2">
                <p className="font-bold text-[#f33]">
                  {brand.discontinued_count}
                </p>
                <p className="text-xs font-semibold text-gray-600 md:text-sm">
                  DISCONTINUED MODELS
                </p>
              </div>
            </div>
          </div>
          <div className="relative flex flex-col space-y-2 sm:w-3/5 lg:w-3/4">
            <div className="">
              <Link href={`/brands/${brand.slug}/`}>
                <a
                  itemProp="url"
                  title={`${brand.name} Models & ${brand.name} Series`}
                >
                  <h1 itemProp="name" className="text-sm font-bold md:text-2xl">
                    {brand.name}
                  </h1>
                </a>
              </Link>
              <span className="text-sm font-semibold text-gray-600">Models & Brand History</span>
            </div>

            <div
              className="space-x-1 text-xs font-semibold md:text-sm"
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
                className="text-gray-600"
              >
                <meta itemProp="position" content="3" />
                <span itemProp="name">{brand.name}</span>
                <meta
                  itemType="http://schema.org/Thing"
                  itemProp="item"
                  content={`http://localhost:3000/brands/${brand.slug}`}
                />
              </span>
            </div>
            <div className="absolute bottom-0 right-0 text-xs font-semibold md:text-sm ">
              Updated: 29 April 2022
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 rounded-lg border bg-white shadow-lg">
        <div className="rounded-tl-lg rounded-tr-lg border bg-gradient-to-r from-blue-500 to-blue-700 py-2">
          <h1 className="text-center text-sm font-semibold text-white md:text-base">
            PRODUCTION MODELS
          </h1>
        </div>
        <SeriesList series={series_continued} continued="continued" />
      </div>

      <div className="mt-3 rounded-lg border bg-white shadow-lg">
        <div className="rounded-tl-lg rounded-tr-lg border bg-gradient-to-r from-red-400 to-red-500 py-2">
          <h1 className="text-center text-sm font-semibold text-white md:text-base">
            DISCONTINUED MODELS
          </h1>
        </div>
        <SeriesList series={series_discontinued} continued="discontinued" />
      </div>
    </div>
  )
}

export const getServerSideProps = async (context) => {
  const res = await fetch(
    `http://127.0.0.1:8000/api/auto/brand/detail/${context.params.slug}`
  )
  const brand_detail = await res.json()

  return {
    props: {
      brand_detail,
    },
  }
}

export default BrandDetailPage
