import React from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'


function Layout({ children }) {
  {/* 50% 100%,#517af5 0,#032a9e 100% */}
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#f2f2f2] to-[#cccccc] ">
      <Head>
        <title>Turkey Auto Parts</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      

      <main className="mt-5">
        {children}
      </main>

      <Footer />
    </div>
  )
}

export default Layout