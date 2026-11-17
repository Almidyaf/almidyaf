(function () {
  const SUPPORTED_LANGS = ['ar', 'id', 'en'];
  const STORAGE_KEY = 'almedyaf_lang';
  const MAIN_WHATSAPP = '966503114393';

  function detectDeviceLanguage() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && SUPPORTED_LANGS.includes(saved)) {
      return saved;
    }

    const candidates = Array.isArray(navigator.languages) && navigator.languages.length
      ? navigator.languages
      : [navigator.language || 'ar'];

    for (const raw of candidates) {
      const code = String(raw).toLowerCase().split('-')[0];
      if (code === 'ar') return 'ar';
      if (code === 'id' || code === 'in') return 'id';
      if (code === 'en') return 'en';
    }
    return 'ar';
  }

  function getNested(obj, path) {
    return path.split('.').reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : null), obj);
  }

  function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(showToast._timer);
    showToast._timer = setTimeout(() => toast.classList.remove('show'), 2200);
  }

  function copyText(value, copiedMsg) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(value).then(() => showToast(copiedMsg));
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = value;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      showToast(copiedMsg);
    }
  }

  function renderProducts(t) {
    const grid = document.getElementById('products-grid');
    if (!grid) return;

    const imageMap = {
      'natural-oud': 'assets/product-natural-oud.jpg',
      'improved-oud': 'assets/product-improved-oud.jpg',
      'oud-oil': 'assets/product-oud-oil.jpg',
      'bakhoor': 'assets/product-bakhoor.svg'
    };

    grid.innerHTML = t.products.items.map(item => {
      const waUrl = `https://wa.me/${MAIN_WHATSAPP}?text=${encodeURIComponent(item.waText)}`;
      const imgSrc = imageMap[item.id] || 'assets/logo.png';
      return `
        <article class="product-card">
          <div class="product-img-wrap">
            <img src="${imgSrc}" alt="${item.title}" loading="lazy">
          </div>
          <div class="product-body">
            <h3>${item.title}</h3>
            <p>${item.desc}</p>
            <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline-dark btn-sm">
              ${t.products.inquireBtn}
            </a>
          </div>
        </article>
      `;
    }).join('');
  }

  function renderDivisions(t) {
    const grid = document.getElementById('divisions-grid');
    if (!grid) return;
    grid.innerHTML = t.divisions.items.map(item => `
      <article class="division-card">
        <span class="division-num">${item.num}</span>
        <h3>${item.title}</h3>
        <p>${item.desc}</p>
        ${item.ctaUrl ? `<a href="${item.ctaUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm division-cta">${item.ctaText}</a>` : ''}
      </article>
    `).join('');
  }

  function renderBranches(t) {
    const grid = document.getElementById('branches-grid');
    if (!grid) return;
    grid.innerHTML = t.branches.items.map(branch => {
      const cleanPhone = branch.phone.replace(/[^0-9+]/g, '');
      const waDigits = cleanPhone.replace(/^\+/, '');
      const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.address)}`;
      return `
        <article class="branch-card">
          <span class="branch-badge">${branch.badge}</span>
          <h3>${branch.title}</h3>
          <p class="branch-address">${branch.address}</p>
          <div class="branch-phone">${branch.phoneType}: <span dir="ltr">${branch.phone}</span></div>
          <div class="branch-actions">
            <a href="https://wa.me/${waDigits}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
              ${t.branches.callBtn}
            </a>
            <a href="${mapUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline-dark btn-sm">
              ${t.branches.mapBtn}
            </a>
          </div>
        </article>
      `;
    }).join('');
  }

  function applyLanguage(lang, persist = false) {
    if (!SUPPORTED_LANGS.includes(lang)) lang = 'ar';
    if (persist) localStorage.setItem(STORAGE_KEY, lang);

    const t = translations[lang];
    const html = document.documentElement;
    html.lang = lang;
    html.dir = lang === 'ar' ? 'rtl' : 'ltr';

    document.title = t.pageTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', t.metaDesc);

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = getNested(t, key);
      if (val !== null) el.textContent = val;
    });

    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });

    renderProducts(t);
    renderDivisions(t);
    renderBranches(t);
  }

  document.addEventListener('DOMContentLoaded', () => {
    const initialLang = detectDeviceLanguage();
    applyLanguage(initialLang, false);

    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        applyLanguage(btn.getAttribute('data-lang'), true);
      });
    });

    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');
    if (mobileToggle && navLinks) {
      mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
      });
      navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => navLinks.classList.remove('open'));
      });
    }
  });
})();
