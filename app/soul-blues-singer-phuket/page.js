import PublicFormatLanding from '../components/PublicFormatLanding'

export const metadata = {
  title: 'Soul & Blues Singer in Phuket for Events & Venues',
  description:
    'Book Cole Ley for soul and blues live vocals in Phuket hotels, restaurants, beach clubs, weddings, cocktail hours, private events and destination celebrations.',
  alternates: { canonical: '/soul-blues-singer-phuket' },
  openGraph: {
    title: 'Soul & Blues Singer Phuket | Cole Ley',
    description: 'Soul and blues live vocals for Phuket venues, weddings and events.',
    url: '/soul-blues-singer-phuket',
    images: ['/cole-event-corporate.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Soul & Blues Singer Phuket | Cole Ley',
    description: 'Soul and blues live vocals by Cole Ley for Phuket venues and events.',
    images: ['/cole-event-corporate.png'],
  },
}

export default function SoulBluesSingerPhuketPage() {
  return (
    <PublicFormatLanding
      slug="soul-blues-singer-phuket"
      eyebrow="SOUL · BLUES · PHUKET"
      title="Soul & Blues Singer in Phuket"
      intro="Cole Ley performs soul and blues live vocals for hotel lounges, restaurants, sunset sessions, weddings, cocktail hours, private events and destination celebrations. The sound can stay intimate or expand through duo, trio and full-band formats."
      image="/cole-event-corporate.png"
      serviceName="Soul & Blues Singer in Phuket"
      serviceDescription="Soul and blues live vocals by Cole Ley for Phuket hotels, restaurants, weddings, beach clubs, corporate events and private celebrations."
      serviceType="Soul and blues singer and live vocalist"
      sections={[
        { label: 'SOUL', title: 'Warm Vocals for Elegant Rooms', text: 'Soul works naturally for cocktail hours, dinners, lounges, weddings and private events where the music should feel expressive and present without overwhelming conversation.' },
        { label: 'BLUES', title: 'Character, Groove and Live Feel', text: 'Blues brings more edge and musical conversation into the set. It can sit comfortably inside a relaxed dinner or become part of a stronger trio or full-band performance later in the night.' },
        { label: 'FLEXIBLE FORMAT', title: 'From Intimate to Full Band', text: 'The same soul and blues direction can be performed as solo vocal, acoustic, duo, trio or full band, allowing the energy to scale with the venue and event schedule.' },
        { label: 'MIXED REPERTOIRE', title: 'Soul and Blues Without Being Locked to One Genre', text: 'A booking can lean heavily into soul and blues or blend those styles with jazz and contemporary songs when the audience or event needs more variety.' },
      ]}
      faq={[
        { question: 'Who is a soul singer in Phuket for weddings and events?', answer: 'Cole Ley is a Phuket-based live singer performing soul, blues, jazz and contemporary music for weddings, hotels, restaurants, beach clubs, corporate events and private celebrations.' },
        { question: 'Can Cole Ley perform a dedicated soul or blues set?', answer: 'Yes. The repertoire can lean strongly into soul and blues or combine those styles with jazz and contemporary material depending on the venue and audience.' },
        { question: 'Is soul and blues suitable for wedding cocktail hour or dinner?', answer: 'Yes. Soul and blues can work especially well for cocktail hours, dinner, lounges and sunset settings where the music should feel warm, live and social.' },
        { question: 'Can the soul or blues format become a full band later?', answer: 'Yes. A booking can begin with an intimate vocal, acoustic or duo setup and expand into trio or full band as the event needs more energy.' },
        { question: 'Does Cole perform soul and blues outside Phuket?', answer: 'Yes. Destination and international bookings can be discussed through the booking form with travel and routing handled through the artist-agency workflow.' },
      ]}
    />
  )
}
