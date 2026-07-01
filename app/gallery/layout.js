export const metadata = {
  title: 'Photo Gallery',
  description:
    'Browse photos of The ParkQueen Hotel, Rohtak — rooms, fine dining, banquet halls, bar & lounge, and hotel exteriors.',
  keywords: ['ParkQueen Hotel gallery', 'hotel photos Rohtak', 'hotel rooms Rohtak', 'banquet hall photos Rohtak'],
  openGraph: {
    title: 'Photo Gallery — The ParkQueen Hotel, Rohtak',
    description:
      'Browse photos of The ParkQueen Hotel, Rohtak — rooms, fine dining, banquet halls, bar & lounge, and hotel exteriors.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Photo Gallery | The ParkQueen Hotel',
    description: 'Rooms, dining, banquets, and more at The ParkQueen Hotel, Rohtak.',
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://parkqueenhotels.com'}/gallery`,
  },
}

export default function GalleryLayout({ children }) {
  return children
}
