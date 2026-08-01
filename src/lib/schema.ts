import { siteConfig } from "../config/site";
import { pricingTiers, priceRange } from "../data/pricing";
import { faqHome } from "../data/faqHome";

export const buildHomeSchema = () => {
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": "EntertainmentBusiness",
    name: siteConfig.name,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "București",
      addressRegion: "București",
      addressCountry: "RO"
    },
    priceRange,
    areaServed: [
      {
        "@type": "City",
        name: siteConfig.areas.city,
      },
      {
        "@type": "AdministrativeArea",
        name: siteConfig.areas.county,
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Pachete Animatori Petreceri Copii",
      itemListElement: pricingTiers.map((tier, index) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: tier.offerName,
          description: tier.description || "Program complet de animație și divertisment pentru copii."
        },
        position: index + 1,
        price: String(tier.price),
        priceCurrency: siteConfig.currency,
        url: `${siteConfig.url}#pachete`,
      }))
    }
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Animatori petreceri copii București și Ilfov",
    provider: {
      "@type": "EntertainmentBusiness",
      name: siteConfig.name
    },
    areaServed: [
      {
        "@type": "City",
        name: siteConfig.areas.city,
      },
      {
        "@type": "AdministrativeArea",
        name: siteConfig.areas.county,
      }
    ],
    description: "Servicii de animație pentru petreceri de copii, inclusiv jocuri, pictură pe față și modelaj de baloane."
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqHome.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };

  return [baseSchema, serviceSchema, faqSchema];
};
