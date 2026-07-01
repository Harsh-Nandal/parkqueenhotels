export const dynamic = 'force-dynamic'
import { withAuth, ok } from '@/lib/apiHelpers'
import { connectDB } from '@/lib/db'

// One-time migration: replace the entire facilities.items list (which had
// duplicated/mismatched titles & icons) with the correct 8-item hotel facility list.
// Visit /api/admin/fix-facilities (POST, while logged in as admin) to apply.
const NEW_FACILITIES = [
  { id: 1, image: { url: '/assets/images/rooms/ROOM2.jpg',     public_id: '' }, icon: 'fa-bed',                  title: '40 Spacious Rooms',   text: '40 beautifully appointed rooms and suites, each designed with premium comfort, modern amenities, and elegant interiors for a memorable stay.' },
  { id: 2, image: { url: '/assets/images/dining/NDS_5117.jpg', public_id: '' }, icon: 'fa-utensils',             title: 'Restaurants',         text: 'Savor exceptional cuisine crafted by our chefs — from traditional Indian flavours to continental delights, served in an elegant setting.' },
  { id: 3, image: { url: '/assets/images/dining/NDS_4994.jpg', public_id: '' }, icon: 'fa-martini-glass-citrus', title: 'Well Stocked Bar',    text: 'Unwind with handcrafted cocktails, premium spirits, and fine wines at our well-stocked bar, perfect for relaxing evenings.' },
  { id: 4, image: { url: '/assets/images/events/NDS_5160.jpg', public_id: '' }, icon: 'fa-presentation-screen',  title: 'Conference Halls',    text: 'State-of-the-art conference halls equipped with modern AV technology, ideal for corporate meetings and business gatherings.' },
  { id: 5, image: { url: '/assets/images/events/NDS_5266.jpg', public_id: '' }, icon: 'fa-champagne-glasses',    title: 'Banquet Halls',       text: 'Host your weddings, receptions, and grand celebrations in our beautifully appointed banquet halls designed to impress.' },
  { id: 6, image: { url: '/assets/images/events/NDS_5346.jpg', public_id: '' }, icon: 'fa-chalkboard-user',      title: 'Meeting Rooms',       text: 'Versatile meeting rooms equipped with all essential amenities, perfect for seminars, presentations, and business discussions.' },
  { id: 7, image: { url: '/assets/images/dining/NDS_5151.jpg', public_id: '' }, icon: 'fa-building',             title: 'Rooftop Restaurants', text: 'Enjoy panoramic city views while dining at our rooftop restaurant, offering a memorable culinary experience under the open sky.' },
  { id: 8, image: { url: '/assets/images/home/NDS_5400.jpg',   public_id: '' }, icon: 'fa-square-parking',       title: 'Spacious Parking',    text: 'Secure, complimentary, and spacious parking facilities available for all our guests and visitors round the clock.' },
]

export async function POST(request) {
  return withAuth(request, async () => {
    await connectDB()
    const mongoose = (await import('mongoose')).default
    const db = mongoose.connection.db
    const contentCol = db.collection('contents')

    await contentCol.updateOne(
      { page: 'facilities' },
      { $set: { 'data.items': NEW_FACILITIES } },
      { upsert: true }
    )

    return ok({ message: 'Facilities list replaced successfully.', count: NEW_FACILITIES.length })
  })
}

export async function GET(request) {
  return withAuth(request, async () => {
    return ok({ message: 'POST to this endpoint to replace facilities.items in the database.' })
  })
}
