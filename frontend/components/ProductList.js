import React from 'react'
import ProductDetail from './ProductDetail'

function ProductList({ products }) {
  return (
    <div className="mt-5 mb-5 flex flex-col ">
      {products.map((product) => (
        <ProductDetail key={product.id} product_element={product} />
      ))}
    </div>
  )
}

export default ProductList
