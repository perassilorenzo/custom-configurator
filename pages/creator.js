import { getCustomizer, getAllCustomizers } from "../data/customizers.js";
import { navigate } from "../utils/router.js";

function esc(s) {
  if (!s) return "";
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function stars(n) {
  return "★".repeat(n) + "☆".repeat(5 - n);
}

function avatarImg(c, size, cls) {
  if (c.image) return `<img src="${c.image}" alt="${esc(c.name)}">`;
  const s = size > 60 ? 36 : size > 40 ? 24 : 18;
  return `<div class="${cls}-placeholder">${c.name.charAt(0)}</div>`;
}

/* ---- Profile renderers ---- */

function renderHero(c) {
  const coverContent = c.cover
    ? `<img src="${c.cover}" alt="">`
    : `<div class="creator-cover-placeholder"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg></div>`;
  return `
    <div class="creator-hero">
      <div class="creator-cover">${coverContent}</div>
      <div class="creator-hero-body">
        <div class="creator-avatar-lg">${avatarImg(c, 110, "creator-avatar-lg")}</div>
        <div class="creator-hero-info">
          <div class="creator-badge-lg">${esc(c.category || "Customizer")}</div>
          <h1 class="creator-name">${esc(c.name)}</h1>
          <p class="creator-tagline">${esc(c.tagline)}</p>
          <div class="creator-location">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
            ${esc(c.city)}${c.country ? `, ${esc(c.country)}` : ""}
          </div>
          <div class="creator-hero-actions">
            <button class="cfg-btn cfg-btn-primary" data-start-creator="${c.id}">Customize with me</button>
            ${c.portfolio && c.portfolio.length ? `<button class="cfg-btn cfg-btn-secondary" data-scroll="portfolio">View portfolio</button>` : ""}
          </div>
        </div>
      </div>
    </div>`;
}

function renderAbout(c) {
  if (!c.bio) return "";
  return `
    <div class="creator-section" data-section="about">
      <div class="creator-section-title">About</div>
      <div class="creator-about-text">${esc(c.bio)}</div>
    </div>`;
}

function renderSkills(c) {
  if (!c.skills || !c.skills.length) return "";
  return `
    <div class="creator-section" data-section="skills">
      <div class="creator-section-title">Skills & Specialties</div>
      <div class="creator-skills">
        ${c.skills.map((s) => `<span class="creator-skill">${esc(s)}</span>`).join("")}
      </div>
    </div>`;
}

function renderServices(c) {
  if (!c.services || !c.services.length) return "";
  return `
    <div class="creator-section" data-section="services">
      <div class="creator-section-title">Services</div>
      <div class="creator-services">
        ${c.services
          .map(
            (s) => `
          <div class="creator-service-card">
            <div class="creator-service-name">${esc(s.name)}</div>
            <div class="creator-service-desc">${esc(s.description)}</div>
            ${s.price ? `<div class="creator-service-price">${esc(s.price)}</div>` : ""}
          </div>`,
          )
          .join("")}
      </div>
    </div>`;
}

function renderAvailableForCustomization(c) {
  const items = c.availableForCustomization;
  if (!items || !items.length) return "";
  return `
    <div class="creator-section" data-section="available-for-customization">
      <div class="creator-section-title">Available for customization</div>
      <div class="creator-catalog">
        ${items
          .map(
            (a) => `
          <div class="creator-catalog-item">
            <div class="creator-catalog-image">
              ${a.image ? `<img src="${a.image}" alt="${esc(a.item)}">` : "&#9670;"}
            </div>
            <div class="creator-catalog-body">
              <h4>${esc(a.item)}</h4>
              <p>${esc(a.technique)}</p>
              <button class="cfg-btn cfg-btn-primary" data-customize-garment="${c.id}:${a.garmentType || ""}:${a.basePrice || 0}">Customize</button>
            </div>
          </div>`,
          )
          .join("")}
      </div>
    </div>`;
}

function renderProducts(c) {
  if (!c.products || !c.products.length) return "";
  const statusLabel = {
    available: "Available",
    sold: "Sold",
    reserved: "Reserved",
  };
  return `
    <div class="creator-section" data-section="products">
      <div class="creator-section-title">Shop</div>
      <div class="creator-products">
        ${c.products
          .map(
            (p) => `
          <div class="creator-product-card">
            <div class="creator-product-image">
              ${p.image ? `<img src="${p.image}" alt="${esc(p.name)}">` : "&#9670;"}
            </div>
            <div class="creator-product-body">
              <div class="creator-product-header">
                <h4>${esc(p.name)}</h4>
                <span class="creator-product-status creator-product-status--${p.status}">${statusLabel[p.status] || p.status}</span>
              </div>
              <p>${esc(p.description)}</p>
              <div class="creator-product-footer">
                <span class="creator-product-price">€${p.price}</span>
              </div>
            </div>
          </div>`,
          )
          .join("")}
      </div>
    </div>`;
}

function renderPortfolio(c) {
  if (!c.portfolio || !c.portfolio.length) return "";
  return `
    <div class="creator-section" data-section="portfolio">
      <div class="creator-section-title">Previous projects</div>
      <div class="creator-portfolio">
        ${c.portfolio
          .map(
            (p) => `
          <div class="creator-portfolio-item">
            <div class="creator-portfolio-image">
              ${p.images && p.images.length ? `<img src="${p.images[0]}" alt="${esc(p.title)}">` : "&#9632;"}
            </div>
            <div class="creator-portfolio-body">
              <h4>${esc(p.title)}</h4>
              <p>${esc(p.description)}</p>
              ${
                p.techniques && p.techniques.length
                  ? `
                <div class="creator-portfolio-techniques">
                  ${p.techniques.map((t) => `<span>${esc(t)}</span>`).join("")}
                </div>`
                  : ""
              }
            </div>
          </div>`,
          )
          .join("")}
      </div>
    </div>`;
}

function renderProcess(c) {
  if (!c.process || !c.process.length) return "";
  return `
    <div class="creator-section" data-section="process">
      <div class="creator-section-title">How it works</div>
      <div class="creator-process">
        ${c.process
          .map(
            (p, i) => `
          <div class="creator-process-step">
            <div class="creator-process-num">${String(i + 1).padStart(2, "0")}</div>
            <div class="creator-process-content">
              <h4>${esc(p.title)}</h4>
              <p>${esc(p.description)}</p>
            </div>
          </div>`,
          )
          .join("")}
      </div>
    </div>`;
}

function renderReviews(c) {
  if (!c.reviews || !c.reviews.length) return "";
  return `
    <div class="creator-section" data-section="reviews">
      <div class="creator-section-title">Reviews</div>
      <div class="creator-reviews">
        ${c.reviews
          .map(
            (r) => `
          <div class="creator-review">
            <div class="creator-review-header">
              <div class="creator-review-author">
                <div class="creator-review-avatar">${r.name.charAt(0)}</div>
                <div>
                  <div class="creator-review-name">${esc(r.name)}</div>
                  ${r.date ? `<div class="creator-review-date">${esc(r.date)}</div>` : ""}
                </div>
              </div>
              <div class="creator-review-stars">${stars(r.rating)}</div>
            </div>
            <div class="creator-review-text">"${esc(r.text)}"</div>
          </div>`,
          )
          .join("")}
      </div>
    </div>`;
}

function renderSocial(c) {
  const links = [];
  if (c.links.instagram)
    links.push({ href: c.links.instagram, label: "Instagram", icon: "ig" });
  if (c.links.email)
    links.push({
      href: "mailto:" + c.links.email,
      label: "Email",
      icon: "mail",
    });
  if (!links.length) return "";
  return `
    <div class="creator-section" data-section="social">
      <div class="creator-section-title">Connect</div>
      <div class="creator-social">
        ${links
          .map(
            (l) => `
          <a href="${esc(l.href)}" target="_blank" rel="noopener" class="creator-social-link">
            ${l.label}
          </a>`,
          )
          .join("")}
      </div>
    </div>`;
}

function renderBottomCta(c) {
  return `
    <div class="creator-section creator-section-cta">
      <div class="creator-cta-content">
        <h3>Have an idea? Create your custom piece</h3>
        <p>Turn your vision into reality. Start customizing with ${esc(c.name)}.</p>
        <button class="cfg-btn cfg-btn-primary" data-start-creator="${c.id}">Start customizing</button>
      </div>
    </div>`;
}

function renderProfileSidebar(c) {
  return `
    <div class="creator-sidebar-card">
      <div class="creator-sidebar-avatar">${avatarImg(c, 56, "creator-sidebar-avatar")}</div>
      <div class="creator-sidebar-name">${esc(c.name)}</div>
      <div class="creator-sidebar-city">${esc(c.city)}${c.country ? `, ${esc(c.country)}` : ""}</div>
      <button class="cfg-btn cfg-btn-primary creator-sidebar-cta" data-start-creator="${c.id}">Start customizing</button>
      ${
        c.links.instagram
          ? `
        <div class="creator-sidebar-info">
          <div class="creator-sidebar-info-item">
            <span class="creator-sidebar-info-label">Instagram</span>
            <a href="${esc(c.links.instagram)}" target="_blank" class="creator-sidebar-info-value">${esc(c.links.instagram.replace(/^https?:\/\/(www\.)?instagram\.com\//, "@"))}</a>
          </div>
        </div>`
          : ""
      }
    </div>`;
}

function renderProfile(c) {
  return `
    <div class="page">
      <div class="container">
        <div class="creator-profile">
          ${renderHero(c)}
          <div class="creator-layout">
            <div class="creator-main-col">
              ${renderAbout(c)}
              ${renderSkills(c)}
              ${renderAvailableForCustomization(c)}
              ${renderProducts(c)}
              ${renderPortfolio(c)}
              ${renderReviews(c)}
              ${renderSocial(c)}
              ${renderBottomCta(c)}
            </div>
            <div class="creator-sidebar-col">
              ${renderProfileSidebar(c)}
              <a href="#/creator" class="creator-back-link">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                All customizers
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>`;
}

/* ---- List page ---- */

function renderList() {
  const all = getAllCustomizers();
  const opts = collectFilterOptions(all);
  const n = countActive(_listState.filters);
  return `
    <div class="page">
      <div class="container">
        <div class="section-header">
          <span class="label">Customly</span>
          <h2>Discover customizers</h2>
          <p>Find your customizer and start creating something unique.</p>
        </div>
        <div class="creator-list-search">
          <input class="creator-list-search-input" data-search-input type="text" placeholder="Cerca un customizer per nome, città, stile o competenza..." autocomplete="off">
        </div>
        <div class="creator-list-toolbar">
          <button class="creator-filter-toggle" data-toggle-filters>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"/></svg>
            Filters${n ? ` (${n})` : ""}
          </button>
          ${n ? `<button class="creator-clear-all" data-clear-filters>Clear all</button>` : ""}
        </div>
        ${renderActiveFilters(_listState.filters)}
        <div class="creator-grid-list" data-list>
          ${all
            .filter((c) => matchesFilter(c, _listState))
            .map(renderListItem)
            .join("")}
        </div>
        <div class="creator-list-empty" data-empty style="display:none">
          <h3>No customizer found</h3>
          <p>Try changing your search or filters.</p>
        </div>
      </div>
    </div>
    ${renderFilterPanel(opts, _listState.filters)}
  `;
}

function collectFilterOptions(all) {
  const styles = new Set();
  const garments = new Set();
  const techniques = new Set();
  const locations = new Set();
  for (const c of all) {
    if (c.styles) c.styles.forEach((s) => styles.add(s));
    if (c.garments) c.garments.forEach((g) => garments.add(g));
    if (c.techniques) c.techniques.forEach((t) => techniques.add(t));
    if (c.city) locations.add(c.city);
    if (c.region) locations.add(c.region);
    if (c.country) locations.add(c.country);
  }
  return {
    styles: [...styles].sort(),
    garments: [...garments].sort(),
    techniques: [...techniques].sort(),
    locations: [...locations].sort(),
  };
}

function countActive(filters) {
  return Object.values(filters).reduce((sum, arr) => sum + arr.length, 0);
}

function renderFilterPanel(opts, current) {
  const groups = [
    { key: "styles", label: "Style", options: opts.styles },
    { key: "locations", label: "Location", options: opts.locations },
    { key: "garments", label: "Garment", options: opts.garments },
    { key: "techniques", label: "Technique", options: opts.techniques },
  ];
  return `
    <div class="creator-filter-overlay" data-filter-overlay style="display:none">
      <div class="creator-filter-panel">
        <div class="creator-filter-panel-header">
          <h3>Filters</h3>
          <button class="creator-filter-panel-close" data-filter-close>&times;</button>
        </div>
        <div class="creator-filter-panel-body">
          ${groups
            .map(
              (g) => `
            <div class="creator-filter-group">
              <div class="creator-filter-group-label">${g.label}</div>
              <div class="creator-filter-checkboxes">
                ${g.options
                  .map(
                    (o) => `
                  <label class="creator-filter-checkbox${current[g.key].includes(o) ? " checked" : ""}">
                    <input type="checkbox" data-filter-opt="${g.key}" value="${esc(o)}" ${current[g.key].includes(o) ? "checked" : ""}>
                    <span class="creator-filter-checkbox-mark"></span>
                    <span>${esc(o)}</span>
                  </label>`,
                  )
                  .join("")}
              </div>
            </div>`,
            )
            .join("")}
        </div>
        <div class="creator-filter-panel-footer">
          <button class="cfg-btn cfg-btn-ghost" data-clear-all>Clear all</button>
          <button class="cfg-btn cfg-btn-primary" data-apply-filters>Apply</button>
        </div>
      </div>
    </div>`;
}

function renderActiveFilters(filters) {
  const chips = [];
  for (const [group, values] of Object.entries(filters)) {
    for (const v of values) {
      chips.push({ group, value: v });
    }
  }
  if (!chips.length) return "";
  return `
    <div class="creator-active-filters">
      ${chips
        .map(
          (ch) => `
        <span class="creator-active-chip">
          ${esc(ch.value)}
          <button class="creator-chip-remove" data-remove-filter="${ch.group}:${esc(ch.value)}">&times;</button>
        </span>`,
        )
        .join("")}
    </div>`;
}

function renderListItem(c) {
  return `
    <a href="#/creator/${c.id}" class="creator-list-card" data-list-item="${c.id}">
      <div class="creator-list-avatar">${avatarImg(c, 52, "creator-list")}</div>
      <div class="creator-list-info">
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
          <h3>${esc(c.name)}</h3>
          ${c.category ? `<span style="font-size:9px;padding:2px 7px;border:1px solid var(--accent);color:var(--accent);text-transform:uppercase;letter-spacing:.06em;font-weight:600">${esc(c.category)}</span>` : ""}
        </div>
        <div class="creator-list-card-city">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
          ${esc(c.city)}${c.country ? `, ${esc(c.country)}` : ""}
        </div>
        <p>${esc(c.tagline)}</p>
        ${
          c.skills && c.skills.length
            ? `
          <div class="creator-list-card-tags">
            ${c.skills
              .slice(0, 3)
              .map((s) => `<span>${esc(s)}</span>`)
              .join("")}
          </div>`
            : ""
        }
      </div>
    </a>`;
}

function matchesFilter(c, state) {
  const f = state.filters;
  if (
    f.styles.length &&
    !f.styles.some((s) => c.styles && c.styles.includes(s))
  )
    return false;
  if (
    f.garments.length &&
    !f.garments.some((g) => c.garments && c.garments.includes(g))
  )
    return false;
  if (
    f.techniques.length &&
    !f.techniques.some((t) => c.techniques && c.techniques.includes(t))
  )
    return false;
  if (
    f.locations.length &&
    !f.locations.some((l) => c.city === l || c.region === l || c.country === l)
  )
    return false;
  if (!state.query) return true;
  const q = state.query.toLowerCase();
  return (
    c.name.toLowerCase().includes(q) ||
    c.tagline.toLowerCase().includes(q) ||
    (c.city && c.city.toLowerCase().includes(q)) ||
    (c.country && c.country.toLowerCase().includes(q)) ||
    (c.category && c.category.toLowerCase().includes(q)) ||
    (c.skills && c.skills.some((s) => s.toLowerCase().includes(q))) ||
    (c.styles && c.styles.some((s) => s.toLowerCase().includes(q))) ||
    (c.garments && c.garments.some((g) => g.toLowerCase().includes(q)))
  );
}

let _listState = {
  query: "",
  filters: { styles: [], garments: [], techniques: [], locations: [] },
};
let _filterOpts = null;

function applyListFilter() {
  const all = getAllCustomizers();
  const list = document.querySelector("[data-list]");
  const empty = document.querySelector("[data-empty]");
  if (!list) return;
  const filtered = all.filter((c) => matchesFilter(c, _listState));
  list.innerHTML = filtered.map((c) => renderListItem(c)).join("");
  if (empty) empty.style.display = filtered.length ? "none" : "block";

  /* update toolbar + active chips */
  const toolbar = document.querySelector(".creator-list-toolbar");
  const activeEl = document.querySelector(".creator-active-filters");
  const n = countActive(_listState.filters);
  if (toolbar) {
    const toggle = toolbar.querySelector("[data-toggle-filters]");
    if (toggle) toggle.innerHTML = `Filters${n ? ` (${n})` : ""}`;
    const clear = toolbar.querySelector("[data-clear-filters]");
    if (n) {
      if (!clear)
        toolbar.insertAdjacentHTML(
          "beforeend",
          '<button class="creator-clear-all" data-clear-filters>Clear all</button>',
        );
    } else {
      if (clear) clear.remove();
    }
  }
  if (activeEl) {
    activeEl.outerHTML = renderActiveFilters(_listState.filters);
  } else if (n) {
    const grid = document.querySelector(".creator-grid-list");
    if (grid)
      grid.insertAdjacentHTML(
        "beforebegin",
        renderActiveFilters(_listState.filters),
      );
  }
}

/* ---- exports ---- */

export function renderCreator(ctx) {
  const id = ctx.id;
  if (!id) return renderList();
  const c = getCustomizer(id);
  if (!c) {
    return `
      <div class="page">
        <div class="container" style="text-align:center;padding:80px 0">
          <h2 style="font-family:var(--font-heading);font-size:28px;margin-bottom:12px">Customizer not found</h2>
          <p style="color:var(--text-secondary);margin-bottom:24px">This professional isn't on the platform yet.</p>
          <a href="#/creator" class="cfg-btn cfg-btn-primary">Browse customizers</a>
        </div>
      </div>`;
  }
  return renderProfile(c);
}

export function initCreator() {
  /* Profile page: CTA buttons (delegated to support multiple buttons) */
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-start-creator]");
    if (btn) {
      const id = btn.dataset.startCreator;
      if (id) navigate("/configuratore?creator=" + id);
    }
    const custBtn = e.target.closest("[data-customize-garment]");
    if (custBtn) {
      const parts = custBtn.dataset.customizeGarment.split(":");
      const id = parts[0];
      const gtype = parts[1];
      const bprice = parts[2];
      if (gtype)
        navigate(
          `/configuratore?creator=${id}&garment=${gtype}&basePrice=${bprice}`,
        );
      else navigate(`/configuratore?creator=${id}`);
    }
  });
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-scroll]");
    if (btn) {
      const section = btn.dataset.scroll;
      if (section) {
        const el = document.querySelector(`[data-section="${section}"]`);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  });

  /* List page: search */
  const searchInput = document.querySelector("[data-search-input]");
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      _listState.query = searchInput.value;
      applyListFilter();
    });
  }

  /* Precompute filter options */
  _filterOpts = collectFilterOptions(getAllCustomizers());

  /* List page: toggle filters button */
  document
    .querySelector("[data-toggle-filters]")
    ?.addEventListener("click", () => {
      rebuildFilterPanelContent();
      const overlay = document.querySelector("[data-filter-overlay]");
      if (overlay) overlay.style.display = "";
    });

  /* List page: filter panel events (delegated) */
  document.addEventListener("click", (e) => {
    const overlay = document.querySelector("[data-filter-overlay]");
    if (!overlay) return;
    const target = e.target;

    if (target.closest("[data-filter-close]")) {
      overlay.style.display = "none";
      return;
    }
    if (
      target.closest("[data-filter-overlay]") &&
      !target.closest(".creator-filter-panel")
    ) {
      overlay.style.display = "none";
      return;
    }
    if (target.closest("[data-clear-all]")) {
      const cbs = overlay.querySelectorAll("[data-filter-opt]");
      cbs.forEach((cb) => {
        cb.checked = false;
        cb.closest(".creator-filter-checkbox")?.classList.remove("checked");
      });
      _listState.filters = {
        styles: [],
        garments: [],
        techniques: [],
        locations: [],
      };
      overlay.style.display = "none";
      applyListFilter();
      return;
    }
    if (target.closest("[data-apply-filters]")) {
      const filters = {
        styles: [],
        garments: [],
        techniques: [],
        locations: [],
      };
      const cbs = overlay.querySelectorAll("[data-filter-opt]:checked");
      cbs.forEach((cb) => {
        const group = cb.dataset.filterOpt;
        if (filters[group]) filters[group].push(cb.value);
      });
      _listState.filters = filters;
      overlay.style.display = "none";
      applyListFilter();
      return;
    }
  });

  /* List page: remove single filter chip */
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-remove-filter]");
    if (!btn) return;
    const val = btn.dataset.removeFilter;
    const colon = val.indexOf(":");
    const group = val.slice(0, colon);
    const value = val.slice(colon + 1);
    const arr = _listState.filters[group];
    if (arr) {
      _listState.filters[group] = arr.filter((v) => v !== value);
      applyListFilter();
    }
  });

  /* List page: clear all filters */
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-clear-filters]");
    if (!btn) return;
    _listState.filters = {
      styles: [],
      garments: [],
      techniques: [],
      locations: [],
    };
    applyListFilter();
  });

  /* List page: checkbox toggle visual */
  document.addEventListener("change", (e) => {
    const cb = e.target.closest("[data-filter-opt]");
    if (!cb) return;
    cb.closest(".creator-filter-checkbox")?.classList.toggle(
      "checked",
      cb.checked,
    );
  });
}

function rebuildFilterPanelContent() {
  const overlay = document.querySelector("[data-filter-overlay]");
  if (!overlay) {
    const container = document.querySelector(".container");
    if (!container) return;
    container.insertAdjacentHTML(
      "beforeend",
      renderFilterPanel(_filterOpts, _listState.filters),
    );
  } else {
    const body = overlay.querySelector(".creator-filter-panel-body");
    const footer = overlay.querySelector(".creator-filter-panel-footer");
    if (body) {
      const groups = [
        { key: "styles", label: "Style", options: _filterOpts.styles },
        { key: "locations", label: "Location", options: _filterOpts.locations },
        { key: "garments", label: "Garment", options: _filterOpts.garments },
        {
          key: "techniques",
          label: "Technique",
          options: _filterOpts.techniques,
        },
      ];
      body.innerHTML = groups
        .map(
          (g) => `
        <div class="creator-filter-group">
          <div class="creator-filter-group-label">${g.label}</div>
          <div class="creator-filter-checkboxes">
            ${g.options
              .map(
                (o) => `
              <label class="creator-filter-checkbox${_listState.filters[g.key].includes(o) ? " checked" : ""}">
                <input type="checkbox" data-filter-opt="${g.key}" value="${esc(o)}" ${_listState.filters[g.key].includes(o) ? "checked" : ""}>
                <span class="creator-filter-checkbox-mark"></span>
                <span>${esc(o)}</span>
              </label>`,
              )
              .join("")}
          </div>
        </div>`,
        )
        .join("");
    }
  }
}
