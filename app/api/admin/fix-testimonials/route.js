export const dynamic = 'force-dynamic'
import { withAuth, ok, err } from '@/lib/apiHelpers'
import { connectDB } from '@/lib/db'

const INDIAN_TESTIMONIALS = [
  {
    name: 'Rajesh Sharma',
    role: 'Business Executive, Delhi',
    rating: 5,
    content: "The ParkQueen Hotel exceeded my expectations in every way. The conference facilities were outstanding for my corporate meetings, and the rooms offered complete comfort after long work days. Exceptional service throughout!",
    image: { url: 'https://ui-avatars.com/api/?name=Rajesh+Sharma&background=1a1c2e&color=cda434&size=128&rounded=true&bold=true', public_id: '' },
    status: 'active',
    order: 1,
  },
  {
    name: 'Priya Kapoor',
    role: 'Travel Blogger, Chandigarh',
    rating: 5,
    content: "A truly luxurious experience in the heart of Rohtak! The staff's warmth and attentiveness made us feel like royalty. The dining was exceptional — a perfect blend of Indian flavours and continental delicacies.",
    image: { url: 'https://ui-avatars.com/api/?name=Priya+Kapoor&background=cda434&color=1a1c2e&size=128&rounded=true&bold=true', public_id: '' },
    status: 'active',
    order: 2,
  },
  {
    name: 'Amit Verma',
    role: 'Family Traveler, Gurgaon',
    rating: 5,
    content: "We celebrated our anniversary at The ParkQueen Hotel and it was absolutely wonderful. The banquet arrangements were beautiful, the rooms immaculate, and the service was second to none. Will definitely visit again!",
    image: { url: 'https://ui-avatars.com/api/?name=Amit+Verma&background=1a1c2e&color=cda434&size=128&rounded=true&bold=true', public_id: '' },
    status: 'active',
    order: 3,
  },
  {
    name: 'Sunita Mehta',
    role: 'Corporate Guest, Noida',
    rating: 5,
    content: "Best hotel in Rohtak without a doubt! Clean, comfortable, and the staff goes above and beyond. The bar & lounge is perfect for unwinding after a busy day. The breakfast spread was delicious — a true five-star experience.",
    image: { url: 'https://ui-avatars.com/api/?name=Sunita+Mehta&background=cda434&color=1a1c2e&size=128&rounded=true&bold=true', public_id: '' },
    status: 'active',
    order: 4,
  },
  {
    name: 'Deepak Agarwal',
    role: 'Wedding Host, Rohtak',
    rating: 5,
    content: "Hosted my daughter's wedding reception at The ParkQueen Hotel. The banquet hall was beautifully decorated, the catering was magnificent, and the entire team was incredibly professional. A memorable event made even more special!",
    image: { url: 'https://ui-avatars.com/api/?name=Deepak+Agarwal&background=1a1c2e&color=cda434&size=128&rounded=true&bold=true', public_id: '' },
    status: 'active',
    order: 5,
  },
]

export async function POST(request) {
  return withAuth(request, async () => {
    await connectDB()
    const { Testimonial } = await import('@/lib/models/Testimonial')

    // Remove all existing testimonials
    const deleted = await Testimonial.deleteMany({})

    // Insert the new Indian testimonials
    const inserted = await Testimonial.insertMany(INDIAN_TESTIMONIALS)

    return ok({
      message: 'Testimonials replaced successfully',
      deleted: deleted.deletedCount,
      inserted: inserted.length,
      names: inserted.map(t => t.name),
    })
  })
}

export async function GET(request) {
  return withAuth(request, async () => {
    await connectDB()
    const { Testimonial } = await import('@/lib/models/Testimonial')
    const all = await Testimonial.find({}, 'name role status').lean()
    return ok({ count: all.length, testimonials: all })
  })
}
