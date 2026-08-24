export default function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://junglegold.pk/#organization",
    name: "Jungle Gold Raw Honey Pakistan",
    alternateName: ["Jungle Gold", "JungleGold.pk", "جنگل گولڈ شہد"],
    url: "https://junglegold.pk",
    logo: {
      "@type": "ImageObject",
      url: "https://junglegold.pk/brand-logo.png",
      width: 512,
      height: 512,
    },
    image: [
      "https://junglegold.pk/brand-logo.png",
      "https://junglegold.pk/hero-jar.jpg",
      "https://junglegold.pk/harvest.jpg",
    ],
    description:
      "Pakistan's premier producer of 100% pure raw jungle honey and unpasteurized organic Sidr honey. Harvested from wild forest hives in Swat, Karak, Kohat, Attock & Kaghan. PCSIR lab certified. Founded in 1995 as part of the Razzaq Pansar Store legacy. Nationwide Cash on Delivery.",
    telephone: "+92-324-0917740",
    email: "junglegoldofficials@gmail.com",
    foundingDate: "1995",
    foundingLocation: {
      "@type": "Place",
      name: "Gujrat, Punjab, Pakistan",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Gujrat City",
      addressLocality: "Gujrat",
      addressRegion: "Punjab",
      addressCountry: "PK",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "32.5742",
      longitude: "74.0754",
    },
    hasMap: "https://maps.google.com/?q=Gujrat,Punjab,Pakistan",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "22:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Sunday"],
        opens: "10:00",
        closes: "20:00",
      },
    ],
    parentOrganization: {
      "@type": "Organization",
      name: "Razzaq Pansar Store",
      description:
        "A trusted authority in authentic herbal, natural, and traditional wellness products in Pakistan since 1995.",
    },
    sameAs: [
      "https://facebook.com/junglegoldofficials",
      "https://instagram.com/junglegoldofficials",
      "https://tiktok.com/@junglegoldofficials",
      "https://youtube.com/@junglegoldofficials",
      "https://wa.me/923240917740",
    ],
    areaServed: [
      { "@type": "Country", name: "Pakistan" },
      { "@type": "City", name: "Lahore" },
      { "@type": "City", name: "Karachi" },
      { "@type": "City", name: "Islamabad" },
      { "@type": "City", name: "Rawalpindi" },
      { "@type": "City", name: "Peshawar" },
      { "@type": "City", name: "Gujrat" },
      { "@type": "City", name: "Faisalabad" },
      { "@type": "City", name: "Multan" },
      { "@type": "City", name: "Quetta" },
      { "@type": "City", name: "Hyderabad" },
      { "@type": "City", name: "Sialkot" },
    ],
    priceRange: "PKR 1,200 - PKR 4,500",
    paymentAccepted: "Cash on Delivery (COD), Online Bank Transfer",
    currenciesAccepted: "PKR",
    knowsAbout: [
      "Pure Raw Jungle Honey",
      "Unpasteurized Organic Honey",
      "Organic Sidr Beri Honey Pakistan",
      "Wild Forest Honey Swat & Skardu",
      "PCSIR Lab Tested Raw Honey",
      "Karak Sidr Honey",
      "Kaghan Valley Wild Honey",
      "Bee Pollen and Propolis",
      "Razzaq Pansar Store Traditional Wellness",
      "Natural Honey Delivery Pakistan COD",
    ],
    makesOffer: {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Nationwide Cash on Delivery (COD) Raw Honey Shipping",
      },
      priceCurrency: "PKR",
      price: "0.00",
      eligibleRegion: { "@type": "Country", name: "Pakistan" },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "312",
      bestRating: "5",
      worstRating: "1",
    },
    award: "Rs. 50,000 Purity Guarantee — 100% Refund + Compensation if any adulteration found",
    slogan: "خالص شہد — براہ راست جنگل سے (Pure Honey — Direct from the Forest)",
    keywords:
      "pure raw honey Pakistan, Sidr honey Karak, jungle honey Swat, organic honey COD, buy honey online Pakistan",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
