import { customizer as lp } from "../customizers/lorenzo-perassi/data.js";
import { customizer as tmpl } from "../customizers/template/data.js";
import { BASE_PATH } from "../utils/router.js";

const registry = {
  "lorenzo-perassi": lp,
  template: tmpl,
};

function resolveAsset(p) {
  if (!p || p.startsWith("http") || p.startsWith("data:") || p.startsWith("/"))
    return p;
  return BASE_PATH + "/" + p;
}

function resolveAssets(c) {
  if (c._assetsResolved) return c;
  c.image = resolveAsset(c.image);
  c.cover = resolveAsset(c.cover);
  if (c.products)
    c.products.forEach((p) => {
      p.image = resolveAsset(p.image);
      if (p.gallery) p.gallery = p.gallery.map(resolveAsset);
    });
  if (c.portfolio)
    c.portfolio.forEach((p) => {
      if (p.images) p.images = p.images.map(resolveAsset);
    });
  if (c.availableForCustomization)
    c.availableForCustomization.forEach((a) => {
      a.image = resolveAsset(a.image);
    });
  c._assetsResolved = true;
  return c;
}

export function getCustomizer(id) {
  const c = registry[id] || null;
  return c ? resolveAssets(c) : null;
}

export function getAllCustomizers() {
  return Object.values(registry).map(resolveAssets);
}
