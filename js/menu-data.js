/**
 * Kerio Dreams Restaurant Menu Data
 * Authentic Kenyan dishes with sample prototype pricing for client review.
 */
const MENU_ITEMS = [
  {
    id: "dish-01",
    name: "Charcoal-Grilled Goat Ribs (Mbuzi Choma)",
    category: "From the Jiko",
    description: "Succulent goat meat slowly roasted over red-hot charcoal embers, seasoned simply with sea salt to let natural juices shine. Served with fresh kachumbari and golden chips.",
    price: 1200,
    unit: "1 kg platter",
    image: "/assets/images/nyama-choma.jpg",
    featured: true,
    available: true,
    dietary: ["Halal", "Gluten-Free"],
    samplePrice: true
  },
  {
    id: "dish-02",
    name: "Kerio Signature Kuku with Mukimo",
    category: "Grill & Fry",
    description: "Tender kuku kienyeji chicken pan-simmered with ripe tomatoes, sweet onions, and garden herbs, accompanied by traditional green mashed mukimo (potatoes, maize, and pumpkin leaves) and kachumbari.",
    price: 1100,
    unit: "Full portion",
    image: "/assets/images/signature-chicken-mukimo.jpg",
    featured: true,
    available: true,
    dietary: ["Traditional Heritage"],
    samplePrice: true
  },
  {
    id: "dish-03",
    name: "Whole Crisp Fried Tilapia",
    category: "Grill & Fry",
    description: "Fresh Lake Victoria tilapia fish, scored and fried to a golden crisp outside while moist inside. Served with steaming white ugali, sauteed sukuma wiki, and chili dip.",
    price: 950,
    unit: "Whole fish",
    image: "/assets/images/fried-tilapia.jpg",
    featured: true,
    available: true,
    dietary: ["Pescatarian"],
    samplePrice: true
  },
  {
    id: "dish-04",
    name: "Traditional Beef Stew with Ugali & Managu",
    category: "Kenyan Classics",
    description: "Rich, hearty beef stew slow-simmered in aromatic tomato and rosemary gravy, paired with fluffy white cornmeal ugali and sauteed indigenous African nightshade greens (managu).",
    price: 750,
    unit: "Full meal",
    image: "/assets/images/traditional-ugali-managu.jpg",
    featured: true,
    available: true,
    dietary: ["Comfort Classic"],
    samplePrice: true
  },
  {
    id: "dish-05",
    name: "Charcoal Kuku Choma (Quarter / Half)",
    category: "From the Jiko",
    description: "Marinated free-range chicken basted with garlic butter and grilled over acacia charcoal until golden brown with crisp skin. Served with kachumbari.",
    price: 650,
    unit: "Half chicken",
    image: "/assets/images/charcoal-grill.jpg",
    featured: false,
    available: true,
    dietary: ["Charcoal Grilled"],
    samplePrice: true
  },
  {
    id: "dish-06",
    name: "Wet-Fried Goat Meat (Mbuzi Karanga)",
    category: "From the Jiko",
    description: "Tender chunks of goat meat flash-sautéed with onions, bell peppers, fresh coriander, and garlic. Rich and juicy, perfect for dipping with hot chapati.",
    price: 850,
    unit: "Single serving",
    image: "/assets/images/nyama-choma.jpg",
    featured: false,
    available: true,
    dietary: ["Chef's Special"],
    samplePrice: true
  },
  {
    id: "dish-07",
    name: "Matoke with Minced Beef Gravy",
    category: "Kenyan Classics",
    description: "Green plantains gently cooked until tender in a rich tomato, ginger, and minced beef reduction. Warm, filling, and comforting.",
    price: 600,
    unit: "Full plate",
    image: "/assets/images/traditional-ugali-managu.jpg",
    featured: false,
    available: true,
    dietary: ["Hearty Stew"],
    samplePrice: true
  },
  {
    id: "dish-08",
    name: "Handmade Layered Chapati (2 Pieces)",
    category: "Sides & Accompaniments",
    description: "Soft, flaky, multi-layered wheat flatbread prepared fresh on the flat griddle throughout the day.",
    price: 150,
    unit: "Pair",
    image: "/assets/images/family-dining.jpg",
    featured: false,
    available: true,
    dietary: ["Vegetarian"],
    samplePrice: true
  },
  {
    id: "dish-09",
    name: "Traditional Mukimo Platter",
    category: "Sides & Accompaniments",
    description: "Heritage Kikuyu dish of mashed potatoes, boiled yellow maize, green peas, and fresh pumpkin leaves with fried caramelized onions on top.",
    price: 300,
    unit: "Side portion",
    image: "/assets/images/signature-chicken-mukimo.jpg",
    featured: false,
    available: true,
    dietary: ["Vegetarian"],
    samplePrice: true
  },
  {
    id: "dish-10",
    name: "Fresh Spicy Kachumbari",
    category: "Sides & Accompaniments",
    description: "Finely diced ripe tomatoes, red onions, fresh coriander, lime juice, and optional bird's eye green chilies.",
    price: 100,
    unit: "Bowl",
    image: "/assets/images/nyama-choma.jpg",
    featured: false,
    available: true,
    dietary: ["Vegan", "Gluten-Free"],
    samplePrice: true
  },
  {
    id: "dish-11",
    name: "Kerio Spiced Herbal Dawa Tea",
    category: "Drinks",
    description: "Invigorating hot drink made with fresh crushed ginger, local Eldoret honey, freshly squeezed lime, and hot herbal infusion.",
    price: 250,
    unit: "Mug",
    image: "/assets/images/garden-dining.jpg",
    featured: true,
    available: true,
    dietary: ["Wellness", "Caffeine-Free"],
    samplePrice: true
  },
  {
    id: "dish-12",
    name: "Kenyan Masala Spiced Milk Tea",
    category: "Drinks",
    description: "Rich black Kenyan tea simmered with fresh whole milk, crushed cardamom, cinnamon, and ginger.",
    price: 180,
    unit: "Pot",
    image: "/assets/images/restaurant-interior.jpg",
    featured: false,
    available: true,
    dietary: ["Vegetarian"],
    samplePrice: true
  }
];

const MENU_CATEGORIES = [
  "All Dishes",
  "From the Jiko",
  "Grill & Fry",
  "Kenyan Classics",
  "Sides & Accompaniments",
  "Drinks"
];

window.MENU_ITEMS = MENU_ITEMS;
window.MENU_CATEGORIES = MENU_CATEGORIES;
