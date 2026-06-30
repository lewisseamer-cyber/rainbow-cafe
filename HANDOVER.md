# Rainbow Cafe — Site + Admin Panel
## How this works, and how to deploy it for real

---

## What you're looking at

```
rainbow-cafe-v2/
├── index.html              ← The public website
├── js/
│   ├── content-store.js    ← THE IMPORTANT FILE — see below
│   └── render-site.js      ← Paints the public site from saved content
└── admin/
    ├── index.html          ← The admin panel (password protected)
    └── admin.js            ← Builds all 8 editable forms, handles Save
```

The public site never has hardcoded menu items, photos, or hours.
Everything is pulled from `content-store.js` at load time. The admin
panel edits that same data and saves it back. This is why editing
the menu in the admin panel instantly updates the live site.

---

## The one thing that matters: where the data lives

Right now, this demo uses `window.storage` — a simple key/value
store available inside this Claude environment. It works perfectly
for demoing and testing, but **it will not work once this is
deployed to a real domain like rainbowcafelancing.co.uk**, because
that storage only exists inside this sandbox.

For the real, live version, swap in a free database. The whole
project is built so this is a **5-minute change in ONE file**
(`js/content-store.js`) — nothing else needs to change.

### Recommended: Supabase (free tier)

1. Go to supabase.com → create a free account → create a new project
2. In the SQL editor, run:

```sql
create table site_content (
  key text primary key,
  value jsonb
);

insert into site_content (key, value) values ('rainbow-cafe-content', '{}');

alter table site_content enable row level security;

create policy "Public read access"
  on site_content for select
  using (true);

create policy "Public write access"
  on site_content for update
  using (true);
```

3. In Supabase → Project Settings → API, copy your **Project URL**
   and **anon public key**

4. In `js/content-store.js`, replace the `getContent` and
   `setContent` functions with:

```javascript
const SUPABASE_URL = 'YOUR_PROJECT_URL';
const SUPABASE_KEY = 'YOUR_ANON_KEY';

async function getContent() {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/site_content?key=eq.${STORAGE_KEY}&select=value`,
    { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }
  );
  const rows = await res.json();
  if (rows[0]) return deepMerge(DEFAULT_CONTENT, rows[0].value);
  return JSON.parse(JSON.stringify(DEFAULT_CONTENT));
}

async function setContent(content) {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/site_content?key=eq.${STORAGE_KEY}`,
    {
      method: 'PATCH',
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({ value: content }),
    }
  );
  return res.ok;
}
```

That's the entire migration. The admin panel, the public site,
and all 8 editable sections need zero changes — they just call
`getContent()` and `setContent()`, same as before.

**Cost: £0.** Supabase's free tier covers far more traffic and
data than a small café site will ever produce.

---

## Before handing over to the client

- [ ] Change `ADMIN_PASSWORD` in `admin/admin.js` to something
      they'll remember (their cafe name + a number is fine —
      this isn't a banking app, just enough to keep randoms out)
- [ ] Complete the Supabase swap above so content survives
      across devices and after you're no longer involved
- [ ] Replace the placeholder menu items with their real menu
      and prices
- [ ] Replace the WordPress-hosted photo URLs with photos they
      own outright (or confirm they're happy reusing their own
      existing images)
- [ ] Test the admin panel yourself end to end: add a menu item,
      change a price, swap a photo, save, refresh the public site,
      confirm it shows up
- [ ] Walk them through it once on a call or in person — even a
      simple system benefits from five minutes of "here's where
      you click"

---

## What to tell the client in plain English

"Your website has its own private editing page. Go to
**rainbowcafelancing.co.uk/admin**, type in your password, and
you'll see your menu, photos, hours and everything else laid out
in simple boxes. Change whatever you like, hit **Save Changes**,
and your website updates immediately — no calling anyone, no
waiting."
