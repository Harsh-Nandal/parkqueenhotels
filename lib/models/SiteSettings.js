import mongoose from 'mongoose'

const SiteSettingsSchema = new mongoose.Schema(
  {
    siteName: { type: String, default: 'The ParkQueen Hotel' },
    tagline: { type: String, default: 'Luxury Hotel in Rohtak' },
    logo: { url: String, public_id: String },
    favicon: { url: String, public_id: String },
    phone: { type: [String], default: ['+91 9088809991', '+91 9088809992', '+91 9088879994', '+91 9088879995'] },
    diningPhone: { type: [String], default: ['+91 9088879990', '+91 9088879991', '+91 9088809993', '+91 9088809994'] },
    email: { type: [String], default: ['info@parkqueenhotels.com'] },
    whatsapp: { type: String },
    address: { type: String, default: 'The ParkQueen Hotel, Near Delhi Bypass, Rohtak, Haryana 124001, India' },
    city: { type: String, default: 'Rohtak' },
    state: { type: String, default: 'Haryana' },
    country: { type: String, default: 'India' },
    pincode: { type: String, default: '124001' },
    mapEmbed: {
      type: String,
      default: 'https://maps.google.com/maps?q=The+ParkQueen+Hotel+Rohtak+Haryana&t=&z=14&ie=UTF8&iwloc=&output=embed',
    },
    social: {
      facebook: { type: String, default: 'https://www.facebook.com/hotelparkqueen/#' },
      twitter: { type: String, default: 'https://x.com/parkqueenhotel_' },
      instagram: { type: String, default: 'https://www.instagram.com/parkqueenhotel_rohtak/?hl=en' },
      linkedin: { type: String, default: 'https://www.linkedin.com/in/parkqueen-hotels-and-resorts-9a2532400/' },
      youtube: { type: String, default: '#' },
    },
    footer: {
      tagline: { type: String, default: 'At The ParkQueen Hotel, luxury is a crafted experience that blends elegance, comfort, and exceptional service in Rohtak.' },
      copyright: { type: String, default: 'The ParkQueen Hotel' },
      backgroundImage: { url: String, public_id: String },
      checkIn: { type: String, default: '12:00 PM' },
      checkOut: { type: String, default: '11:00 AM' },
      weekdayHours: { type: String, default: 'Open 24 Hours' },
      saturdayHours: { type: String, default: 'Open 24 Hours' },
      sundayClosed: { type: Boolean, default: false },
    },
    seo: {
      title: { type: String, default: 'The ParkQueen Hotel — Rohtak, Haryana' },
      description: { type: String, default: 'The ParkQueen Hotel in Rohtak, Haryana — Luxury stays, dining and events in Rohtak, India.' },
      keywords: { type: String, default: 'ParkQueen Hotel, Rohtak hotel, luxury hotel Rohtak, hotel Haryana' },
      ogImage: { url: String, public_id: String },
    },
  },
  { timestamps: true }
)

export const SiteSettings =
  mongoose.models.SiteSettings || mongoose.model('SiteSettings', SiteSettingsSchema)
