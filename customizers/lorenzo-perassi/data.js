export const customizer = {
  id: "lorenzo-perassi",
  name: "Lorenzo Perassi",
  tagline: "Denim customization artigianale.",
  bio: "Ogni capo Perassi Custom nasce da un'idea, da un taglio sbagliato o da un jeans dimenticato nell'armadio. Lavoro denim, rework e streetwear, trasformando vestiti dimenticati in pezzi unici.\n\nIl mio approccio è artigianale e sperimentale. Non produco in serie — ogni pezzo è pensato per chi non vuole assomigliare a nessuno. Parto dal capo che hai, ascolto la tua idea e la trasformo in qualcosa di reale.\n\nCredo nella moda lenta, nel recupero e nella personalizzazione come forma di espressione. Un capo modificato racconta una storia: la tua.",
  image: null,
  cover: null,
  city: "Saluzzo",
  region: "Piemonte",
  country: "Italia",
  category: "Denim Customizer",
  styles: ["Denim customization", "Rework", "Streetwear artigianale"],
  garments: ["Jeans", "T-Shirt", "Cargo"],
  techniques: [
    "Denim customization",
    "Cucito artigianale",
    "Ricamo",
    "Upcycling",
    "Rework",
  ],
  skills: [
    "Denim customization",
    "Cucito artigianale",
    "Ricamo",
    "Upcycling",
    "Streetwear",
    "Rework",
  ],
  services: [
    {
      name: "Custom Jeans",
      description:
        "Modifica completa di jeans esistenti: tagli, inserti, flare, baggy ricostruiti, vita regolabile e molto altro.",
      price: "Da €50",
    },
    {
      name: "T-Shirt Rework",
      description:
        "Trasformazione di T-shirt con nodi, cuciture a vista, tagli, ricami e ricostruzioni creative.",
      price: "Da €25",
    },
    {
      name: "Denim Repair & Restyle",
      description:
        "Riparazione e restyling di capi denim danneggiati. Dare nuova vita ai tuoi jeans preferiti.",
      price: "Da €35",
    },
    {
      name: "Custom Embroidery",
      description:
        "Ricami personalizzati su qualsiasi capo. Nomi, loghi, disegni, pattern unici fatti a mano.",
      price: "Da €20",
    },
  ],
  availableForCustomization: [
    {
      item: "Flared Jeans",
      technique: "Inserti in tessuto contrast, cuciture a vista",
      image: null,
      garmentType: "jeans",
      basePrice: 30,
    },
    {
      item: "Baggy Reconstructed",
      technique: "Ricostruzione con vita regolabile e dettagli custom",
      image: null,
      garmentType: "jeans",
      basePrice: 35,
    },
    {
      item: "Cargo Custom",
      technique: "Tasche custom e modifiche strutturali",
      image: null,
      garmentType: "jeans",
      basePrice: 35,
    },
    {
      item: "T-Shirt Ricostruite",
      technique: "Nodi, cuciture a vista e dettagli artigianali",
      image: null,
      garmentType: "tshirt",
      basePrice: 15,
    },
  ],
  products: [
    {
      id: "lp-prod-1",
      name: "Custom Flared Jeans",
      image: null,
      gallery: [],
      description:
        "Jeans flare con inserti in tessuto contrast, disponibili per acquisto immediato.",
      price: 85,
      status: "available",
    },
    {
      id: "lp-prod-2",
      name: "Baggy Reconstructed",
      image: null,
      gallery: [],
      description:
        "Baggy ricostruiti con dettagli custom, pezzo unico già realizzato.",
      price: 110,
      status: "sold",
    },
    {
      id: "lp-prod-3",
      name: "T-Shirt Rework",
      image: null,
      gallery: [],
      description:
        "T-shirt trasformata con nodi e cuciture a vista, pronta per essere spedita.",
      price: 40,
      status: "available",
    },
    {
      id: "lp-prod-4",
      name: "Denim Patch Jacket",
      image: null,
      gallery: [],
      description:
        "Giacca denim con toppe ricamate a mano e modifiche strutturali.",
      price: 150,
      status: "reserved",
    },
  ],
  portfolio: [
    {
      title: "Flared Denim Project",
      description:
        "Trasformazione di un jeans regular in un paio di flare con inserti in tessuto contract. Cuciture a contrasto e vita regolabile.",
      images: [],
      techniques: ["Denim customization", "Cucito artigianale", "Rework"],
    },
    {
      title: "Baggy Reconstruction",
      description:
        "Ricostruzione completa di un jeans baggy con tessuti recuperati. Vita regolabile, tasche custom e dettagli streetwear.",
      images: [],
      techniques: ["Upcycling", "Cucito artigianale", "Streetwear"],
    },
    {
      title: "T-Shirt Rework Series",
      description:
        "Serie di T-shirt trasformate con nodi, tagli strategici, ricami e ricostruzioni asimmetriche.",
      images: [],
      techniques: ["Ricamo", "Rework", "Streetwear"],
    },
  ],
  process: [
    {
      title: "Idea",
      description:
        "Parliamo di cosa vuoi ottenere. Mi racconti la tua visione, il tuo stile e su quale capo vuoi lavorare. Qualsiasi idea è benvenuta.",
    },
    {
      title: "Progetto",
      description:
        "Definiamo insieme modifiche, tessuti, tecniche e dettagli. Ogni progetto è personalizzato e studiato per essere realizzabile.",
    },
    {
      title: "Personalizzazione",
      description:
        "Metto mano al capo. Tagli, cuciture, ricami, ricostruzioni — ogni passaggio è fatto a mano con attenzione ai dettagli.",
    },
    {
      title: "Revisione",
      description:
        "Documento il lavoro in corso e ti mostro i progressi. Eventuali modifiche vengono discusse e applicate prima della finale.",
    },
    {
      title: "Consegna",
      description:
        "Il capo è pronto. Lo ricevi a casa o ci vediamo di persona. Il tuo pezzo unico è finalmente tuo.",
    },
  ],
  reviews: [
    {
      name: "Marco R.",
      rating: 5,
      text: "Lorenzo ha trasformato un mio vecchio jeans in un capo incredibile. Professionale, creativo e super disponibile. Consigliatissimo!",
      date: "2025-11-20",
    },
    {
      name: "Sofia G.",
      rating: 5,
      text: "Avevo una maglia che non mettevo più, ora è il mio capo preferito. Lavoro artigianale di altissimo livello.",
      date: "2025-10-05",
    },
    {
      name: "Alessandro B.",
      rating: 4,
      text: "Ottimo lavoro sul mio jeans baggy. Ha capito subito cosa volevo e il risultato è stato perfetto.",
      date: "2025-09-12",
    },
  ],
  links: {
    instagram: "https://instagram.com/perassicustom",
    email: null,
  },
  availableForCommissions: true,
};
