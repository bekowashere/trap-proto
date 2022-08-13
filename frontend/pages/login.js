import React, { useState, useEffect } from 'react'
import { loginCustomer } from '../store/features/auth/AuthSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import Link from 'next/link'

function login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { isAuthenticated } = useSelector((state) => state.auth)

  const dispatch = useDispatch()
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(
      loginCustomer({
        email,
        password,
      })
    )
  }

  useEffect(() => {
    // redirect to home if already logged in
    if (isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated])

  return (
    <section className="w-full bg-gray-100 px-8 py-16 xl:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col items-center md:flex-row">
          <div className="w-full space-y-5 md:w-3/5 md:pr-16">
            <p className="font-medium uppercase text-indigo-600">JOIN US</p>
            <h2 className="text-2xl font-extrabold leading-none text-black sm:text-3xl md:text-5xl">
              Login and Start Ordering Now
            </h2>
            <p className="text-xl text-gray-600 md:pr-16">
              We are always with our customers with our wide product catalog.
              Log in now and start ordering. Choose us for delivery as soon as
              possible.
            </p>
          </div>

          <div className="mt-16 w-full md:mt-0 md:w-2/5">
            <div className="relative z-10 h-auto overflow-hidden rounded-lg border-b-2 border-gray-300 bg-white p-8 py-10 px-7 shadow-2xl">
              <h3 className="mb-6 text-center text-2xl font-medium">
                Sign in to your Account
              </h3>
              <input
                type="text"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mb-4 block w-full rounded-lg border border-2 border-gray-200  px-5 py-3 focus:outline-none focus:ring focus:ring-blue-500"
                placeholder="Email address"
              />
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mb-4 block w-full rounded-lg border border-2 border-gray-200  px-4 py-3 focus:outline-none focus:ring focus:ring-blue-500"
                placeholder="Password"
              />
              <div className="block">
                <button
                  onClick={handleSubmit}
                  className="w-full rounded-lg bg-indigo-600 px-3 py-4 font-medium text-white"
                >
                  Login
                </button>
              </div>
              <p className="mt-4 w-full text-center text-sm text-gray-500">
                Don't have an account{' '}
                <Link href="/register">
                  <a className="text-indigo-600 underline">Sign up here</a>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default login
