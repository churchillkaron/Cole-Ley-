import PublicFormatLanding from '../components/PublicFormatLanding'

export const metadata = {
  title: 'Jazz Singer in Phuket for Events & Venues',
  description: 'Book Cole Ley for jazz, soul and blues live vocals in Phuket hotels, lounges, restaurants, beach clubs, weddings and private events.',
  alternates: { canonical: '/jazz-singer-phuket' },
  openGraph: {
    title: 'Jazz Singer Phuket | Cole Ley',
    description: 'Jazz, soul and blues live vocals for Phuket venues and events.',
    url: '/jazz-singer-phuket',
    images: ['/cole-event-corporate.png'],
  },
}

export default function JazzSingerPhuketPage() {
  return (
    <PublicFormatLanding
      slug="jazz-singer-phuket"
      eyebrow="JAZZ · SOUL · BLUES · PHUKET"
      title="Jazz Singer in Phuket"
      intro="Cole Ley performs refined jazz, soul and blues for hotel lounges, sunset sessions, cocktail hours, restaurants, weddings, corporate events and private nights. The format can stay intimate or expand into a trio or full live band."
      image="/cole-event-corporate.png"
      serviceName="Jazz Singer in Phuket"
      serviceDescription="Jazz, soul and blues live vocals by Cole Ley for Phuket hotels, lounges, restaurants, weddings, corporate events and private celebrations."
      serviceType="Jazz singer and live vocalist"
      sections={[
        { label: 'LOUNGE & DINNER', title: 'Music That Leaves Room for the Room', text: 'For lounges, restaurants and dinner service, the performance can sit inside the atmosphere rather than dominate it. Jazz standards, soul, blues and modern songs can be shaped around the venue, service flow and guest profile.' },
        { label: 'SUNSET & COCKTAILS', title: 'Warm, Elegant and Social', text: 'Sunset sessions and cocktail hours need enough character to feel live without becoming a concert too early. Cole can perform solo, with acoustic guitar, as a duo or with a compact rhythm section depending on the energy required.' },
        { label: 'TRIO & BAND', title: 'Scale Up Without Losing the Style', text: 'For gala dinners, beach clubs and later-night sets, the same jazz, soul and blues foundation can expand into trio or full-band arrangements with more movement, dynamics and dance-floor energy.' },
        { label: 'INTERNATIONAL', title: 'From Phuket to Singapore', text: 'Cole’s public performance references include Phuket venue residencies and international jazz appearances, making the format suitable for resorts, destination events and premium hospitality programmes.' },
      ]}
      faq={[
        { question: 'Can Cole perform a dedicated jazz set?', answer: 'Yes. The set can lean heavily into jazz, soul and blues, or blend those styles with contemporary songs depending on the venue and audience.' },
        { question: 'Is this suitable for hotels and restaurants?', answer: 'Yes. The format is especially suitable for hotel lounges, restaurants, cocktail hours, dinner service and sunset settings where volume and pacing matter.' },
        { question: 'Can the jazz format become a full band later in the night?', answer: 'Yes. A booking can move from intimate vocals or acoustic music into duo, trio or full-band energy when the event needs a stronger second phase.' },
        { question: 'Does Cole perform outside Phuket?', answer: 'Yes. Destination and international bookings can be discussed through the booking form with travel and routing handled as part of the artist-agency workflow.' },
      ]}
    />
  )
}
