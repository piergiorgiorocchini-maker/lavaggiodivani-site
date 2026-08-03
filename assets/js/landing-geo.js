(function () {
  "use strict";

  var PAGE_CONFIG = {
    "/preventivo-pulizia-divani-cagliari/": { scope: "cagliari" },
    "/pulizia-lavaggio-poltrone-a-domicilio-cagliari/": { scope: "cagliari" },
    "/lavaggio-pulizia-materassi-a-domicilio-cagliari/": { scope: "cagliari" },
    "/pulizia-divani-a-domicilio-sardegna/": { scope: "sardegna", proof: "divani" },
    "/pulizia-poltrone-a-domicilio-sardegna/": { scope: "sardegna" },
    "/pulizia-materassi-a-domicilio-sardegna/": { scope: "sardegna" }
  };

  var config = PAGE_CONFIG[window.location.pathname];
  if (!config) return;

  var CAGLIARI_PREVIEWS = {
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

  var REGIONAL_PREVIEWS = {
    cagliari: ["Servizio disponibile a Cagliari", "Intervento a domicilio disponibile a Cagliari", "Cagliari"],
    mogoro: ["Servizio disponibile a Mogoro", "Intervento a domicilio disponibile a Mogoro", "Mogoro"],
    oristano: ["Servizio disponibile a Oristano", "Intervento a domicilio disponibile a Oristano", "Oristano"],
    olbia: ["Servizio disponibile a Olbia", "Intervento a domicilio disponibile a Olbia", "Olbia"],
    sassari: ["Servizio disponibile a Sassari", "Intervento a domicilio disponibile a Sassari", "Sassari"]
  };

  function defaults() {
    return config.scope === "sardegna"
      ? { barText: "Servizio disponibile in Sardegna", heroText: "Intervento a domicilio in Sardegna", titleText: "in Sardegna" }
      : { barText: "Cagliari e hinterland", heroText: "Servizio a domicilio a Cagliari e hinterland", titleText: "a Cagliari" };
  }

  function injectStyles() {
    if (document.getElementById("ld-geo-styles")) return;
    var style = document.createElement("style");
    style.id = "ld-geo-styles";
    style.textContent = [
      ".hero-geo{display:flex;align-items:center;gap:8px;margin:-9px 0 20px;color:#147dcc;font-size:14px;font-weight:850}",
      ".hero-geo:before{content:'✓';display:grid;place-items:center;flex:0 0 22px;width:22px;height:22px;border-radius:50%;background:#e3f5eb;color:#128f48;font-size:13px}",
      ".regional-proof{padding:92px 0;background:#f7fbff}",
      ".regional-proof-shell{max-width:1120px;margin:0 auto;padding:0 24px}",
      ".regional-proof-head{text-align:center;max-width:760px;margin:0 auto 42px}",
      ".regional-proof-head .eyebrow{margin-bottom:10px}",
      ".regional-proof-head h2{margin:0;color:#071a35;font-size:clamp(34px,4.4vw,58px);line-height:1.02;letter-spacing:-.04em}",
      ".regional-proof-head p{max-width:640px;margin:18px auto 0;color:#52677f;font-size:18px;line-height:1.65}",
      ".regional-proof-stage{position:relative;display:grid;grid-template-columns:minmax(0,1.18fr) minmax(300px,.82fr);gap:24px;padding:28px;border-radius:34px;background:#071a35;overflow:hidden}",
      ".regional-proof-stage:before{content:'';position:absolute;right:-110px;top:-130px;width:360px;height:360px;border-radius:50%;background:rgba(38,141,226,.18)}",
      ".regional-proof-main{position:relative;min-width:0;padding:24px;border-radius:24px;background:#fff}",
      ".regional-proof-person{display:flex;align-items:center;gap:16px;margin-bottom:18px}",
      ".regional-proof-person img{width:76px;height:76px;object-fit:cover;border-radius:50%;border:5px solid #e9f4ff;box-shadow:0 12px 30px rgba(7,26,53,.16)}",
      ".regional-proof-person strong{display:block;color:#071a35;font-size:20px}",
      ".regional-proof-person span{display:block;margin-top:4px;color:#71839a;font-size:14px}",
      ".regional-proof-stars{color:#ffb22e;letter-spacing:3px;font-size:19px}",
      ".regional-proof-art{display:block;width:100%;height:auto;border-radius:18px;border:1px solid #dbe8f4}",
      ".regional-proof-side{position:relative;display:grid;gap:18px;align-content:start}",
      ".regional-proof-fulvio,.regional-proof-quote{border-radius:22px;background:#fff;box-shadow:0 18px 45px rgba(0,0,0,.12)}",
      ".regional-proof-fulvio{padding:18px}",
      ".regional-proof-fulvio img{display:block;width:100%;height:auto;border-radius:14px}",
      ".regional-proof-quote{padding:24px}",
      ".regional-proof-quote .regional-proof-stars{margin-bottom:12px}",
      ".regional-proof-quote p{margin:0;color:#263b53;font-size:16px;line-height:1.65}",
      ".regional-proof-quote cite{display:block;margin-top:16px;color:#071a35;font-style:normal;font-weight:800}",
      ".regional-proof-mini{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:18px}",
      ".regional-proof-mini blockquote{margin:0;padding:22px;border:1px solid #d8e6f3;border-radius:20px;background:#fff}",
      ".regional-proof-mini p{margin:10px 0 0;color:#52677f;line-height:1.55}",
      ".regional-proof-mini cite{display:block;margin-top:14px;color:#071a35;font-style:normal;font-weight:800}",
      "@media(max-width:820px){.regional-proof-stage{grid-template-columns:1fr}.regional-proof-mini{grid-template-columns:1fr}}",
      "@media(max-width:720px){.hero-geo{margin:-6px 0 18px;font-size:13px}.regional-proof{padding:64px 0}.regional-proof-stage{padding:16px;border-radius:24px}.regional-proof-main{padding:18px}.regional-proof-person img{width:64px;height:64px}}"
    ].join("");
    document.head.appendChild(style);
  }

  function enhanceRegionalProof() {
    if (config.proof !== "divani") return;
    var oldSection = document.querySelector(".customer-trust-section");
    if (!oldSection || document.getElementById("regional-proof")) return;

    var section = document.createElement("section");
    section.id = "regional-proof";
    section.className = "regional-proof";
    section.setAttribute("aria-labelledby", "regional-proof-title");
    section.innerHTML = [
      '<div class="regional-proof-shell">',
      '<div class="regional-proof-head">',
      '<p class="eyebrow">Testimonianze reali</p>',
      '<h2 id="regional-proof-title">Quando il risultato si vede, le parole pesano di più.</h2>',
      '<p>Esperienze documentate, persone reali e lavori eseguiti sul campo. Niente promesse da catalogo.</p>',
      '</div>',
      '<div class="regional-proof-stage">',
      '<article class="regional-proof-main">',
      '<div class="regional-proof-person">',
      '<img src="/assets/img/ads-cagliari/ritratto-martap.webp" width="100" height="100" loading="lazy" decoding="async" alt="Ritratto di Marta P.">',
      '<div><div class="regional-proof-stars" aria-label="5 stelle su 5">★★★★★</div><strong>Marta P.</strong><span>Testimonianza cliente</span></div>',
      '</div>',
      '<img class="regional-proof-art" src="/assets/img/ads-cagliari/marta-p-testimonial.webp" width="1024" height="576" loading="lazy" decoding="async" alt="Testimonianza di Marta P. sul servizio di pulizia divani a domicilio">',
      '</article>',
      '<div class="regional-proof-side">',
      '<article class="regional-proof-fulvio"><img src="/assets/img/ads-cagliari/Testimonianza-Fulvio-Mulas.webp" width="563" height="196" loading="lazy" decoding="async" alt="Testimonianza di Fulvio Mulas sul servizio di pulizia divani"></article>',
      '<blockquote class="regional-proof-quote"><div class="regional-proof-stars" aria-label="5 stelle su 5">★★★★★</div><p>Servizio rapido e preciso. Il divano è tornato molto più fresco, smacchiato e senza gli odori che avevamo da mesi.</p><cite>Cliente privato · Cagliari</cite></blockquote>',
      '</div>',
      '</div>',
      '<div class="regional-proof-mini">',
      '<blockquote><div class="regional-proof-stars" aria-label="5 stelle su 5">★★★★★</div><p>Abbiamo fatto pulire divano e poltrone prima dell’arrivo degli ospiti. Appuntamento semplice, lavoro ordinato e tessili igienizzati con cura.</p><cite>Gestore casa vacanza · Cagliari</cite></blockquote>',
      '<blockquote><div class="regional-proof-stars" aria-label="5 stelle su 5">★★★★★</div><p>Valutazione chiara prima dell’intervento, appuntamento concordato senza sorprese e risultato evidente sulle sedute.</p><cite>Cliente privato · Sardegna</cite></blockquote>',
      '</div>',
      '</div>'
    ].join("");
    oldSection.replaceWith(section);
  }

  function createUi() {
    var localBar = document.querySelector(".local-bar");
    var heroLead = document.querySelector(".hero-lead");
    var titleLocation = document.querySelector(".hero-copy h1 span");
    if (!localBar || !heroLead || !titleLocation) return null;

    var initial = defaults();
    var bar = document.getElementById("geo-bar");
    if (!bar) {
      var firstNode = localBar.firstChild;
      if (firstNode && firstNode.nodeType === Node.TEXT_NODE) firstNode.nodeValue = "";
      bar = document.createElement("span");
      bar.id = "geo-bar";
      bar.setAttribute("aria-live", "polite");
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
      heroLead.insertAdjacentElement("afterend", hero);
    }

    bar.textContent = initial.barText;
    hero.textContent = initial.heroText;
    titleLocation.textContent = initial.titleText;
    return { bar: bar, hero: hero, titleLocation: titleLocation };
  }

  function safeText(value, maxLength) {
    return typeof value === "string" && value.trim() && value.trim().length <= maxLength ? value.trim() : null;
  }

  function applyGeo(ui, data) {
    var city = safeText(data && data.city, 60);
    var barText = safeText(data && data.barText, 100);
    var heroText = safeText(data && data.heroText, 120);

    if (config.scope === "sardegna") {
      if (!city) return;
      ui.bar.textContent = barText || "Servizio disponibile a " + city;
      ui.hero.textContent = heroText || "Intervento a domicilio disponibile a " + city;
      ui.titleLocation.textContent = "a " + city;
      return;
    }

    if (barText) ui.bar.textContent = barText;
    if (heroText) ui.hero.textContent = heroText;
    if (city) ui.titleLocation.textContent = "a " + city;
  }

  function previewKey(value) {
    return String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  function previewPayload() {
    var preview = new URLSearchParams(window.location.search).get("geo-preview");
    var collection = config.scope === "sardegna" ? REGIONAL_PREVIEWS : CAGLIARI_PREVIEWS;
    var item = collection[previewKey(preview)];
    return item ? { barText: item[0], heroText: item[1], city: item[2] } : null;
  }

  function init() {
    injectStyles();
    enhanceRegionalProof();
    var ui = createUi();
    if (!ui) return;

    var preview = previewPayload();
    if (preview) {
      applyGeo(ui, preview);
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
      .then(function (data) { applyGeo(ui, data); })
      .catch(function () {})
      .finally(function () { window.clearTimeout(timeout); });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
