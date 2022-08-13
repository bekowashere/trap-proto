import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { registerCustomer } from '../store/features/auth/AuthSlice'
import { useRouter } from 'next/router'
import Link from 'next/link'

function register() {
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const { isAuthenticated } = useSelector((state) => state.auth)

  const dispatch = useDispatch()
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(
      registerCustomer({
        email,
        firstName,
        lastName,
        password,
        passwordConfirm,
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
    <section className="w-full bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row">
          <div className="relative w-full bg-gradient-to-r from-white via-white to-gray-100 bg-cover lg:w-6/12 xl:w-7/12">
            <div className="relative my-20 flex h-full w-full flex-col items-center justify-center px-10 lg:my-0 lg:px-16">
              <div className="flex flex-col items-start space-y-8 tracking-tight lg:max-w-3xl">
                <div className="relative">
                  <p className="mb-2 font-medium uppercase text-indigo-600">
                    JOIN US
                  </p>
                  <h2 className="text-5xl font-bold text-gray-900 xl:text-6xl">
                    Signup and Start Ordering Now
                  </h2>
                </div>
                <p className="text-2xl text-gray-700">
                  We are always with our customers with our wide product
                  catalog. Log in now and start ordering. Choose us for delivery
                  as soon as possible.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full bg-white lg:w-6/12 xl:w-5/12">
            <div className="flex h-full w-full flex-col items-start justify-start p-10 lg:p-16 xl:p-24">
              <h4 className="w-full text-3xl font-bold">Signup</h4>
              <p className="text-lg text-gray-500">
                or, if you have an account you can{' '}
                <Link href="/login">
                  <a class="text-indigo-600 underline">sign in</a>
                </Link>
              </p>
              <div className="relative mt-10 w-full space-y-8">
                <div className="relative">
                  <label className="font-medium text-gray-900">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="mt-2 block w-full rounded-lg bg-gray-200 px-4 py-4 text-xl placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50"
                    placeholder="Enter Your First Name"
                  />
                </div>
                <div className="relative">
                  <label className="font-medium text-gray-900">Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="mt-2 block w-full rounded-lg bg-gray-200 px-4 py-4 text-xl placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50"
                    placeholder="Enter Your Last Name"
                  />
                </div>
                <div className="relative">
                  <label className="font-medium text-gray-900">Email</label>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-2 block w-full rounded-lg bg-gray-200 px-4 py-4 text-xl placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50"
                    placeholder="Enter Your Email Address"
                  />
                </div>
                <div className="relative">
                  <label className="font-medium text-gray-900">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-2 block w-full rounded-lg bg-gray-200 px-4 py-4 text-xl placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50"
                    placeholder="Password"
                  />
                </div>
                <div className="relative">
                  <label className="font-medium text-gray-900">Password Confirm</label>
                  <input
                    type="password"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    className="mt-2 block w-full rounded-lg bg-gray-200 px-4 py-4 text-xl placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50"
                    placeholder="Password Confirm"
                  />
                </div>
                <div className="relative">
                  <button
                    onClick={handleSubmit}
                    className="ease inline-block w-full rounded-lg bg-indigo-600 px-5 py-4 text-center text-lg font-medium text-white transition duration-200 hover:bg-blue-700"
                  >
                    Create Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default register
