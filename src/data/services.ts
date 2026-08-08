export type ServiceTruth = {
  id: string;
  name: string;
  active: boolean;
  hubDescription: string;
  ageRule?: string;
  operatorRule?: string;
  consumablesRule?: string;
  transportBucuresti?: string;
  transportIlfov?: string;
  url: string;
};

export const businessServices: Record<string, ServiceTruth> = {
  animatori: {
    id: "animatori",
    name: "Animatori Petreceri Copii",
    active: true,
    hubDescription: "Personaje interactive pentru jocuri și activități, cu modelaj de baloane și pictură pe față acolo unde pachetul și timpul permit.",
    ageRule: "Adaptat în funcție de media de vârstă a grupului.",
    transportBucuresti: "Fără taxă de transport în Sector 1-6.",
    transportIlfov: "Taxă de transport aplicabilă în funcție de distanța față de București.",
    url: "/animatori-petreceri-copii-bucuresti/"
  },
  mascote: {
    id: "mascote",
    name: "Închiriere Mascote",
    active: true,
    hubDescription: "Costume voluminoase pentru întâmpinarea invitaților, aducerea tortului și fotografii.",
    transportBucuresti: "Fără taxă de transport în Sector 1-6.",
    url: "/mascote-petreceri-copii/"
  },
  picioroange: {
    id: "picioroange",
    name: "Animatori pe Picioroange",
    active: true,
    hubDescription: "Spectacol și vizibilitate crescută pentru evenimente corporate, lansări și festivaluri.",
    transportBucuresti: "Fără taxă de transport în Sector 1-6.",
    url: "/animatori-pe-picioroange/"
  },
  magician: {
    id: "magician",
    name: "Magician",
    active: true,
    hubDescription: "Spectacole interactive de magie adaptate vârstei participanților și formatului evenimentului.",
    ageRule: "Programul se adaptează în funcție de vârsta participanților.",
    transportBucuresti: "Fără taxă de transport în Sector 1-6.",
    url: "/magician-petreceri-copii/"
  },
  food_stations: {
    id: "food_stations",
    name: "Food Stations (Vată de Zahăr & Popcorn)",
    active: true,
    hubDescription: "Configurații cu sau fără operator și consumabile, în funcție de pachetul confirmat.",
    operatorRule: "Posibilitate de operator dedicat la cerere.",
    consumablesRule: "Pachete flexibile cu sau fără consumabile incluse.",
    transportBucuresti: "Fără taxă de transport în Sector 1-6.",
    url: "/vata-de-zahar-popcorn-evenimente/"
  },
  decor: {
    id: "decor",
    name: "Decorațiuni din Baloane",
    active: true,
    hubDescription: "Arcade organice asimetrice pentru intrări sau panouri foto, și buchete de baloane cu heliu.",
    transportBucuresti: "Fără taxă de transport în Sector 1-6.",
    url: "/decoratiuni-baloane-bucuresti/"
  }
};
