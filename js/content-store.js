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
    image: 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAF_U_WG5jZJ5sldNBBRaULdMpWHsdHh251NXGbSuNS3emp636I-5YvuYg9SohErSOqveafd8O-k-vLm-xJYJmZLEPrTkZ3j6MZ6zxlGVzMoDqsMxJ4bcaXjfmZkotwwq6s1PX3Q=s680-w680-h510-rw',
  },
  specials: {
    enabled: false,
    text: '',
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
        name: 'Breakfast',
        icon: '🍳',
        items: [
          { name: 'Small Breakfast', desc: '1 egg, 1 rasher, 1 sausage, 1 bread, beans, toast', price: '4.50' },
          { name: 'Medium Breakfast', desc: '2 eggs, 2 rashers, 2 sausages, bread, beans, toast', price: '5.50' },
          { name: 'Vegetarian Breakfast', desc: '2 eggs, 1 vegetarian sausage, mushrooms, beans, bread & toast', price: '6.00' },
          { name: 'Large Breakfast', desc: '2 eggs, 3 rashers, 3 sausages, bread, beans, mushrooms, toast', price: '7.50' },
          { name: 'Belly Buster Breakfast', desc: '2 eggs, 3 bacon, 3 sausages, mushrooms, bread, beans, hash, toast', price: '8.50' },
          { name: 'Fried Egg', desc: 'On toast', price: '2.50' },
          { name: 'Poached Egg', desc: 'On toast', price: '2.00' },
          { name: 'Scrambled Egg', desc: 'On toast', price: '2.50' },
        ],
      },
      {
        name: 'Omelettes',
        icon: '🥚',
        items: [
          { name: 'Plain Omelette', desc: 'All served with peas or beans', price: '5.00' },
          { name: 'Cheese Omelette', desc: '', price: '6.50' },
          { name: 'Mushroom Omelette', desc: '', price: '6.50' },
          { name: 'Ham & Cheese Omelette', desc: '', price: '7.00' },
          { name: 'Spanish Omelette', desc: '', price: '7.50' },
        ],
      },
      {
        name: 'Salads',
        icon: '🥗',
        items: [
          { name: 'Cheese', desc: '', price: '5.90' },
          { name: 'Ham', desc: '', price: '5.90' },
          { name: 'Tuna Mayo', desc: '', price: '5.90' },
          { name: 'Chicken Mayo', desc: '', price: '5.90' },
          { name: 'Prawn Cocktail', desc: '', price: '6.90' },
          { name: 'Chicken Mayo & Bacon', desc: '', price: '6.50' },
        ],
      },
      {
        name: 'Jacket Potato',
        icon: '🥔',
        items: [
          { name: 'Cheese', desc: '', price: '5.00' },
          { name: 'Beans', desc: '', price: '5.00' },
          { name: 'Tuna Mayo', desc: '', price: '6.00' },
          { name: 'Tuna & Beans', desc: '', price: '6.00' },
          { name: 'Coronation Chicken', desc: '', price: '6.50' },
          { name: 'Chicken Mayo & Bacon', desc: '', price: '6.50' },
          { name: 'Tuna Mayo & Cheese', desc: '', price: '6.50' },
          { name: 'Prawn Cocktail', desc: '', price: '7.00' },
        ],
      },
      {
        name: 'Sandwiches & Baguettes',
        icon: '🥖',
        items: [
          { name: 'Sandwich — 1 Filling', desc: 'Egg, bacon, sausage, ham, cheese, tomato, lettuce, onions', price: '3.00' },
          { name: 'Sandwich — 2 Fillings', desc: '', price: '3.50' },
          { name: 'Sandwich — 3 Fillings', desc: '', price: '4.00' },
          { name: 'Baguette — 1 Filling', desc: '', price: '3.50' },
          { name: 'Baguette — 2 Fillings', desc: '', price: '4.00' },
          { name: 'Baguette — 3 Fillings', desc: '', price: '4.50' },
          { name: 'Cheese (Cold)', desc: '', price: '3.00' },
          { name: 'Tuna Mayo (Cold)', desc: '', price: '4.00' },
          { name: 'Ham Salad (Cold)', desc: '', price: '3.50' },
          { name: 'Coronation Chicken (Cold)', desc: '', price: '4.50' },
          { name: 'Chicken Mayo & Bacon (Cold)', desc: '', price: '4.50' },
          { name: 'Chicken Mayo & Salad (Cold)', desc: '', price: '4.50' },
        ],
      },
      {
        name: 'Snacks',
        icon: '🍟',
        items: [
          { name: 'Cheesy Chips', desc: '', price: '3.00' },
          { name: 'Cheeseburger', desc: 'With lettuce', price: '4.00' },
          { name: 'Cheeseburger & Chips', desc: '', price: '5.50' },
          { name: 'Bacon Cheeseburger & Chips', desc: '', price: '6.50' },
          { name: 'Chicken Burger & Chips', desc: '', price: '5.50' },
          { name: 'Vegetarian Burger & Chips', desc: '', price: '5.50' },
          { name: '2 Eggs with Chips & Beans', desc: '', price: '4.50' },
          { name: '2 Sausages with Chips & Beans', desc: '', price: '4.50' },
          { name: 'Corned Beef, Egg & Chips', desc: '', price: '4.50' },
          { name: 'Ham, 2 Eggs, Chips & Beans', desc: '', price: '6.50' },
        ],
      },
      {
        name: 'Dinner',
        icon: '🍽',
        items: [
          { name: 'Roast Chicken / Beef / Pork', desc: 'Served with roast potatoes, gravy & 3 vegetables', price: '7.90' },
          { name: 'Steak & Kidney Pie', desc: 'Served with mashed potatoes, gravy & 3 vegetables', price: '7.90' },
          { name: 'Chicken & Mushroom Pie', desc: 'Served with mashed potatoes, gravy & 3 vegetables', price: '7.90' },
          { name: 'Cottage Pie', desc: 'Served with 3 vegetables & gravy', price: '7.90' },
          { name: 'Sausage & Mash', desc: 'Served with 2 sausages & 3 vegetables', price: '7.90' },
          { name: 'Chilli Con Carne', desc: 'Served with rice, chips & garnish', price: '7.90' },
          { name: 'Chicken Curry', desc: '', price: '7.90' },
          { name: 'Beef Lasagne', desc: 'Served with chips & garnish & plain papadum', price: '7.90' },
          { name: 'Liver & Bacon', desc: 'Served with mashed potatoes, gravy & 3 vegetables', price: '7.90' },
          { name: 'Cod / Plaice / Scampi', desc: 'Served with chips & peas', price: '7.50' },
        ],
      },
      {
        name: 'Kids Meal',
        icon: '👦',
        items: [
          { name: '1 Sausage', desc: 'All served with chips & beans', price: '4.00' },
          { name: '2 Hash Browns', desc: 'All served with chips & beans', price: '4.00' },
          { name: 'Fish Finger', desc: 'All served with chips & beans', price: '4.00' },
          { name: 'Chicken Nuggets', desc: 'All served with chips & beans', price: '4.00' },
        ],
      },
      {
        name: 'Sweets',
        icon: '🍰',
        items: [
          { name: 'Kit Kat / Flapjack', desc: '', price: '1.00' },
          { name: 'Muffin', desc: '', price: '1.50' },
          { name: 'Muffin with Custard', desc: '', price: '3.00' },
          { name: 'Apple Pie with Custard', desc: '', price: '3.00' },
          { name: 'Apple Pie with Ice Cream', desc: '', price: '3.00' },
          { name: 'Ice Cream Sundae', desc: '', price: '3.00' },
        ],
      },
      {
        name: 'Beverages',
        icon: '☕',
        items: [
          { name: 'Breakfast Tea', desc: '', price: '1.50' },
          { name: 'Decaf / Herbal / Fruit Tea', desc: '', price: '1.80' },
          { name: 'Coffee White / Black', desc: '', price: '1.50' },
          { name: 'Mocha Latte', desc: '', price: '2.50' },
          { name: 'Mocha Latte & Cream', desc: '', price: '3.00' },
          { name: 'Hot Chocolate', desc: '', price: '2.50' },
          { name: 'Hot Chocolate & Cream', desc: '', price: '3.00' },
          { name: 'Iced Coffee', desc: '', price: '3.00' },
          { name: 'Espresso', desc: '', price: '2.00' },
          { name: 'Cappuccino', desc: '', price: '2.50' },
          { name: 'Flat White', desc: '', price: '2.50' },
          { name: 'Latte', desc: '', price: '2.50' },
          { name: 'Still Water', desc: '', price: '1.00' },
          { name: 'Canned Soft Drink', desc: '', price: '1.00' },
          { name: 'Fruit Shoot', desc: '', price: '1.00' },
          { name: 'Ribena', desc: '', price: '1.50' },
          { name: 'Yazoo', desc: '', price: '1.50' },
          { name: 'Milk', desc: '', price: '1.00' },
          { name: 'Orange Juice', desc: 'Small / Large', price: '2.00 / 2.50' },
          { name: 'Apple Juice', desc: 'Small / Large', price: '2.00 / 2.50' },
          { name: 'Milkshake', desc: '', price: '3.50 / 4.00' },
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
  gallery: {
    images: [
      'https://rainbowcafelancing.wordpress.com/wp-content/uploads/2020/12/1.jpg?w=366',
      'https://rainbowcafelancing.wordpress.com/wp-content/uploads/2020/12/2-1.jpg?w=371',
      'https://rainbowcafelancing.wordpress.com/wp-content/uploads/2020/12/3-1.jpg?w=364',
      'https://rainbowcafelancing.wordpress.com/wp-content/uploads/2020/12/4-1.jpg?w=395',
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/81/5c/75/front-view.jpg?w=900&h=500&s=1',
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/5e/0a/88/rainbow-cafe-lancing.jpg?w=1200&h=-1&s=1',
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/5e/0a/24/bacon-sandwich-and-a.jpg?w=1200&h=-1&s=1',
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/fe/c0/63/apple-pie.jpg?w=1100&h=1100&s=1',
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/bd/70/b0/coffee.jpg?w=1100&h=1100&s=1',
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/81/5c/77/outside-sitting.jpg?w=500&h=300&s=1',
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/23/3c/68/caption.jpg?w=1100&h=1100&s=1',
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/23/3c/69/caption.jpg?w=1100&h=1100&s=1',
    ],
  },
  reviews: {
    enabled: true,
    summary: {
      google: { rating: '4.4', count: '400+', url: 'https://g.co/kgs/rainbow-cafe-lancing' },
      tripadvisor: { rating: '4.3', count: '36', url: 'https://www.tripadvisor.com/Restaurant_Review-g504224-d7809345-Reviews-Rainbow_Cafe-Lancing_West_Sussex_England.html' },
    },
    featured: [
      {
        author: 'Kelly H',
        source: 'Tripadvisor',
        rating: 5,
        date: 'February 2023',
        text: 'Want the absolute BEST breakfasts in Sussex? Come to the Rainbow Cafe. Large portions, nice fresh, well-cooked food and not too expensive! Been coming here for years and can 100% recommend to everyone.',
      },
      {
        author: 'Ben S',
        source: 'Tripadvisor',
        rating: 5,
        date: 'January 2025',
        text: 'The service was excellent — coffee first, then minutes later the breakfast! Mine was very filling and tasty. All in all a great visit and the food was great value. Will return!',
      },
      {
        author: 'Andy Y',
        source: 'Tripadvisor',
        rating: 5,
        date: 'October 2021',
        text: 'We eat here at least twice a month — without doubt our favourite cafe. Food is always spot on and served speedily and hot. It can get very busy in the mornings but has plenty of tables inside and out.',
      },
      {
        author: 'Michael G',
        source: 'Tripadvisor',
        rating: 5,
        date: 'May 2023',
        text: 'The breakfast came hot and very quickly, the portion sizes were excellent and very tasty. I have used the Rainbow Cafe many times and as I was in the area, I decided to pop in. Never disappointed.',
      },
      {
        author: 'Google Review',
        source: 'Google',
        rating: 5,
        date: 'Recent',
        text: 'Lovely staff who are always friendly and welcoming. Lots of items on the menu to choose from, hot and cold choices. Very reasonably priced.',
      },
      {
        author: 'Google Review',
        source: 'Google',
        rating: 5,
        date: 'Recent',
        text: 'Unreal. Been here a few times now. The baguettes are amazing and the cooked breakfasts even better. Staff are very friendly.',
      },
    ],
  },
  partners: {
    enabled: false,
    title: 'Local businesses we love',
    desc: 'Supporting the Lancing community — businesses we know and recommend.',
    items: [],
  },
};

async function getContent() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return deepMerge(DEFAULT_CONTENT, JSON.parse(saved));
  } catch (e) {}
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

/* NOTE: DEFAULT_CONTENT above has been extended with gallery and reviews below.
   Run this snippet once in browser console to reset if needed: localStorage.clear() */
