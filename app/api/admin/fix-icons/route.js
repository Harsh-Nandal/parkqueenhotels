export const dynamic = 'force-dynamic'
import { withAuth, ok, err } from '@/lib/apiHelpers'
import { connectDB } from '@/lib/db'

// One-time migration: replace old icons (swimming pool, gym, spa) in all collections
// Visit /api/admin/fix-icons while logged in as admin to apply the fix
export async function POST(request) {
  return withAuth(request, async () => {
    await connectDB()

    const mongoose = (await import('mongoose')).default
    const db = mongoose.connection.db

    const ICON_REPLACEMENTS = [
      // Fitness & Gym → Bar & Lounge
      {
        filter: { $or: [{ title: 'Fitness & Gym' }, { icon: 'fa-dumbbell' }] },
        update: { $set: { title: 'Bar & Lounge', icon: 'fa-martini-glass-citrus', category: 'dining', description: 'Unwind at our elegant bar and lounge offering premium spirits, cocktails, and a curated selection of beverages in a relaxed, sophisticated ambiance.' } },
      },
      // Spa & Wellness → Business Centre
      {
        filter: { $or: [{ title: 'Spa & Wellness' }, { icon: 'fa-restroom' }] },
        update: { $set: { title: 'Business Centre', icon: 'fa-briefcase', category: 'business', description: 'Fully equipped business centre with high-speed internet, printing, scanning, and secretarial support services — ideal for corporate guests and business travellers.' } },
      },
      // Swimming Pool → Conference Hall (in case it's still in DB)
      {
        filter: { $or: [{ title: 'Swimming Pool' }, { icon: 'fa-person-swimming' }] },
        update: { $set: { title: 'Conference Hall', icon: 'fa-presentation-screen', category: 'events', description: 'State-of-the-art conference and meeting facilities for corporate events, seminars, presentations, and business gatherings.' } },
      },
    ]

    const results = {}

    // Fix the services collection
    const servicesCol = db.collection('services')
    for (const { filter, update } of ICON_REPLACEMENTS) {
      const r = await servicesCol.updateMany(filter, update)
      results[`services:${update.$set.title}`] = r.modifiedCount
    }

    // Fix content.json-backed Content collection (facilities.items)
    const contentCol = db.collection('contents')
    const facilitiesDoc = await contentCol.findOne({ page: 'facilities' })
    if (facilitiesDoc?.data?.items) {
      let changed = false
      const items = facilitiesDoc.data.items.map(item => {
        if (item.icon === 'fa-dumbbell' || item.title === 'Fitness & Gym') {
          changed = true
          return { ...item, title: 'Bar & Lounge', icon: 'fa-martini-glass-citrus', text: 'Unwind at our elegant bar and lounge offering premium spirits, cocktails, and a curated selection of beverages in a relaxed ambiance.' }
        }
        if (item.icon === 'fa-restroom' || item.title === 'Spa & Wellness') {
          changed = true
          return { ...item, title: 'Business Centre', icon: 'fa-briefcase', text: 'Fully equipped business centre with high-speed internet, printing, and support services for corporate guests.' }
        }
        if (item.icon === 'fa-person-swimming' || item.title === 'Swimming Pool') {
          changed = true
          return { ...item, title: 'Conference Hall', icon: 'fa-presentation-screen', text: 'State-of-the-art conference and meeting facilities for corporate events and business gatherings.' }
        }
        return item
      })
      if (changed) {
        await contentCol.updateOne({ page: 'facilities' }, { $set: { 'data.items': items } })
        results['content:facilities.items'] = 'updated'
      }
    }

    return ok({ message: 'Icons updated successfully', results })
  })
}

export async function GET(request) {
  return withAuth(request, async () => {
    return ok({ message: 'POST to this endpoint to fix icons in the database.' })
  })
}
