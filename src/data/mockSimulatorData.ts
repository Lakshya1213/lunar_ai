export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  isVeg: boolean;
  calories?: number;
}

export interface RestaurantData {
  id: string;
  name: string;
  cuisine: string;
  category: string;
  rating: number;
  reviewCount: number;
  eta: string;
  deliveryFee: string;
  studentDiscount: string;
  hasVegOptions: boolean;
  featuredItem: MenuItem;
  menu: MenuItem[];
}

export const CAMPUS_CATEGORIES = [
  'All',
  'Late Night',
  'Campus Deals',
  'Healthy & Bowls',
  'Coffee & Boba',
  'Fast Casual',
];

export const MOCK_RESTAURANTS: RestaurantData[] = [
  {
    id: 'res-1',
    name: 'Quad Burgers & Fries',
    cuisine: 'American • Late Night Grill',
    category: 'Late Night',
    rating: 4.8,
    reviewCount: 342,
    eta: '12-18 min',
    deliveryFee: 'Free Campus Drop',
    studentDiscount: '15% w/ Student ID',
    hasVegOptions: true,
    featuredItem: {
      id: 'item-101',
      name: 'Quad Deluxe Cheeseburger',
      description: 'Double smashed grass-fed beef, melted cheddar, quad sauce, brioche bun.',
      price: 9.50,
      isVeg: false,
      calories: 680,
    },
    menu: [
      {
        id: 'item-101',
        name: 'Quad Deluxe Cheeseburger',
        description: 'Double smashed grass-fed beef, melted cheddar, quad sauce, brioche bun.',
        price: 9.50,
        isVeg: false,
        calories: 680,
      },
      {
        id: 'item-102',
        name: 'Crispy Garlic Seasoned Fries',
        description: 'Hand-cut russet potatoes with garlic sea salt and spicy aioli dip.',
        price: 3.75,
        isVeg: true,
        calories: 380,
      },
      {
        id: 'item-103',
        name: 'Midnight Black Bean Vegan Burger',
        description: 'House-made black bean patty, avocado mash, roasted peppers on toasted sourdough.',
        price: 8.95,
        isVeg: true,
        calories: 520,
      },
      {
        id: 'item-104',
        name: 'Oreo Malt Milkshake (20oz)',
        description: 'Real vanilla bean ice cream blended with crushed oreos and malt.',
        price: 4.50,
        isVeg: true,
        calories: 590,
      },
    ],
  },
  {
    id: 'res-2',
    name: 'North Hall Noodle & Boba',
    cuisine: 'Asian Street Food • Boba',
    category: 'Coffee & Boba',
    rating: 4.9,
    reviewCount: 512,
    eta: '10-15 min',
    deliveryFee: 'Free Campus Drop',
    studentDiscount: 'Buy 1 Get 1 Boba 50% Off',
    hasVegOptions: true,
    featuredItem: {
      id: 'item-201',
      name: 'Spicy Garlic Sesame Dan-Dan Noodles',
      description: 'Fresh pulled noodles, crispy shallots, spicy chili crisp, baby bok choy.',
      price: 10.25,
      isVeg: true,
      calories: 580,
    },
    menu: [
      {
        id: 'item-201',
        name: 'Spicy Garlic Sesame Dan-Dan Noodles',
        description: 'Fresh pulled noodles, crispy shallots, spicy chili crisp, baby bok choy.',
        price: 10.25,
        isVeg: true,
        calories: 580,
      },
      {
        id: 'item-202',
        name: 'Brown Sugar Tiger Milk Tea with Pearls',
        description: 'Fresh organic milk, caramelized slow-cooked brown sugar boba.',
        price: 5.25,
        isVeg: true,
        calories: 340,
      },
      {
        id: 'item-203',
        name: 'Crispy Pan-Fried Vegetable Dumplings (6 pcs)',
        description: 'Cabbage, scallion, and shiitake mushroom filling with chili dipping vinegar.',
        price: 6.50,
        isVeg: true,
        calories: 320,
      },
    ],
  },
  {
    id: 'res-3',
    name: 'Verde Campus Salads & Grain Bowls',
    cuisine: 'Healthy • Organic Bowls',
    category: 'Healthy & Bowls',
    rating: 4.7,
    reviewCount: 228,
    eta: '15-20 min',
    deliveryFee: '$1.00 Dorm Fee',
    studentDiscount: 'Free Avocado Addon',
    hasVegOptions: true,
    featuredItem: {
      id: 'item-301',
      name: 'Roasted Sweet Potato & Quinoa Bowl',
      description: 'Warm wild rice, organic quinoa, spiced chickpeas, baby kale, lemon tahini.',
      price: 9.80,
      isVeg: true,
      calories: 490,
    },
    menu: [
      {
        id: 'item-301',
        name: 'Roasted Sweet Potato & Quinoa Bowl',
        description: 'Warm wild rice, organic quinoa, spiced chickpeas, baby kale, lemon tahini.',
        price: 9.80,
        isVeg: true,
        calories: 490,
      },
      {
        id: 'item-302',
        name: 'Grilled Herb Chicken Protein Caesar',
        description: 'Crisp romaine, shaved parmesan, sourdough crisps, light yogurt caesar.',
        price: 11.20,
        isVeg: false,
        calories: 530,
      },
    ],
  },
  {
    id: 'res-4',
    name: 'Campus Slice 24/7 Pizzeria',
    cuisine: 'Italian • Pizza by the Slice',
    category: 'Late Night',
    rating: 4.6,
    reviewCount: 489,
    eta: '15-22 min',
    deliveryFee: 'Free Dorm Drop',
    studentDiscount: '$2 Jumbo Slice Special',
    hasVegOptions: true,
    featuredItem: {
      id: 'item-401',
      name: 'Jumbo Marinated Pepperoni Slice',
      description: 'Crispy cupping pepperoni, aged whole milk mozzarella, san marzano tomato base.',
      price: 3.50,
      isVeg: false,
      calories: 440,
    },
    menu: [
      {
        id: 'item-401',
        name: 'Jumbo Marinated Pepperoni Slice',
        description: 'Crispy cupping pepperoni, aged whole milk mozzarella, san marzano tomato base.',
        price: 3.50,
        isVeg: false,
        calories: 440,
      },
      {
        id: 'item-402',
        name: 'Four-Cheese White Garlic Ricotta Slice',
        description: 'Mozzarella, ricotta, fontina, pecorino, roasted garlic oil, fresh basil.',
        price: 3.75,
        isVeg: true,
        calories: 410,
      },
      {
        id: 'item-403',
        name: 'Garlic Knots with Warm Marinara (5 pcs)',
        description: 'Freshly baked knot dough brushed with garlic herb butter and parsley.',
        price: 4.25,
        isVeg: true,
        calories: 360,
      },
    ],
  },
];
