import React from 'react'
import SeriesDetail from './SeriesDetail'

function SeriesList({ series, continued }) {
  return (
    <div className="mt-5 mb-5 space-y-2">
      {series.map((series_element) => (
        <SeriesDetail
          key={series_element.id}
          series_element={series_element}
          continued={continued}
        />
      ))}
    </div>
  )
}

export default SeriesList
