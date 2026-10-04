import PublicFormatLanding from '../components/PublicFormatLanding'

export const metadata = {
  title: 'Live Band in Phuket for Events & Venues',
  description: 'Book Cole Ley with trio or full live band for Phuket weddings, beach clubs, corporate events, private parties, hotels and destination celebrations.',
  alternates: { canonical: '/live-band-phuket' },
  openGraph: {
    title: 'Live Band Phuket | Cole Ley',
    description: 'Trio and full-band live entertainment for Phuket events and venues.',
    url: '/live-band-phuket',
    images: ['/cole-full-band.png'],
  },
}

export default function LiveBandPhuketPage() {
  return (
    <PublicFormatLanding
      slug="live-band-phuket"
      eyebrow="TRIO · FULL BAND · PHUKET"
      title="Live Band in Phuket"
      intro="Cole Ley can scale from trio to full live band for weddings, beach clubs, gala dinners, corporate events, private parties and venue nights. The lineup is built around the room, audience, schedule and energy required."
      image="/cole-full-band.png"
      serviceName="Live Band in Phuket"
      serviceDescription="Cole Ley trio and full live band for Phuket weddings, beach clubs, hotels, corporate events and private parties."
      serviceType="Live band entertainment"
      sections={[
        { label: 'FULLER SOUND', title: 'When the Event Needs More Energy', text: 'A full band adds live rhythm, dynamics and stage presence for receptions, gala dinners, beach clubs and parties where the music needs to move from atmosphere into a central part of the night.' },
        { label: 'FLEXIBLE LINEUP', title: 'Trio or Full Band', text: 'Not every event needs the largest setup. A trio can deliver strong live energy with a smaller footprint, while a full band creates more arrangement depth and visual impact.' },
        { label: 'EVENT FLOW', title: 'Build the Night in Chapters', text: 'The performance can be planned around cocktails, dinner, speeches and the party rather than running as one fixed block. Earlier sections can stay controlled before the band opens up later.' },
        { label: 'PRODUCTION', title: 'Sound, Stage and Venue Coordination', text: 'Band bookings require more production planning than solo formats. Venue access, stage space, sound system, soundcheck timing and technical coordination can be advanced before show day.' },
      ]}
      faq={[
        { question: 'What is the difference between trio and full band?', answer: 'A trio uses a smaller lineup and production footprint. A full band adds more live instrumentation, arrangement depth and stage energy.' },
        { question: 'Can the band play weddings and corporate events?', answer: 'Yes. The lineup can be adapted for wedding receptions, gala dinners, awards, product launches, private parties and venue entertainment.' },
        { question: 'Does the venue need its own sound system?', answer: 'Not always, but production requirements need to be confirmed in advance. Existing venue equipment, required PA, monitors, stage space and soundcheck timing are part of advancing.' },
        { question: 'Can Cole perform solo earlier and bring in the band later?', answer: 'Yes. Multi-format events can move from solo or acoustic music into a trio or full-band section later in the programme.' },
      ]}
    />
  )
}
