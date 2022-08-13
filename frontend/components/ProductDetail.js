import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart, removeFromCart, getCartTotal } from '../store/features/cart/cartSlice'


function ProductDetail({ product_element }) {
  const { cartItems, totalPrice } = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCartTotal())
  }, [cartItems])

  const handleAddToCart = (product) => {
    dispatch(addToCart(product))
  }

  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product))
  }


  return (
    <div className="py-6">
      <div className="flex max-w-full overflow-hidden rounded-lg bg-gray-50 shadow-lg">
        <div className="w-1/3 bg-cover">
          <img src={product_element.image}/>
        </div>
        <div className="w-2/3 p-4">
          <h1 className="text-md font-semibold text-gray-900 lg:text-xl lg:font-bold">
            {product_element.name}
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            <span className="font-bold">Marka: </span>
            {product_element.product_brand.name}
          </p>
          <p className="mt-2 text-sm text-gray-600">
            <span className="font-bold">SKU: </span>
            {product_element.sku}
          </p>

          <p className="mt-2 text-sm text-gray-600">
            <span className="font-bold">Stok: </span>
            {product_element.stock}
          </p>

          <div className="item-center mt-3 flex justify-between">
            <div className="space-x-2">
              <span className="text-md font-semibold text-gray-400 line-through">
                ${product_element.price_net}
              </span>
              <span className="text-xl font-bold text-gray-800">
                ${product_element.price_discounted}
              </span>
            </div>
            <button onClick={() => handleAddToCart(product_element)} className="rounded bg-gray-800 px-3 py-3 text-xs font-bold uppercase text-white">
              Add to Card
            </button>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
