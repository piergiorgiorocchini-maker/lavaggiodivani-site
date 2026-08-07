(function () {
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  if (window.location.pathname === '/guides/pulizia-tessuti-delicati-pregio-sardegna/' || window.location.pathname === '/guides/pulizia-tessuti-delicati-pregio-sardegna/index.html') {
    var headerCta = document.querySelector('.site-header .header-call');
    if (headerCta) {
      headerCta.textContent = 'Invia foto';
      headerCta.href = 'https://wa.me/393516550908?text=Ciao%20Piergiorgio%2C%20vorrei%20una%20valutazione%20per%20un%20tessuto%20delicato.%20Posso%20inviarti%20foto%20del%20tessuto%2C%20della%20macchia%20e%20dell%27etichetta%3F';
      headerCta.target = '_blank';
      headerCta.rel = 'noopener';
      headerCta.setAttribute('aria-label', 'Invia foto su WhatsApp per una valutazione');
    }
  }
})();