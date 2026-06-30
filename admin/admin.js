/* ============================================================
   RAINBOW CAFE — admin.js
   Builds all editable forms, tracks changes in memory,
   saves everything back through content-store.js on demand.
   ============================================================ */

const ADMIN_PASSWORD = "rainbow2026"; // Change this before handing over

let workingContent = null; // in-memory draft, only saved on button press
let openSections = new Set();

/* ============================================================
   AUTH
   ============================================================ */
function attemptLogin() {
  const val = document.getElementById('loginInput').value;
  if (val === ADMIN_PASSWORD) {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('adminApp').style.display = 'block';
    initAdmin();
  } else {
    const input = document.getElementById('loginInput');
    input.classList.add('error');
    input.value = '';
    setTimeout(() => input.classList.remove('error'), 500);
  }
}

/* ============================================================
   INIT — load content, render every section's form
   ============================================================ */
async function initAdmin() {
  workingContent = await getContent();
  renderMenuEditor();
  renderSpecialsEditor();
  renderHoursEditor();
  renderPhotosEditor();
  renderQuoteEditor();
  renderContactEditor();
  renderStoryEditor();
  renderSocialEditor();
}

/* ============================================================
   ACCORDION
   ============================================================ */
function toggleSection(name) {
  const el = document.getElementById('section-' + name);
  el.classList.toggle('open');
}

/* ============================================================
   1. MENU EDITOR
   ============================================================ */
function renderMenuEditor() {
  const el = document.getElementById('content-menu');
  const cats = workingContent.menu.categories;

  el.innerHTML = cats.map((cat, ci) => `
    <div class="menu-cat-block">
      <div class="menu-cat-block-header">
        <input class="field-input menu-cat-icon-input" value="${escAttr(cat.icon)}"
          oninput="updateMenuCat(${ci}, 'icon', this.value)" placeholder="🍽️">
        <input class="field-input menu-cat-name-input" value="${escAttr(cat.name)}"
          oninput="updateMenuCat(${ci}, 'name', this.value)" placeholder="Category name">
        <button class="remove-cat-btn" onclick="removeMenuCat(${ci})">Remove category</button>
      </div>

      ${cat.items.map((item, ii) => `
        <div class="menu-item-row">
          <div class="menu-item-fields">
            <input class="field-input" value="${escAttr(item.name)}"
              oninput="updateMenuItem(${ci},${ii},'name',this.value)" placeholder="Item name">
            <input class="field-input" value="${escAttr(item.desc)}"
              oninput="updateMenuItem(${ci},${ii},'desc',this.value)" placeholder="Short description (optional)">
          </div>
          <input class="field-input" value="${escAttr(item.price)}"
            oninput="updateMenuItem(${ci},${ii},'price',this.value)" placeholder="0.00">
          <button class="icon-btn" onclick="removeMenuItem(${ci},${ii})" title="Remove item">✕</button>
        </div>
      `).join('')}

      <button class="icon-btn add-btn" onclick="addMenuItem(${ci})">+ Add Item to ${escAttr(cat.name)}</button>
    </div>
  `).join('') + `
    <button class="icon-btn add-btn" style="margin-top:16px;" onclick="addMenuCat()">+ Add a New Menu Category</button>
  `;
}

function updateMenuCat(ci, field, val) { workingContent.menu.categories[ci][field] = val; }
function updateMenuItem(ci, ii, field, val) { workingContent.menu.categories[ci].items[ii][field] = val; }

function addMenuItem(ci) {
  workingContent.menu.categories[ci].items.push({ name: '', desc: '', price: '' });
  renderMenuEditor();
}
function removeMenuItem(ci, ii) {
  workingContent.menu.categories[ci].items.splice(ii, 1);
  renderMenuEditor();
}
function addMenuCat() {
  workingContent.menu.categories.push({ name: 'New Category', icon: '🍴', items: [] });
  renderMenuEditor();
}
function removeMenuCat(ci) {
  if (!confirm('Remove this whole category and its items?')) return;
  workingContent.menu.categories.splice(ci, 1);
  renderMenuEditor();
}

/* ============================================================
   2. SPECIALS EDITOR
   ============================================================ */
function renderSpecialsEditor() {
  const el = document.getElementById('content-specials');
  const s = workingContent.specials;

  el.innerHTML = `
    <div class="field" style="margin-top:14px;">
      <label class="field-label">
        <input type="checkbox" id="specialsEnabled" ${s.enabled ? 'checked' : ''}
          onchange="workingContent.specials.enabled = this.checked">
        Show a special on the website
      </label>
    </div>
    <div class="field">
      <label class="field-label">What's the special?</label>
      <input class="field-input" value="${escAttr(s.text)}"
        oninput="workingContent.specials.text = this.value"
        placeholder="e.g. Homemade soup of the day — £4.75">
      <div class="field-hint">Keep it short — this shows in a banner across the top of the site.</div>
    </div>
  `;
}

/* ============================================================
   3. HOURS EDITOR
   ============================================================ */
function renderHoursEditor() {
  const el = document.getElementById('content-hours');
  const h = workingContent.hours;
  const days = [
    ['monday','Monday'],['tuesday','Tuesday'],['wednesday','Wednesday'],
    ['thursday','Thursday'],['friday','Friday'],['saturday','Saturday'],['sunday','Sunday'],
  ];

  el.innerHTML = `
    <div class="hours-grid">
      ${days.map(([key,label]) => `
        <div class="hours-row">
          <div class="hours-day-label">${label}</div>
          <input class="field-input" value="${escAttr(h[key])}"
            oninput="workingContent.hours['${key}'] = this.value"
            placeholder="e.g. 7:00am – 3:30pm, or Closed">
        </div>
      `).join('')}
    </div>
    <div class="field-hint" style="margin-top:10px;">Type "Closed" for any day you're not open.</div>
  `;
}

/* ============================================================
   4. PHOTOS EDITOR
   ============================================================ */
function renderPhotosEditor() {
  const el = document.getElementById('content-photos');
  const hero = workingContent.hero;
  const story = workingContent.story;
  const gallery = workingContent.gallery;

  el.innerHTML = `
    <div class="field" style="margin-top:14px;">
      <label class="field-label">Main Photo (top of homepage)</label>
      <div class="photo-grid" style="grid-template-columns: 140px;">
        <div class="photo-thumb">
          <img src="${escAttr(hero.image)}" alt="">
        </div>
      </div>
      <input class="field-input" style="margin-top:8px;" value="${escAttr(hero.image)}"
        oninput="workingContent.hero.image = this.value; refreshPhotoPreview()" placeholder="Paste an image link here">
      <div class="field-hint">Paste a link to a photo. The easiest way: upload your photo to <a href="https://imgur.com/upload" target="_blank" style="color:var(--terracotta)">imgur.com/upload</a> first, then copy the link it gives you.</div>
    </div>

    <div class="field">
      <label class="field-label">Your Photo (Carlos &amp; Jay, shown in "Our Story")</label>
      <div class="photo-grid" style="grid-template-columns: 140px;">
        <div class="photo-thumb">
          <img src="${escAttr(story.image)}" alt="">
        </div>
      </div>
      <input class="field-input" style="margin-top:8px;" value="${escAttr(story.image)}"
        oninput="workingContent.story.image = this.value; refreshPhotoPreview()" placeholder="Paste an image link here">
    </div>

    <div class="field">
      <label class="field-label">Gallery Photos</label>
      <div class="photo-grid" id="galleryPhotoGrid">
        ${gallery.images.map((src, i) => `
          <div class="photo-thumb">
            <img src="${escAttr(src)}" alt="">
            <button class="icon-btn" onclick="removeGalleryPhoto(${i})" title="Remove">✕</button>
          </div>
        `).join('')}
        <div class="add-photo-box" onclick="addGalleryPhoto()">
          <span style="font-size:24px;">+</span>
          <span>Add Photo</span>
        </div>
      </div>
      <div class="field-hint">Click "Add Photo" and paste an image link when asked.</div>
    </div>
  `;
}

function refreshPhotoPreview() { /* live preview updates automatically via value binding on next render */ }

function addGalleryPhoto() {
  const url = prompt('Paste the image link here:');
  if (url && url.trim()) {
    workingContent.gallery.images.push(url.trim());
    renderPhotosEditor();
  }
}

function removeGalleryPhoto(i) {
  workingContent.gallery.images.splice(i, 1);
  renderPhotosEditor();
}

/* ============================================================
   5. QUOTE EDITOR
   ============================================================ */
function renderQuoteEditor() {
  const el = document.getElementById('content-quote');
  const q = workingContent.quote;

  el.innerHTML = `
    <div class="field" style="margin-top:14px;">
      <label class="field-label">Quote</label>
      <textarea class="field-textarea" oninput="workingContent.quote.text = this.value"
        placeholder="e.g. There is no love sincerer than the love of food.">${escHtml(q.text)}</textarea>
    </div>
    <div class="field">
      <label class="field-label">Who said it?</label>
      <input class="field-input" value="${escAttr(q.attribution)}"
        oninput="workingContent.quote.attribution = this.value" placeholder="e.g. George Bernard Shaw">
    </div>
  `;
}

/* ============================================================
   6. CONTACT EDITOR
   ============================================================ */
function renderContactEditor() {
  const el = document.getElementById('content-contact');
  const c = workingContent.contact;

  el.innerHTML = `
    <div class="field" style="margin-top:14px;">
      <label class="field-label">Address</label>
      <input class="field-input" value="${escAttr(c.address)}"
        oninput="workingContent.contact.address = this.value">
    </div>
    <div class="field">
      <label class="field-label">Phone Number</label>
      <input class="field-input" value="${escAttr(c.phone)}"
        oninput="workingContent.contact.phone = this.value">
    </div>
    <div class="field">
      <label class="field-label">Email Address</label>
      <input class="field-input" value="${escAttr(c.email)}"
        oninput="workingContent.contact.email = this.value">
    </div>
  `;
}

/* ============================================================
   7. STORY EDITOR
   ============================================================ */
function renderStoryEditor() {
  const el = document.getElementById('content-story');
  const paras = workingContent.story.paragraphs;

  el.innerHTML = paras.map((p, i) => `
    <div class="story-para-block">
      <div class="story-para-header">
        <label class="field-label" style="margin:0;">Paragraph ${i+1}</label>
        <button class="remove-cat-btn" onclick="removeStoryPara(${i})">Remove</button>
      </div>
      <textarea class="field-textarea" oninput="updateStoryPara(${i}, this.value)">${escHtml(p)}</textarea>
    </div>
  `).join('') + `
    <button class="icon-btn add-btn" style="margin-top:14px;" onclick="addStoryPara()">+ Add Another Paragraph</button>
  `;
}

function updateStoryPara(i, val) { workingContent.story.paragraphs[i] = val; }
function addStoryPara() {
  workingContent.story.paragraphs.push('');
  renderStoryEditor();
}
function removeStoryPara(i) {
  workingContent.story.paragraphs.splice(i, 1);
  renderStoryEditor();
}

/* ============================================================
   8. SOCIAL EDITOR
   ============================================================ */
function renderSocialEditor() {
  const el = document.getElementById('content-social');
  const social = workingContent.social;

  el.innerHTML = social.map((s, i) => `
    <div class="menu-item-row" style="grid-template-columns:1fr 32px;">
      <div class="menu-item-fields">
        <input class="field-input" value="${escAttr(s.label)}"
          oninput="updateSocial(${i},'label',this.value)" placeholder="e.g. Facebook">
        <input class="field-input" value="${escAttr(s.url)}"
          oninput="updateSocial(${i},'url',this.value)" placeholder="https://...">
      </div>
      <button class="icon-btn" onclick="removeSocial(${i})">✕</button>
    </div>
  `).join('') + `
    <button class="icon-btn add-btn" style="margin-top:14px;" onclick="addSocial()">+ Add a Link</button>
  `;
}

function updateSocial(i, field, val) { workingContent.social[i][field] = val; }
function addSocial() {
  workingContent.social.push({ label: '', url: '' });
  renderSocialEditor();
}
function removeSocial(i) {
  workingContent.social.splice(i, 1);
  renderSocialEditor();
}

/* ============================================================
   SAVE / DISCARD
   ============================================================ */
async function saveChanges() {
  const status = document.getElementById('saveStatus');
  status.className = 'save-status saving';
  status.textContent = 'Saving...';

  const ok = await setContent(workingContent);

  if (ok) {
    status.className = 'save-status saved';
    status.textContent = '✓ Saved — your website is now updated';
  } else {
    status.className = 'save-status error';
    status.textContent = '⚠ Something went wrong — please try again';
  }

  setTimeout(() => { status.className = 'save-status'; }, 4000);
}

async function discardChanges() {
  if (!confirm('Discard all unsaved changes and reload?')) return;
  workingContent = await getContent();
  renderMenuEditor();
  renderSpecialsEditor();
  renderHoursEditor();
  renderPhotosEditor();
  renderQuoteEditor();
  renderContactEditor();
  renderStoryEditor();
  renderSocialEditor();
}

/* ============================================================
   UTILS
   ============================================================ */
function escAttr(str) {
  return (str || '').toString()
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function escHtml(str) {
  return (str || '').toString()
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('loginInput').focus();
});
