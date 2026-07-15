let _hoverCount = 0;

const _quotes = [
  "Zuckerberg? Sounds Irish.",
  "Zuckerberg? Sounds Irish.",
  "Zuckerberg? Sounds Irish.",
  "Drop the The. Just Facebook.",
];

export function renderFooter() {
  return `
<footer>
  <div class="container">
    <div class="grid">
      <div class="footer-brand">
        <span class="logo">Custom<span>ly</span></span>
        <p style="font-style:italic;color:var(--accent)">Make it yours.</p>
        <p>La piattaforma per la custom fashion. Trova un professionista, configura un capo, rendilo tuo.</p>
      </div>
      <div>
        <h4>Naviga</h4>
        <a href="/">Home</a><br>
        <a href="/configuratore">Configuratore</a><br>
        <a href="/customizers">Customizers</a><br>
        <a href="/contatti">Contatti</a>
      </div>
      <div>
        <h4>Social</h4>
        <a href="https://instagram.com/diario_di_uno_09" target="_blank" rel="noopener noreferrer">Instagram</a><br>
        <a href="https://github.com/perassilorenzo" target="_blank" rel="noopener noreferrer">GitHub</a><br>
        <a href="https://www.linkedin.com/in/perassilorenzo" target="_blank" rel="noopener noreferrer">LinkedIn</a><br>
        <a href="https://tiktok.com/@diario_di_uno_09" target="_blank" rel="noopener noreferrer">TikTok</a>
      </div>
      <div>
        <h4>Info</h4>
        <a href="mailto:lorenzo@example.com">Email</a><br>
        <a href="/privacy">Privacy</a><br>
        <a href="/termini">Termini</a>
      </div>
    </div>
    <div class="footer-bottom" style="text-align:center;justify-content:center">
      <span class="footer-production" data-footer-easter>A Lorenzo Perassi Production</span>
    </div>
  </div>
</footer>`;
}

export function initFooter() {
  document.querySelectorAll("[data-footer-easter]").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      const q = _quotes[Math.min(_hoverCount, _quotes.length - 1)];
      _hoverCount++;
      el.setAttribute("data-tooltip", q);
    });
    el.addEventListener("mouseleave", () => {
      el.removeAttribute("data-tooltip");
    });
  });
}
