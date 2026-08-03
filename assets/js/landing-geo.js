(function () {
  "use strict";

  var PAGE_CONFIG = {
    "/preventivo-pulizia-divani-cagliari/": { scope: "cagliari" },
    "/pulizia-lavaggio-poltrone-a-domicilio-cagliari/": { scope: "cagliari" },
    "/lavaggio-pulizia-materassi-a-domicilio-cagliari/": { scope: "cagliari" },
    "/pulizia-divani-a-domicilio-sardegna/": { scope: "sardegna" },
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
    if (config.scope === "sardegna") {
      return {
        barText: "Servizio disponibile in Sardegna",
        heroText: "Intervento a domicilio in Sardegna",
        titleText: "in Sardegna"
      };
    }

    return {
      barText: "Cagliari e hinterland",
      heroText: "Servizio a domicilio a Cagliari e hinterland",
      titleText: "a Cagliari"
    };
  }

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
    return typeof value === "string" && value.trim() && value.trim().length <= maxLength
      ? value.trim()
      : null;
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
    return String(value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }

  function previewPayload() {
    var preview = new URLSearchParams(window.location.search).get("geo-preview");
    var key = previewKey(preview);
    var collection = config.scope === "sardegna" ? REGIONAL_PREVIEWS : CAGLIARI_PREVIEWS;
    var item = collection[key];

    if (!item) return null;
    return { barText: item[0], heroText: item[1], city: item[2] };
  }

  function init() {
    injectStyles();
    var ui = createUi();
    if (!ui) return;

    var preview = previewPayload();
    if (preview) {
      applyGeo(ui, preview);
      return;
    }

    var controller = typeof AbortController === "function" ? new AbortController() : null;
    var timeout = window.setTimeout(function () {
      if (controller) controller.abort();
    }, 1800);

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
      .then(function (data) {
        applyGeo(ui, data);
      })
      .catch(function () {})
      .finally(function () {
        window.clearTimeout(timeout);
      });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
