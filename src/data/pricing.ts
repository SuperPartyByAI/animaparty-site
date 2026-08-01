import { siteConfig } from "../config/site";

export type PricingTier = {
  id: string;
  duration: string;
  price: number;
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
    ideal: "Potrivit pentru grupuri restrânse de până la 12 copii și spații bine delimitate.",
    ctaVariant: "outline",
    features: [
      "Jocuri interactive adaptate vârstei",
      "Ateliere de creație cu baloane",
      "Sistem audio profesional",
      "Asistență la tort",
      "Moment special Balloon Exploder (la pachetele de 2h/3h)",
      "Pariul distracției cu Piñata (la pachetul de 3h)"
    ],
    tiers: [
      {
        id: "one-animator-1h",
        duration: "1 Oră",
        price: 280,
        offerName: "Pachet 1 Animator / 1 Oră",
        description: "Potrivit pentru grupuri restrânse de până la 12 copii și spații bine delimitate."
      },
      {
        id: "one-animator-2h",
        duration: "2 Ore",
        price: 490,
        recommended: true,
        label: "Standard Recomandat",
        offerName: "Pachet 1 Animator / 2 Ore",
        description: "Varianta standard recomandată pentru petreceri complete."
      },
      {
        id: "one-animator-3h",
        duration: "3 Ore",
        price: 640,
        offerName: "Pachet 1 Animator / 3 Ore",
        description: "Pentru evenimente lungi, susține un program extins de activități."
      }
    ],
  },
  {
    id: "two-animators",
    title: "2 Personaje Animatoare",
    ideal: "Potrivit pentru grupuri mai mari, peste 15 copii, spații deschise sau curți.",
    highlighted: true,
    ctaVariant: "primary",
    features: [
      "Doi entertaineri coordonatori simultan",
      "Gestionare grupuri mixte, vârste diferite",
      "Dinamism ridicat în spații mari",
      "Jocuri interactive și ateliere de baloane",
      "Sistem audio profesional și asistență tort",
      "Balloon Exploder și Piñata (la pachetele extinse)"
    ],
    tiers: [
      {
        id: "two-animators-1h",
        duration: "1 Oră",
        price: 490,
        offerName: "Pachet 2 Animatori / 1 Oră",
        description: "Potrivit pentru grupuri mai mari, spații deschise sau curți mari, peste 15 copii."
      },
      {
        id: "two-animators-2h",
        duration: "2 Ore",
        price: 830,
        recommended: true,
        label: "Optim Grupuri Mari",
        offerName: "Pachet 2 Animatori / 2 Ore",
        description: "Recomandat pentru grupuri mari și diversitate în animație."
      },
      {
        id: "two-animators-3h",
        duration: "3 Ore",
        price: 1120,
        offerName: "Pachet 2 Animatori / 3 Ore",
        description: "Program extins cu interacțiune susținută, potrivit pentru grupuri mari și activități variate."
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
        id: "mascota-1h",
        duration: "1 Oră",
        price: 350,
        offerName: "Închiriere Mascotă / 1 Oră",
        description: "Prezența mascotei pentru primirea invitaților sau momentul tortului."
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
        id: "stilt-walker-1h",
        duration: "1 Oră (1 Animator)",
        price: 1450,
        offerName: "Animator Picioroange / 1 Oră",
        description: "Pentru evenimente stradale, lansări de produse, petreceri de mari dimensiuni sau momente de întâmpinare a invitaților."
      },
      {
        id: "two-stilt-walkers-1h",
        duration: "1 Oră (2 Animatori)",
        price: 2750,
        offerName: "2 Animatori Picioroange / 1 Oră",
        description: "Impact vizual dublu pentru evenimente de scară largă."
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

export const formatPrice = (price: number) =>
  `${price} RON`;

export const minPackagePrice = Math.min(...pricingTiers.map((tier) => tier.price));
export const maxPackagePrice = Math.max(...pricingTiers.map((tier) => tier.price));

export const priceRange = `${formatPrice(minPackagePrice)} - ${formatPrice(maxPackagePrice)}`;
