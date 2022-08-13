import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart } from '../store/features/cart/cartSlice'

function CartSingle({ product_element }) {

  const dispatch = useDispatch()

  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product))
  }

  const product_total_price = product_element.quantity * product_element.price_discounted

  return (
    <li className="flex py-6">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          src={product_element.image}
          alt={product_element.name}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>
              <Link href="/">
              <a>{product_element.name} </a>
              </Link>
              
            </h3>
            <p className="ml-4">${product_total_price}</p>
          </div>
          <p className="mt-1 text-sm text-gray-500">{product_element.sku}</p>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <p className="text-gray-500">Qty {product_element.quantity}</p>

          <div className="flex">
            <button
              type="button"
              onClick={() => handleRemoveFromCart(product_element)}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>
  )
}

export default CartSingle
