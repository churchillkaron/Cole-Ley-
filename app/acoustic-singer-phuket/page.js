import PublicFormatLanding from '../components/PublicFormatLanding'

export const metadata = {
  title: 'Acoustic Singer Phuket',
  description: 'Book Cole Ley for solo acoustic live music in Phuket weddings, sunset events, hotels, restaurants, private dinners and destination celebrations.',
  alternates: { canonical: '/acoustic-singer-phuket' },
  openGraph: {
    title: 'Acoustic Singer Phuket | Cole Ley',
    description: 'Solo acoustic live music for Phuket weddings, venues and private events.',
    url: '/acoustic-singer-phuket',
    images: ['/cole-solo-performance.png'],
  },
}

export default function AcousticSingerPhuketPage() {
  return (
    <PublicFormatLanding
      slug="acoustic-singer-phuket"
      eyebrow="SOLO ACOUSTIC · PHUKET"
      title="Acoustic Singer in Phuket"
      intro="Cole Ley’s solo acoustic format combines live vocals and guitar for weddings, ceremonies, cocktail hours, sunset sessions, restaurants, private dinners and events that need real live music without a large production footprint."
      image="/cole-solo-performance.png"
      serviceName="Acoustic Singer in Phuket"
      serviceDescription="Solo acoustic singer and guitarist Cole Ley for Phuket weddings, hotels, restaurants, sunset events and private celebrations."
      serviceType="Acoustic singer and guitarist"
      sections={[
        { label: 'WEDDINGS', title: 'Ceremony to Cocktail Hour', text: 'Acoustic music works naturally for guest arrival, ceremony moments, signing, cocktails and intimate dinner sections. Special-song requests can be discussed before the event so the set supports the actual timeline.' },
        { label: 'HOTELS & RESTAURANTS', title: 'A Small Footprint, Real Performance', text: 'Solo acoustic is practical for restaurants, hotel terraces, lounges and sunset spaces where the performance needs to remain elegant, flexible and easy to place without a full stage setup.' },
        { label: 'PRIVATE EVENTS', title: 'Close Enough to Feel Personal', text: 'For villas, proposals, anniversaries and private dinners, the acoustic format keeps the performance close to the guests and can be built around one meaningful moment or a longer live set.' },
        { label: 'SCALABLE', title: 'Start Acoustic, Add More Later', text: 'A booking does not need to stay solo all night. Acoustic music can open an event before moving into singer-with-DJ, duo, trio or full-band entertainment later.' },
      ]}
      faq={[
        { question: 'Does Cole sing and play guitar herself?', answer: 'Yes. Solo acoustic means Cole performs live vocals with acoustic guitar.' },
        { question: 'Can Cole learn a special song?', answer: 'Special-song requests can be discussed in advance. Feasibility depends on the song, arrangement and preparation time.' },
        { question: 'How much equipment does an acoustic set need?', answer: 'The production footprint is much smaller than a full band, but the exact sound setup depends on the venue size, audience and existing PA system.' },
        { question: 'Can acoustic music be combined with a DJ or band?', answer: 'Yes. Acoustic can be one phase of the event and transition into a higher-energy format later.' },
      ]}
    />
  )
}
