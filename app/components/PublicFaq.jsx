export default function PublicFaq({ title = "Frequently Asked Questions", items = [] }) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };

  return (
    <section className="px-6 md:px-16 py-20 bg-[#080808] border-y border-white/10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
        }}
      />
      <div className="max-w-5xl mx-auto">
        <p className="text-[#d4af37] tracking-[0.32em] text-xs mb-5">GOOD TO KNOW</p>
        <h2 className="font-serif text-4xl md:text-6xl mb-10">{title}</h2>
        <div className="grid md:grid-cols-2 gap-x-10 gap-y-8">
          {items.map(({ question, answer }) => (
            <div key={question} className="border-t border-white/10 pt-6">
              <h3 className="text-lg text-white mb-3">{question}</h3>
              <p className="text-white/60 leading-7">{answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
