import React from 'react'

function Logos() {
  return (
    <section className="pt-7 pb-14">
    <div className="container px-8 mx-auto sm:px-12 lg:px-20">
        <h1 className="text-sm font-bold tracking-wide text-center text-gray-800 uppercase mb-7">Trusted by top-leading companies.</h1>
        <div className="flex grid items-center justify-center grid-cols-4 grid-cols-12 gap-y-8">
            <div className="flex items-center justify-center col-span-6 sm:col-span-4 md:col-span-3 xl:col-span-2">
                <img src="/logos/basbug.png" alt="Disney Plus" className="block object-contain h-12"/>
            </div>
            <div className="flex items-center justify-center col-span-6 sm:col-span-4 md:col-span-3 xl:col-span-2">
                <img src="/logos/kaplan.png" alt="Google" className="block object-contain h-9"/>
            </div>
            <div className="flex items-center justify-center col-span-6 sm:col-span-4 md:col-span-3 xl:col-span-2">
                <img src="/logos/dinamik.png" alt="Hubspot" className="block object-contain h-9"/>
            </div>
            <div className="flex items-center justify-center col-span-6 sm:col-span-4 md:col-span-3 xl:col-span-2">
                <img src="/logos/martas.png" alt="Youtube" className="block object-contain h-7 lg:h-8"/>
            </div>
            <div className="flex items-center justify-center col-span-6 sm:col-span-4 md:col-span-6 xl:col-span-2">
                <img src="/logos/mercanlar.png" alt="Slack" className="block object-contain h-9"/>
            </div>
            <div className="flex items-center justify-center col-span-6 sm:col-span-4 md:col-span-6 xl:col-span-2">
                <img src="/logos/motorasin.png" alt="Shopify" className="block object-contain h-9"/>
            </div>
        </div>
    </div>
</section>
  )
}

export default Logos