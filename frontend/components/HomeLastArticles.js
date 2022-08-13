const callouts = [
  {
    name: 'Technology',
    description: 'Range Rover Gets Stolen, Owner Buys a Second One, Stolen as Well - Thank God for AirTags',
    imageSrc:
      'https://s1.cdn.autoevolution.com/images-webp/news/range-rover-gets-stolen-owner-buys-a-second-one-stolen-as-well-thank-god-for-airtags-192652-7.jpg.webp',
    imageAlt:
      'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
    href: '/',
  },
  {
    name: 'Coverstory',
    description: 'BMW M Asked Its Fans Where They Would Go With the Concept XM, It Backfired Spectacularly',
    imageSrc:
      'https://s1.cdn.autoevolution.com/images/news/gallery/bmw-m-asked-its-fans-where-they-would-go-with-the-concept-xm-it-backfired-spectacularly_3.jpg',
    imageAlt:
      'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
    href: '/',
  },
  {
    name: 'Recalls',
    description: 'Toyota Recalls bZ4X and Subaru Solterra Due to Loose Wheel Hub Bolts',
    imageSrc:
      'https://s1.cdn.autoevolution.com/images-webp/news/toyota-recalls-bz4x-and-subaru-solterra-due-to-loose-wheel-hub-bolts-192114-7.jpg.webp',
    imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
    href: '/',
  },
  
]

function HomeLastArticles() {
  return (
    <div className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
          <h2 className="text-2xl font-extrabold text-gray-900">Last Articles</h2>

          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
            {callouts.map((callout) => (
              <div key={callout.name} className="group relative">
                <div className="sm:aspect-w-2 sm:aspect-h-1 lg:aspect-w-1 lg:aspect-h-1 relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:h-64">
                  <img
                    src={callout.imageSrc}
                    alt={callout.imageAlt}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <h3 className="mt-6 text-sm text-gray-500">
                  <a href={callout.href}>
                    <span className="absolute inset-0" />
                    {callout.name}
                  </a>
                </h3>
                <p className="text-base font-semibold text-gray-900">
                  {callout.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeLastArticles
