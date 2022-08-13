import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import {
  MenuIcon,
  ShoppingBagIcon,
  UserIcon,
  XIcon,
  LogoutIcon,
} from '@heroicons/react/outline'
import cn from 'classnames'
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import React, { useState, useEffect } from 'react'


const navigation = [
  { name: 'HOME', href: '/', current: true },
  { name: 'PARTS', href: '/products', current: false },
  { name: 'CARS', href: '/brands', current: false },
  { name: 'ABOUT', href: '/about', current: false },
  { name: 'CONTACT', href: '/contact', current: false },
]

const userNavigation = [
  { name: 'Profile', href: '/profile' },
  { name: 'Settings', href: '/profile/settings' },
  { name: 'Sign out', href: '/logout' },
]

function Header() {
  const [firstName, setFirstName] = useState('Anonymus')
  const [lastName, setLastName] = useState('User')
  const [email, setEmail] = useState('')

  const dispatch = useDispatch()

  const { isAuthenticated, currentUser } = useSelector((state) => state.auth)
  const { totalProducts } = useSelector((state) => state.cart)

  const user = {
    name: firstName + ' ' + lastName,
    email: email,
    imageUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  }

  useEffect(() => {
    if (isAuthenticated) {
      setFirstName(currentUser.first_name)
      setLastName(currentUser.last_name)
      setEmail(currentUser.email)
    }
  }, [isAuthenticated])

  return (
    <div className="min-h-full">
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="h-8 w-8"
                      src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                      alt="Workflow"
                    />
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {navigation.map((item) => (
                        <Link href={item.href} key={item.name}>
                          <a
                            className={cn(
                              item.current
                                ? 'bg-gray-900 text-white'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                              'rounded-md px-3 py-2 text-sm font-medium'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                          >
                            {item.name}
                          </a>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                    <div className="ml-4 flow-root lg:ml-6">
                      <Link href="/cart">
                        <a className="group -m-2 flex items-center p-2">
                          <ShoppingBagIcon
                            className="h-6 w-6 flex-shrink-0 text-gray-300 group-hover:text-white"
                            aria-hidden="true"
                          />
                          <span className="ml-2 text-sm font-medium text-gray-300 group-hover:text-white">
                            {totalProducts}
                          </span>
                          <span className="sr-only">
                            items in cart, view bag
                          </span>
                        </a>
                      </Link>
                    </div>

                    {/* Profile dropdown */}
                    {isAuthenticated ? (
                      <>
                      <div className="ml-4 flow-root lg:ml-6">
                          <Link href="/profile">
                            <a className="group -m-2 flex items-center p-2">
                              <UserIcon
                                className="h-6 w-6 flex-shrink-0 text-gray-300 group-hover:text-white"
                                aria-hidden="true"
                              />
                            </a>
                          </Link>
                        </div>
                        <div className="ml-4 flow-root lg:ml-6">
                          <Link href="/logout">
                            <a className="group -m-2 flex items-center p-2">
                              <LogoutIcon
                                className="h-6 w-6 flex-shrink-0 text-gray-300 group-hover:text-white"
                                aria-hidden="true"
                              />
                            </a>
                          </Link>
                        </div>
                      </>
                      
                      
                    ) : (
                      <div class="items-center justify-end md:flex md:flex-1 lg:w-0">
                        <Link href="/login">
                          <a className="whitespace-nowrap rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                            {' '}
                            Sign in{' '}
                          </a>
                        </Link>
                        <Link href="/register">
                          <a className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                            {' '}
                            Sign up{' '}
                          </a>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={cn(
                      item.current
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block rounded-md px-3 py-2 text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
              {isAuthenticated ? (
                <div className="border-t border-gray-700 pt-4 pb-3">
                  <div className="flex items-center px-5">
                    
                    <div className="">
                      <div className="text-base font-medium leading-none text-white">
                        {user.name}
                      </div>
                      <div className="text-sm font-medium leading-none text-gray-400">
                        {user.email}
                      </div>
                    </div>
                    <Link href="/cart">
                      <a className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="sr-only">items in cart, view bag</span>
                        <ShoppingBagIcon
                          className="h-6 w-6 flex-shrink-0 text-gray-300 group-hover:text-white"
                          aria-hidden="true"
                        />
                      </a>
                    </Link>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="border-t border-gray-700 pt-4 pb-3">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={user.imageUrl}
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">
                        {user.name}
                      </div>
                    </div>
                    <Link href="/cart">
                      <a className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="sr-only">items in cart, view bag</span>
                        <ShoppingBagIcon
                          className="h-6 w-6 flex-shrink-0 text-gray-300 group-hover:text-white"
                          aria-hidden="true"
                        />
                      </a>
                    </Link>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    <Disclosure.Button
                      as="a"
                      href="/login"
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                    >
                      Sign in
                    </Disclosure.Button>
                    <Disclosure.Button
                      as="a"
                      href="/register"
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                    >
                      Sign up
                    </Disclosure.Button>
                  </div>
                </div>
              )}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  )
}

export default Header
