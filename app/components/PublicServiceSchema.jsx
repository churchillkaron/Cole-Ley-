export default function PublicServiceSchema({
  name,
  description,
  url,
  serviceType,
  image,
  areaServed = ["Phuket", "Thailand"],
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `https://www.coleley.com${url}#service`,
    name,
    description,
    serviceType,
    url: `https://www.coleley.com${url}`,
    image: image ? `https://www.coleley.com${image}` : undefined,
    provider: {
      "@id": "https://www.coleley.com/#cole-ley",
    },
    areaServed: areaServed.map((name) => ({
      "@type": "Place",
      name,
    })),
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: "https://www.coleley.com/booking",
      servicePhone: "+66944271265",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
      }}
    />
  );
}
