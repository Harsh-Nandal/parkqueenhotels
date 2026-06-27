export const metadata = {
  title: 'Dining & Restaurant',
  description: 'Experience exceptional dining at The ParkQueen Hotel, Rohtak. Fresh & delectable meals served daily — breakfast, lunch, dinner and our Bar & Lounge open 24 hours.',
  keywords: ['restaurant Rohtak', 'dining hotel Rohtak', 'ParkQueen restaurant', 'bar lounge Rohtak'],
  alternates: { canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://parkqueenhotels.com'}/dining` },
}
export default function DiningLayout({ children }) { return children }
