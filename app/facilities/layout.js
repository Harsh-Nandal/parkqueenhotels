export const metadata = {
  title: 'Hotel Facilities',
  description:
    'Explore world-class facilities at The ParkQueen Hotel, Rohtak — including restaurant & dining, banquet hall, conference hall, bar & lounge, business centre, and free guest parking.',
  keywords: ['hotel facilities Rohtak', 'ParkQueen amenities', 'banquet hall Rohtak', 'conference hall Rohtak', 'bar lounge Rohtak', 'business centre Rohtak'],
  openGraph: {
    title: 'Hotel Facilities — The ParkQueen Hotel, Rohtak',
    description:
      'World-class facilities including fine dining, banquet hall, conference hall, bar & lounge, and business centre at The ParkQueen Hotel, Rohtak.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hotel Facilities | The ParkQueen Hotel',
    description: 'Fine dining, banquets, conference hall, bar & lounge and more at The ParkQueen Hotel, Rohtak.',
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://parkqueenhotels.com'}/facilities`,
  },
}

export default function FacilitiesLayout({ children }) {
  return children
}
