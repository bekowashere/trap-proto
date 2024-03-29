import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

function OrderDetail(props) {
  const ord = props.order_detail
  const ord_items = ord.order_items
  console.log(ord)
  return (
    <div className="container mx-auto">
      <Head>
        <title>Order - {ord.order_key}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="mt-3 mb-3 flex h-screen flex-col md:flex-row md:space-x-2">
        <div className="lg:w-3/10 ml-3 mr-3 p-4 md:w-2/6">
          <div className="py-6 px-4 sm:px-6">
            <div className="flex text-base font-medium text-gray-900">
              <ul role="list" className="w-full justify-between">
                <li className="border-b border-gray-300 py-2">
                  <Link href="/profile">
                    <a className="font-medium text-indigo-600 hover:text-indigo-500">
                      Profile<span aria-hidden="true"> &rarr;</span>
                    </a>
                  </Link>
                </li>
                <li className="border-b border-gray-300 py-2">
                  <Link href="/profile/orders">
                    <a className="font-medium text-indigo-600 hover:text-indigo-500">
                      My Orders<span aria-hidden="true"> &rarr;</span>
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="lg:w-7/10 ml-3 mr-3 rounded-md border bg-white p-4 shadow-md md:w-4/6 xl:px-20">
          <div className="mt-8">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                     
                    </th>
                    <th scope="col" className="px-6 py-3">
                      
                    </th>
                  </tr>
                </thead>
                <tbody>
                    <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                      >
                        Order Key
                      </th>
                      <td className="px-6 py-4">{ord.order_key}</td> 
                    </tr>
                    <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                      >
                        Country
                      </th>
                      <td className="px-6 py-4">{ord.shipping_address.country.name}</td> 
                    </tr>
                    
                    
                    <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                      >
                        Shipping Method
                      </th>
                      <td className="px-6 py-4">{ord.shipping_method}</td> 
                    </tr>
                    <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                      >
                        Shipping Price
                      </th>
                      <td className="px-6 py-4">${ord.shipping_price}</td> 
                    </tr>
                    <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                      >
                        Delivered
                      </th>
                      <td className="px-6 py-4">
                        {ord.is_delivered 
                        ? (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fillRule="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>)
                        : (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fillRule="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>)}
                      </td>
                    </tr>
                    <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                      >
                        Delivered Date
                      </th>
                      <td className="px-6 py-4">{ord.delivered_at}</td> 
                    </tr> 
                    <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                      >
                        Payment Method
                      </th>
                      <td className="px-6 py-4">{ord.payment_method}</td> 
                    </tr>
                    
                    
                    <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                      >
                        Total Price
                      </th>
                      <td className="px-6 py-4">${ord.total_price}</td> 
                    </tr>               
                </tbody>
              </table>
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">      
              <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3">
                      SKU
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Product Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Quantity
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Total Price
                    </th>
                    
                  </tr>
                </thead>
                <tbody>
                  {ord_items.map((item) => (
                    <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800" key={item.id}>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                      >
                       
                          {item.product.name}
                        
                        
                      </th>
                      <td className="px-6 py-4">{item.product.sku}</td>
                      <td className="px-6 py-4">${item.product.price_discounted}</td>
                      <td className="px-6 py-4">x{item.quantity}</td>
                      <td className="px-6 py-4">${item.price}</td>
                      
                      
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async (context) => {
  const res = await fetch(
    `http://127.0.0.1:8000/api/order/orders/detail/${context.params.slug}`
  )
  const order_detail = await res.json()

  return {
    props: {
      order_detail,
    },
  }
}

export default OrderDetail