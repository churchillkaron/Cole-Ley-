import Link from "next/link";

export default function PublicBreadcrumbs({ items = [] }) {
  const allItems = [{ label: "Home", href: "/" }, ...items];

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.href ? `https://www.coleley.com${item.href}` : undefined,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
      <nav
        aria-label="Breadcrumb"
        className="px-6 md:px-16 py-4 border-b border-white/10 bg-[#080808] text-[11px] tracking-[0.18em] text-white/45"
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-2">
          {allItems.map((item, index) => (
            <span key={`${item.label}-${index}`} className="flex items-center gap-2">
              {index > 0 && <span className="text-white/20">/</span>}
              {item.href && index < allItems.length - 1 ? (
                <Link href={item.href} className="hover:text-[#d4af37] transition">
                  {item.label}
                </Link>
              ) : (
                <span className={index === allItems.length - 1 ? "text-white/65" : ""}>
                  {item.label}
                </span>
              )}
            </span>
          ))}
        </div>
      </nav>
    </>
  );
}