export const metadata = {
  title: 'Book a Room',
  description: 'Book your stay at The ParkQueen Hotel, Rohtak. Easy and secure online booking with instant confirmation. Executive Rooms, Superior Rooms, Queen Suite & Presidential Suite.',
  keywords: ['book hotel room Rohtak', 'online booking ParkQueen', 'reserve hotel Rohtak'],
  alternates: { canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://parkqueenhotels.com'}/booking` },
}
export default function BookingLayout({ children }) { return children }
