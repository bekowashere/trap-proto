import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import ModelList from '../../components/ModelList'

function SeriesDetailPage(props) {
  const series = props.series_detail
  const model_list = series.models
  const meta_name = `${series.brand_name} ${series.name}`
  return (
    <div
      className="container mx-auto"
      itemScope
      itemType="https://schema.org/Brand"
    >
      <Head>
        <title>{series.name}</title>
        <meta
          name="description"
          content={`Complete timeline of ${meta_name} models and generations, with photos, specs and production years`}
        />
        <meta
          name="keywords"
          content={`${meta_name} , ${meta_name} models, ${meta_name} photos, ${meta_name} specs, ${meta_name} years`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="rounded-lg border bg-white shadow-lg">
        <div className="m-2 flex flex-row md:m-3 lg:m-5">
          <div className="pr-2 sm:w-2/5 lg:w-1/4">
            <Link href={`/brands/${series.brand_slug}/`}>
              <a>
                <img
                  src={`http://127.0.0.1:8000${series.brand_logo}`}
                  alt={series.brand_name}
                  itemProp="logo"
                  title={`${series.brand_name} logo`}
                />
              </a>
            </Link>
          </div>

          <div className="relative flex flex-col space-y-2 sm:w-3/5 lg:w-3/4">
            <div className="">
              <Link href={`/series/${series.slug}/`}>
                <a itemProp="url" title={meta_name}>
                  <h1
                    itemProp="name"
                    className="text-sm font-semibold md:text-2xl"
                  >
                    <span className="font-bold">{series.brand_name}</span>{' '}
                    {series.name}
                  </h1>
                </a>
              </Link>
              <span className="text-sm font-semibold text-gray-600">
                Series/Models Timeline, Specifications and Pictures
              </span>
            </div>

            <div
              className="space-x-1 text-xs font-semibold md:text-sm border-b-2"
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
                <Link href={`/brands/${series.brand_slug}`}>
                  <a itemProp="item" title={series.brand_name}>
                    <span itemProp="name">{series.brand_name}</span>
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
                <meta itemProp="position" content="4" />
                <span itemProp="name">{series.name}</span>
                <meta
                  itemType="http://schema.org/Thing"
                  itemProp="item"
                  content={`http://localhost:3000/series/${series.slug}`}
                />
              </span>
            </div>

            <div className="flex flex-col space-y-1">
              <p className="text-sm font-semibold">
                <span className="font-bold">Generations : </span>
                {series.generation_count}
              </p>
              <p className="text-sm font-semibold">
                <span className="font-bold">First production year : </span>
                {series.first_production_year}
              </p>
              <p className="text-sm font-semibold">
                <span className="font-bold">Engines : </span>6
              </p>
              {series.bodyStyle !== 'Null' && (
                <p className="text-sm font-semibold">
                  <span className="font-bold">Body Style : </span>
                  <span className="uppercase">{series.bodyStyle}</span>
                </p>
              )}
            </div>

            <div className="absolute bottom-0 right-0 text-xs font-semibold md:text-sm ">
              Updated: 29 April 2022
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3">
        <ModelList models={model_list} brand_name={series.brand_name} />
      </div>
    </div>
  )
}

export const getServerSideProps = async (context) => {
  const res = await fetch(
    `http://127.0.0.1:8000/api/auto/series/detail/${context.params.slug}`
  )
  const series_detail = await res.json()

  return {
    props: {
      series_detail,
    },
  }
}

export default SeriesDetailPage
