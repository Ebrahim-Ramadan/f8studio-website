import Image from 'next/image'

export const metadata = {
  title: 'Our Team — Arch',
  description: 'Meet the team behind Arch — Ahmed Ramadan (COO) and Lamis Medhat (CEO).',
  openGraph: {
    title: 'Our Team — Arch',
    description: 'Meet the team behind Arch — Ahmed Ramadan (COO) and Lamis Medhat (CEO).',
    url: '/ourteam',
    siteName: 'Arch',
    images: [
      {
        url: '/members/ahmed ramadan - coo.webp',
        width: 800,
        height: 600,
        alt: 'Ahmed Ramadan',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function OurTeamPage() {
  const members = [
    { name: 'Ahmed Ramadan', role: 'COO', img: '/members/ahmed ramadan - coo.webp' },
    { name: 'Lamis Medhat', role: 'CEO', img: '/members/lamis - ceo.webp' },
  ]

  return (
    <main className="min-h-screen bg-background pt-24">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-light text-foreground mb-8">Our Team</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {members.map((m) => (
            <div key={m.name} className="text-center">
              <div className="mx-auto w-40 h-40 rounded-full overflow-hidden ring-2 ring-border shadow-md">
                <Image
                  src={m.img}
                  alt={m.name}
                  width={160}
                  height={160}
                  quality={40}
                  className="object-cover w-full h-full transform scale-105"
                />
              </div>
              <h2 className="mt-4 text-xl font-medium text-foreground">{m.name}</h2>
              <p className="text-sm text-muted-foreground mt-1">{m.role}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
