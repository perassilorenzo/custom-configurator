import { customizer as lp } from "../customizers/lorenzo-perassi/data.js";
import { customizer as tmpl } from "../customizers/template/data.js";

const registry = {
  "lorenzo-perassi": lp,
  template: tmpl,
};

export function getCustomizer(id) {
  return registry[id] || null;
}

export function getAllCustomizers() {
  return Object.values(registry);
}
