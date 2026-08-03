(function () {
  "use strict";

  var LANDING_PATHS = [
    "/preventivo-pulizia-divani-cagliari/",
    "/pulizia-lavaggio-poltrone-a-domicilio-cagliari/"
  ];
  if (LANDING_PATHS.indexOf(window.location.pathname) === -1) return;

  var PREVIEW_LOCATIONS = {
    cagliari: ["Cagliari e hinterland", "Servizio a domicilio disponibile a Cagliari", "Cagliari"],
    quartucciu: ["Cagliari e Quartucciu", "Servizio a domicilio disponibile anche a Quartucciu", "Quartucciu"],
    "quartu-sant-elena": ["Cagliari e Quartu Sant'Elena", "Servizio a domicilio disponibile anche a Quartu Sant'Elena", "Quartu Sant'Elena"],
    selargius: ["Cagliari e Selargius", "Servizio a domicilio disponibile anche a Selargius", "Selargius"],
    monserrato: ["Cagliari e Monserrato", "Servizio a domicilio disponibile anche a Monserrato", "Monserrato"],
    sestu: ["Cagliari e Sestu", "Servizio a domicilio disponibile anche a Sestu", "Sestu"],
    elmas: ["Cagliari e Elmas", "Servizio a domicilio disponibile anche a Elmas", "Elmas"],
    assemini: ["Cagliari e Assemini", "Servizio a domicilio disponibile anche a Assemini", "Assemini"],
    capoterra: ["Cagliari e Capoterra", "Servizio a domicilio disponibile anche a Capoterra", "Capoterra"],
    sinnai: ["Cagliari e Sinnai", "Servizio a domicilio disponibile anche a Sinnai", "Sinnai"],
    maracalagonis: ["Cagliari e Maracalagonis", "Servizio a domicilio disponibile anche a Maracalagonis", "Maracalagonis"],
    "settimo-san-pietro": ["Cagliari e Settimo San Pietro", "Servizio a domicilio disponibile anche a Settimo San Pietro", "Settimo San Pietro"]
  };

  function injectStyles() {
    if (document.getElementById("ld-geo-styles")) return;

    var style = document.createElement("style");
    style.id = "ld-geo-styles";
    style.textContent = [
      ".hero-geo{display:flex;align-items:center;gap:8px;margin:-9px 0 20px;color:#147dcc;font-size:14px;font-weight:850}",
      ".hero-geo:before{content:'✓';display:grid;place-items:center;flex:0 0 22px;width:22px;height:22px;border-radius:50%;background:#e3f5eb;color:#128f48;font-size:13px}",
      "@media(max-width:720px){.hero-geo{margin:-6px 0 18px;font-size:13px}}"
    ].join("");
    document.head.appendChild(style);
  }

  function createArmchairTrust() {
    if (window.location.pathname !== "/pulizia-lavaggio-poltrone-a-domicilio-cagliari/") return;
    if (document.getElementById("customer-trust-armchairs")) return;

    var personalSection = document.querySelector(".personal-section");
    if (!personalSection) return;

    var section = document.createElement("section");
    section.id = "customer-trust-armchairs";
    section.className = "section customer-trust-section";
    section.setAttribute("aria-labelledby", "customer-trust-armchairs-title");
    section.innerHTML = '<div class="shell"><div class="customer-trust-heading"><p class="eyebrow">Fiducia</p><h2 id="customer-trust-armchairs-title">Perché i clienti ci richiamano</h2></div><div class="customer-trust-grid"><blockquote><div class="customer-trust-rating" aria-label="5 stelle su 5">★★★★★</div><p>La poltrona era molto segnata sui braccioli e sulla seduta. Dopo il trattamento è tornata pulita, fresca e uniforme.</p><cite>Cliente privato · Cagliari</cite></blockquote><blockquote><div class="customer-trust-rating" aria-label="5 stelle su 5">★★★★★</div><p>Servizio puntuale e preciso. Abbiamo fatto pulire due poltrone senza doverle spostare da casa e il risultato è stato evidente.</p><cite>Cliente privato · Hinterland di Cagliari</cite></blockquote></div></div>';
    personalSection.insertAdjacentElement("afterend", section);
  }

  function createUi() {
    var localBar = document.querySelector(".local-bar");
    var heroLead = document.querySelector(".hero-lead");
    var titleLocation = document.querySelector(".hero-copy h1 span");
    if (!localBar || !heroLead || !titleLocation) return null;

    var bar = document.getElementById("geo-bar");
    if (!bar) {
      var firstNode = localBar.firstChild;
      if (firstNode && firstNode.nodeType === Node.TEXT_NODE) firstNode.nodeValue = "";
      bar = document.createElement("span");
      bar.id = "geo-bar";
      bar.setAttribute("aria-live", "polite");
      bar.textContent = "Cagliari e hinterland";
      bar.style.color = "inherit";
      bar.style.margin = "0";
      localBar.insertBefore(bar, localBar.firstChild);
      localBar.insertBefore(document.createTextNode(" "), bar.nextSibling);
    }

    var hero = document.getElementById("hero-geo");
    if (!hero) {
      hero = document.createElement("p");
      hero.id = "hero-geo";
      hero.className = "hero-geo";
      hero.setAttribute("aria-live", "polite");
      hero.textContent = "Servizio a domicilio a Cagliari e hinterland";
      heroLead.insertAdjacentElement("afterend", hero);
    }

    return { bar: bar, hero: hero, titleLocation: titleLocation };
  }

  function applyGeo(ui, barText, heroText, city) {
    if (typeof barText === "string" && barText.length <= 80) ui.bar.textContent = barText;
    if (typeof heroText === "string" && heroText.length <= 100) ui.hero.textContent = heroText;
    if (typeof city === "string" && city.trim() && city.length <= 40) ui.titleLocation.textContent = "a " + city.trim();
  }

  function previewKey(value) {
    return String(value || "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  function init() {
    injectStyles();
    createArmchairTrust();
    var ui = createUi();
    if (!ui) return;

    var preview = new URLSearchParams(window.location.search).get("geo-preview");
    var previewData = PREVIEW_LOCATIONS[previewKey(preview)];
    if (previewData) {
      applyGeo(ui, previewData[0], previewData[1], previewData[2]);
      return;
    }

    var controller = typeof AbortController === "function" ? new AbortController() : null;
    var timeout = window.setTimeout(function () { if (controller) controller.abort(); }, 1800);

    fetch("/geo.json", {
      method: "GET",
      cache: "no-store",
      credentials: "same-origin",
      signal: controller ? controller.signal : undefined
    })
      .then(function (response) {
        if (!response.ok) throw new Error("Geo endpoint unavailable");
        return response.json();
      })
      .then(function (data) { applyGeo(ui, data.barText, data.heroText, data.city); })
      .catch(function () {})
      .finally(function () { window.clearTimeout(timeout); });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
