/* ============================================================
   RAINBOW CAFE — content-store.js
   localStorage version — works in StackBlitz, browsers,
   Cloudflare Pages. No dependencies.

   TO GO PRODUCTION with Supabase: see HANDOVER.md
   Only this file needs changing — nothing else.
   ============================================================ */

const STORAGE_KEY = 'rainbow-cafe-content';

const DEFAULT_CONTENT = {
  hero: {
    headline: 'Good food,<br>made with <em>care</em>,<br>since the 80s.',
    lede: 'A local cafe on South Street, run by Carlos and Jay. Honest breakfasts, hearty dinners, and a proper cup of coffee — in a building with roots back to 1838.',
    image: 'https://rainbowcafelancing.wordpress.com/wp-content/uploads/2020/06/top-wallpapers-1-101-1.jpeg?w=1024',
  },
  specials: {
    enabled: true,
    text: "Homemade leek & potato soup, with crusty bread — £4.75",
  },
  story: {
    image: 'https://rainbowcafelancing.wordpress.com/wp-content/uploads/2020/06/01.png?w=460',
    paragraphs: [
      "Carlos and Jay are dedicated to everyday service in a genuinely welcoming atmosphere. The indoor space, including the rest room area, has been renovated with a fresh new design — but the warmth of the place hasn't changed a bit.",
      "The building itself has a proper history. The first record of this site dates back to around 1838, when it was built as a labourer's house. It was demolished in 1926 and a thatched cottage went up in its place — rebuilt a few more times since, until it became the cafe you'll find today, serving customers since the 1980s.",
      "Mr Green, who was born in this very building back in 1939, came to visit a few years ago and shared his memories with us. He said it was strange — but wonderful — to sit down for a meal in what was once his childhood home, more than half a century after he'd moved away.",
    ],
  },
  menu: {
    categories: [
      {
        name: 'Breakfast', icon: '☀',
        items: [
          { name: 'Full Rainbow Breakfast', desc: 'Eggs, bacon, sausage, beans, toast & grilled tomato', price: '7.95' },
          { name: 'Eggs on Toast', desc: 'Poached, fried or scrambled', price: '4.50' },
          { name: 'Bacon Roll', desc: 'Crispy bacon in a fresh white roll', price: '3.95' },
          { name: 'Porridge', desc: 'With honey or seasonal fruit', price: '3.50' },
        ],
      },
      {
        name: 'Coffee & Drinks', icon: '☕',
        items: [
          { name: 'Flat White', desc: 'Freshly roasted, locally sourced beans', price: '3.20' },
          { name: 'Cappuccino', desc: '', price: '3.20' },
          { name: 'Hot Chocolate', desc: 'Topped with cream on request', price: '3.00' },
          { name: 'Milkshake', desc: 'Vanilla, chocolate or strawberry', price: '3.75' },
        ],
      },
      {
        name: 'Lunch & Dinner', icon: '🍽',
        items: [
          { name: 'Jacket Potato', desc: 'Choice of cheese, beans or tuna mayo', price: '5.50' },
          { name: 'Homemade Soup', desc: "With crusty bread — ask what's on today", price: '4.75' },
          { name: 'Cafe Sandwich', desc: 'A daily changing selection of fillings', price: '5.25' },
          { name: "Ploughman's Lunch", desc: 'Cheese, ham, pickle & fresh bread', price: '6.95' },
        ],
      },
      {
        name: 'Something Sweet', icon: '🍰',
        items: [
          { name: 'Cake of the Day', desc: "Homemade — ask what we've got in", price: '3.25' },
          { name: 'Toasted Teacake', desc: '', price: '2.50' },
          { name: 'Scone, Jam & Cream', desc: '', price: '3.00' },
        ],
      },
    ],
  },
  gallery: {
    images: [
      'https://rainbowcafelancing.wordpress.com/wp-content/uploads/2020/12/1.jpg?w=366',
      'https://rainbowcafelancing.wordpress.com/wp-content/uploads/2020/12/2-1.jpg?w=371',
      'https://rainbowcafelancing.wordpress.com/wp-content/uploads/2020/12/3-1.jpg?w=364',
      'https://rainbowcafelancing.wordpress.com/wp-content/uploads/2020/12/4-1.jpg?w=395',
    ],
  },
  quote: {
    text: 'There is no love sincerer than the love of food.',
    attribution: 'George Bernard Shaw',
  },
  contact: {
    address: '34–36 South Street, Lancing, BN15 8AG',
    phone: '01903 520 080',
    email: 'mail@rainbowcafelancing.co.uk',
  },
  hours: {
    monday:    '7:00am – 3:30pm',
    tuesday:   '7:00am – 3:30pm',
    wednesday: '7:00am – 3:30pm',
    thursday:  '7:00am – 3:30pm',
    friday:    '7:00am – 3:30pm',
    saturday:  '7:00am – 3:30pm',
    sunday:    '8:00am – 3:30pm',
  },
  social: [
    { label: 'Facebook', url: 'https://www.facebook.com/Lancing.Rainbow/' },
  ],
};

/* ============================================================
   PUBLIC API — localStorage version
   ============================================================ */

async function getContent() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return deepMerge(DEFAULT_CONTENT, JSON.parse(saved));
  } catch (e) {
    // localStorage unavailable or corrupt — fall through to defaults
  }
  return JSON.parse(JSON.stringify(DEFAULT_CONTENT));
}

async function setContent(content) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    return true;
  } catch (e) {
    console.error('Failed to save:', e);
    return false;
  }
}

async function resetContent() {
  localStorage.removeItem(STORAGE_KEY);
  return true;
}

function deepMerge(base, override) {
  if (Array.isArray(base)) return override !== undefined ? override : base;
  if (typeof base !== 'object' || base === null) return override !== undefined ? override : base;
  const result = { ...base };
  for (const key in override) {
    if (override[key] !== undefined) {
      if (typeof base[key] === 'object' && base[key] !== null && !Array.isArray(base[key])) {
        result[key] = deepMerge(base[key], override[key]);
      } else {
        result[key] = override[key];
      }
    }
  }
  return result;
}
