import { siteConfig } from "../config/site";

export type PricingTier = {
  id: string;
  duration: string;
  price: number | null;
  label?: string;
  recommended?: boolean;
  offerName: string;
  description?: string;
};

export type PricingGroup = {
  id: string;
  title: string;
  ideal: string;
  highlighted?: boolean;
  ctaVariant: "primary" | "outline";
  features: string[];
  tiers: PricingTier[];
};

export const pricingGroups: PricingGroup[] = [
  {
    id: "one-animator",
    title: "1 Personaj Animator",
    ideal: "Potrivit pentru grupuri restrânse și spații bine delimitate.",
    ctaVariant: "outline",
    features: [
      "Jocuri interactive adaptate vârstei",
      "Ateliere de creație cu baloane",
      "Sistem audio profesional",
      "Asistență la tort",
      "",
      "Pariul distracției cu Piñata (opțional, la cerere)"
    ],
    tiers: [
      {
        id: "one-animator-1h",
        duration: "1 Oră",
        price: 280,
        offerName: "Pachet 1 Animator / 1 Oră",
        description: "Potrivit pentru grupuri restrânse și spații bine delimitate."
      },
      {
        id: "one-animator-2h",
        duration: "2 Ore",
        price: 490,
        recommended: true,
        label: "Standard Recomandat",
        offerName: "Pachet 1 Animator / 2 Ore",
        description: "Varianta standard recomandată pentru petreceri complete."
      }
    ],
  },
  {
    id: "two-animators",
    title: "2 Personaje Animatoare",
    ideal: "Pentru grupuri mai mari, spații deschise sau programe cu mai multe activități, pot fi recomandați doi animatori.",
    highlighted: true,
    ctaVariant: "primary",
    features: [
      "Doi entertaineri coordonatori simultan",
      "Gestionare grupuri mixte, vârste diferite",
      "Dinamism ridicat în spații mari",
      "Jocuri interactive și ateliere de baloane",
      "Sistem audio profesional și asistență tort",
      ""
    ],
    tiers: [
      {
        id: "two-animators-1h",
        duration: "1 Oră",
        price: 490,
        offerName: "Pachet 2 Animatori / 1 Oră",
        description: "Pentru grupuri mai mari, spații deschise sau programe cu mai multe activități."
      },
      {
        id: "two-animators-2h",
        duration: "2 Ore",
        price: 830,
        recommended: true,
        label: "Optim Grupuri Mari",
        offerName: "Pachet 2 Animatori / 2 Ore",
        description: "Recomandat pentru grupuri mari și diversitate în animație."
      }
    ],
  },
  {
    id: "mascote",
    title: "Pachet Mascote",
    ideal: "Pentru momente speciale, surprize la tort și primirea invitaților.",
    ctaVariant: "outline",
    features: [
      "Welcome guests cu mascota preferată",
      "Sesiune foto profesională la minut",
      "Asistență la tort cu cântec de La mulți ani",
      "Interacțiune non-verbală prietenoasă"
    ],
    tiers: [
      {
        id: "mascota-flex",
        duration: "La cerere",
        price: null,
        offerName: "Închiriere Mascotă",
        description: "Configurația și durata se confirmă înainte de rezervare."
      }
    ],
  },
  {
    id: "picioroange",
    title: "Animatori pe Picioroange",
    ideal: "Pentru evenimente stradale, lansări sau petreceri de mari dimensiuni open-air.",
    ctaVariant: "outline",
    features: [
      "Welcome guests la locație",
      "Costume tematice spectaculoase",
      "Interacțiune și photo-corner mobil",
      "Impact vizual ridicat pentru spații mari"
    ],
    tiers: [
      {
        id: "stilt-flex",
        duration: "La cerere",
        price: null,
        offerName: "Animatori pe Picioroange",
        description: "Numărul de performeri, durata și logistica se confirmă înainte de rezervare."
      }
    ],
  }
];

export const pricingTiers = pricingGroups.flatMap((group) =>
  group.tiers.map((tier) => ({
    ...tier,
    groupId: group.id,
    groupTitle: group.title,
  }))
);

export const pricedTiers = pricingTiers.filter(
  (tier): tier is typeof tier & { price: number } => typeof tier.price === "number"
);

export const formatPrice = (price: number) => `${price} RON`;

export const minPackagePrice = Math.min(...pricedTiers.map((tier) => tier.price));
export const maxPackagePrice = Math.max(...pricedTiers.map((tier) => tier.price));

export const priceRange = `${formatPrice(minPackagePrice)} - ${formatPrice(maxPackagePrice)}`;
