import { getCustomizer } from "../data/customizers.js";

const SITE = "https://customly.it";
const DEFAULT_OG_IMAGE = SITE + "/assets/wallpaper.jpg";

const meta = {
  "/": {
    title: "Customly | Trova customizer e crea capi personalizzati",
    description:
      "Customly connette clienti e customizer indipendenti per creare abbigliamento personalizzato, unico e su misura. Trova il professionista giusto, configura il capo e avvia la collaborazione.",
    ogType: "website",
    keywords:
      "custom fashion, customizer, personalizzazione capi, denim custom, rework, upcycling, fashion italiano, artigiani moda, abbigliamento su misura",
    author: "Lorenzo Perassi",
    geo: { region: "Piemonte", country: "IT", lat: "44.5564", lng: "7.4091" },
  },
  "/configuratore": {
    title: "Configuratore Customly | Progetta il tuo capo personalizzato",
    description:
      "Usa il configuratore Customly per scegliere modello, colore e modifiche. Preview SVG in tempo reale e invio diretto al customizer.",
    ogType: "website",
    keywords:
      "configuratore moda, personalizzazione visiva, preview SVG, custom jeans, custom t-shirt, design capo",
  },
  "/customizers": {
    title:
      "Customizer italiani | Trova artisti e artigiani della custom fashion",
    description:
      "Esplora i profili dei customizer italiani. Portfolio, servizi, stili e recensioni per trovare il professionista giusto per il tuo progetto.",
    ogType: "website",
    keywords:
      "customizer italiani, artigiani moda, fashion designer, rework denim, upcycling, personalizzazione abbigliamento, custom fashion Italia",
  },
  "/venditori": {
    title: "Per i professionisti | Customly",
    description:
      "Customly è la piattaforma per customizer, artigiani e brand che vogliono offrire personalizzazioni professionali senza caos.",
    ogType: "website",
    keywords:
      "diventare customizer, vendere personalizzazioni, piattaforma fashion, artigiani moda Italia",
  },
  "/contatti": {
    title: "Contatti | Customly",
    description:
      "Contattaci per candidarti come customizer, proporre un'idea o richiedere informazioni sulla piattaforma Customly.",
    ogType: "website",
  },
  "/termini": {
    title: "Termini e condizioni | Customly",
    description: "Termini e condizioni di utilizzo della piattaforma Customly.",
    ogType: "website",
  },
  "/privacy": {
    title: "Privacy Policy | Customly",
    description:
      "Informativa sul trattamento dei dati personali ai sensi del GDPR. Scopri come Customly protegge la tua privacy.",
    ogType: "website",
  },
};

function getCreatorMeta(id) {
  const c = getCustomizer(id);
  const name = c
    ? c.name
    : id.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const city = c ? c.city : "";
  const styles = c ? c.styles.join(", ") : "";
  const desc = c
    ? `${c.tagline} ${c.bio ? c.bio.slice(0, 120) : ""}`
    : `Profilo del customizer ${name} su Customly.`;
  const kw = [
    "customizer " + (city || name),
    "personalizzazione capi",
    styles,
    "custom fashion Italia",
    "rework denim",
    "upcycling",
    city ? "customizer " + city : "",
  ]
    .filter(Boolean)
    .join(", ");

  return {
    title: name + " | Customizer — Customly",
    description: desc,
    ogType: "profile",
    keywords: kw,
    author: name,
    geo:
      c && c.city
        ? { locality: c.city, region: c.region, country: c.country || "IT" }
        : undefined,
    ogImage: c && c.image ? SITE + "/" + c.image : DEFAULT_OG_IMAGE,
  };
}

function resolve(path) {
  if (meta[path]) return meta[path];
  if (path.startsWith("/customizers/")) {
    const id = path.split("/customizers/")[1];
    if (id) return getCreatorMeta(id);
  }
  return {
    title: "Customly | Custom fashion su misura",
    description:
      "Customly connette clienti e customizer indipendenti per creare abbigliamento personalizzato.",
    ogType: "website",
  };
}

function setTag(tag, attrs) {
  const key = Object.keys(attrs)[0];
  const val = attrs[key];
  let el = document.querySelector(`meta[${key}="${val}"]`);
  if (!el) {
    el = document.querySelector(`meta[name="${key}"], meta[property="${key}"]`);
  }
  if (!el) {
    el = document.createElement("meta");
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
    document.head.appendChild(el);
  } else {
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
  }
}

export function applySeo(path) {
  const data = resolve(path);
  const url = SITE + path;
  const img = data.ogImage || DEFAULT_OG_IMAGE;

  document.title = data.title;

  setTag("name", { name: "description", content: data.description });
  setTag("name", { name: "author", content: data.author || "Customly" });
  if (data.keywords)
    setTag("name", { name: "keywords", content: data.keywords });

  setTag("property", { property: "og:title", content: data.title });
  setTag("property", { property: "og:description", content: data.description });
  setTag("property", { property: "og:url", content: url });
  setTag("property", { property: "og:type", content: data.ogType });
  setTag("property", { property: "og:site_name", content: "Customly" });
  setTag("property", { property: "og:image", content: img });
  setTag("property", { property: "og:image:width", content: "1200" });
  setTag("property", { property: "og:image:height", content: "630" });
  setTag("property", { property: "og:locale", content: "it_IT" });

  setTag("name", { name: "twitter:card", content: "summary_large_image" });
  setTag("name", { name: "twitter:site", content: "@diario_di_uno_09" });
  setTag("name", { name: "twitter:creator", content: "@diario_di_uno_09" });
  setTag("name", { name: "twitter:title", content: data.title });
  setTag("name", { name: "twitter:description", content: data.description });
  setTag("name", { name: "twitter:image", content: img });

  if (data.geo) {
    if (data.geo.region)
      setTag("name", { name: "geo.region", content: data.geo.region });
    if (data.geo.country)
      setTag("name", { name: "geo.placename", content: data.geo.country });
    if (data.geo.locality)
      setTag("name", {
        name: "geo.placename",
        content: data.geo.locality,
      });
    if (data.geo.lat && data.geo.lng)
      setTag("name", {
        name: "geo.position",
        content: data.geo.lat + ";" + data.geo.lng,
      });
  }

  setTag("name", {
    name: "robots",
    content: "index, follow, max-snippet:-1, max-image-preview:large",
  });

  let canonical = document.querySelector("link[rel='canonical']");
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.appendChild(canonical);
  }
  canonical.setAttribute("href", url);
}
