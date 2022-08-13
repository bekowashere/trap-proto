import React from 'react'
import BrandDetail from './BrandDetail'

function BrandList({ brands }) {
  return (
    <div className="mt-10 mb-10 space-y-2">
    
      {brands.map((brand) => (
        <BrandDetail key={brand.id} brand={brand} />
      ))}
    </div>
  )
}

export default BrandList
