export default function manifest() {
  return {
    id: "/",
    name: "Cole Ley",
    short_name: "Cole Ley",
    description: "Cole Ley — live artist, singer and entertainment bookings.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#101010",
    theme_color: "#101010",
    icons: [
      { src: "/logo-cole.png", type: "image/png", purpose: "any" },
    ],
  };
}
