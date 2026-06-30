/* ============================================================
   RAINBOW CAFE — render-site.js
   Loads content from the store and renders every editable
   section of the public site. Runs once on page load.
   ============================================================ */

async function renderSite() {
  const content = await getContent();

  renderHero(content.hero);
  renderSpecials(content.specials);
  renderStory(content.story);
  renderMenu(content.menu);
  renderGallery(content.gallery);
  renderQuote(content.quote);
  renderContact(content.contact);
  renderHours(content.hours);
  renderFooter(content.contact, content.social);
  highlightToday(content.hours);
}

function renderHero(hero) {
  if (!hero) return;
  setHTML('heroHeadline', hero.headline);
  setText('heroLede', hero.lede);
  const img = document.getElementById('heroImage');
  if (img && hero.image) img.src = hero.image;
}

function renderSpecials(specials) {
  const banner = document.getElementById('specialsBanner');
  if (!specials || !specials.enabled || !specials.text) {
    banner.style.display = 'none';
    return;
  }
  banner.style.display = 'block';
  setText('specialsText', specials.text);
}

function renderStory(story) {
  if (!story) return;
  const img = document.getElementById('storyImage');
  if (img && story.image) img.src = story.image;

  const body = document.getElementById('storyBody');
  body.innerHTML = (story.paragraphs || []).map(p => `<p>${escHtml(p)}</p>`).join('');
}

function renderMenu(menu) {
  const grid = document.getElementById('menuCategories');
  if (!menu || !menu.categories) return;

  grid.innerHTML = menu.categories.map(cat => `
    <div class="menu-cat">
      <div class="menu-cat-title">
        ${escHtml(cat.name)} <span class="menu-cat-icon">${cat.icon || ''}</span>
      </div>
      ${cat.items.map(item => `
        <div class="menu-item">
          <div>
            <div class="menu-item-name">${escHtml(item.name)}</div>
            ${item.desc ? `<div class="menu-item-desc">${escHtml(item.desc)}</div>` : ''}
          </div>
          <div class="menu-item-price">£${escHtml(item.price)}</div>
        </div>
      `).join('')}
    </div>
  `).join('');
}

function renderGallery(gallery) {
  const grid = document.getElementById('galleryGrid');
  if (!gallery || !gallery.images) return;

  grid.innerHTML = gallery.images.map(src => `
    <div class="gallery-item">
      <img src="${src}" alt="Rainbow Cafe">
    </div>
  `).join('');
}

function renderQuote(quote) {
  if (!quote) return;
  setText('quoteText', `"${quote.text}"`);
  setText('quoteAttr', `— ${quote.attribution}`);
}

function renderContact(contact) {
  if (!contact) return;
  setText('factAddress', shortenAddress(contact.address));
  setText('factPhone', contact.phone);
  setText('contactAddress', contact.address);

  const phoneLink = document.getElementById('contactPhone');
  phoneLink.textContent = contact.phone;
  phoneLink.href = 'tel:' + contact.phone.replace(/\s/g, '');

  const emailLink = document.getElementById('contactEmail');
  emailLink.textContent = contact.email;
  emailLink.href = 'mailto:' + contact.email;

  const navCall = document.getElementById('navCallBtn');
  if (navCall) {
    navCall.textContent = 'Call ' + contact.phone;
    navCall.href = 'tel:' + contact.phone.replace(/\s/g, '');
  }
}

function renderHours(hours) {
  const table = document.getElementById('hoursTable');
  if (!hours) return;

  const days = [
    ['monday', 'Monday'], ['tuesday', 'Tuesday'], ['wednesday', 'Wednesday'],
    ['thursday', 'Thursday'], ['friday', 'Friday'], ['saturday', 'Saturday'], ['sunday', 'Sunday'],
  ];

  table.innerHTML = days.map(([key, label]) => `
    <tr data-day="${key}">
      <td class="hours-day">${label}</td>
      <td class="hours-time">${escHtml(hours[key] || 'Closed')}</td>
    </tr>
  `).join('');
}

function renderFooter(contact, social) {
  if (contact) setText('footerAddress', contact.address);

  const socialEl = document.getElementById('footerSocial');
  if (social && social.length) {
    socialEl.innerHTML = social.map(s =>
      `<a href="${s.url}" target="_blank" rel="noopener">${escHtml(s.label)}</a>`
    ).join('') + `<a href="tel:" id="footerCallLink">Call Us</a><a href="mailto:" id="footerEmailLink">Email Us</a>`;

    if (contact) {
      const callLink = document.getElementById('footerCallLink');
      const emailLink = document.getElementById('footerEmailLink');
      if (callLink) callLink.href = 'tel:' + contact.phone.replace(/\s/g, '');
      if (emailLink) emailLink.href = 'mailto:' + contact.email;
    }
  }
}

function highlightToday(hours) {
  const days = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
  const todayKey = days[new Date().getDay()];
  const row = document.querySelector(`#hoursTable tr[data-day="${todayKey}"]`);
  if (row) {
    row.querySelector('.hours-day').classList.add('hours-today');
    row.querySelector('.hours-time').classList.add('hours-today');
    const todayEl = document.getElementById('todayHours');
    if (todayEl && hours) todayEl.textContent = hours[todayKey] || 'Closed';
  }
}

/* ============================================================
   UTILS
   ============================================================ */
function setText(id, val) {
  const el = document.getElementById(id);
  if (el && val !== undefined) el.textContent = val;
}

function setHTML(id, val) {
  const el = document.getElementById(id);
  if (el && val !== undefined) el.innerHTML = val;
}

function escHtml(str) {
  return (str || '').toString()
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function shortenAddress(full) {
  if (!full) return '';
  return full.split(',')[0];
}

/* ============================================================
   MOBILE NAV
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  renderSite();

  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
  }
});
