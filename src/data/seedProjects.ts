import type { LunorProject } from '../types';
import {
  generateDynamicDebugIssues,
  generateDynamicExplainTopics,
  generateDynamicConcepts,
} from '../utils/dynamicStages';

export const initialCampusEatsProject: LunorProject = {
  id: 'proj-campuseats-01',
  name: 'CampusEats Mobile',
  tagline: 'Hyper-local food delivery & group split-billing for college dorms',
  rawIdea: 'Build a food delivery app for college students.',
  activeStage: 'understand',
  createdAt: 'Just now',
  updatedAt: 'Realtime synced',
  aiStatus: {
    state: 'synced',
    model: 'Lunor-Engineering-v3.8 (Deep Context)',
    contextTokens: 14280,
    latencyMs: 14,
  },
  understanding: {
    problemStatement:
      'College students face inflated delivery fees, complex roommate bill-splitting, and erratic dorm delivery drop-offs. Existing apps (DoorDash/UberEats) do not cater to campus geography, student budgets, or shared group orders.',
    solutionVision:
      'A campus-tailored mobile delivery network featuring low-fee bulk dorm drops, peer split-billing with student campus cards, and late-night library study snack curations.',
    targetAudience: [
      {
        id: 'persona-1',
        name: 'Alex Rivera',
        role: 'Sophomore, Computer Science',
        avatar: 'AR',
        painPoints: [
          'High $7-$10 delivery & service fees on small $12 orders',
          'Awkward Venmo requests to roommates for 4-way pizza orders',
          'Delivery drivers getting lost trying to enter secure dorm buildings',
        ],
        goals: [
          'Affordable late-night food past midnight',
          'Instant 1-tap bill splitting among roommates',
          'Reliable drop-off at designated North Quad dorm lockers',
        ],
        quote: '"I end up paying $24 for a $11 burrito just because of fees and drivers wandering around our campus courtyard."',
      },
      {
        id: 'persona-2',
        name: 'Maya Chen',
        role: 'Senior, Biology / Pre-Med',
        avatar: 'MC',
        painPoints: [
          'Severe time crunch during exam weeks with irregular eating hours',
          'Limited dietary filters (strict vegetarian/kosher) in standard apps',
          'Campus dining halls close at 8:00 PM sharp',
        ],
        goals: [
          'Fast healthy meal delivery directly to the campus science library',
          'Dietary preference memory (100% vegetarian filter)',
          'Scheduled recurring coffee & boba drops during study blocks',
        ],
        quote: '"When exams hit, I cannot afford 45 minutes walking to the dining hall, but commercial delivery fees are ruinous."',
      },
      {
        id: 'persona-3',
        name: 'Marcus Vance',
        role: 'Junior & Dorm Resident Assistant (RA)',
        avatar: 'MV',
        painPoints: [
          'Crowded dorm lobby entrances cluttered with unidentified delivery bags',
          'Unregistered non-student couriers loitering near student dormitory gates',
        ],
        goals: [
          'Consolidated batch deliveries grouped by dorm building zones',
          'Safe pin-code verification for order pickups',
        ],
        quote: '"Batch dorm delivery points would fix the security and clutter mess in our hall lobbies."',
      },
    ],
    features: [
      {
        id: 'feat-1',
        title: 'Campus Dorm-Drop Hubs',
        description: 'Pin-point delivery drop zones specifically calibrated to campus dorms, library study desks, and campus union towers.',
        category: 'Campus Logistics',
        priority: 'MVP',
        complexity: 'Medium',
      },
      {
        id: 'feat-2',
        title: 'Instant Roommate Split-Billing',
        description: 'Split cart items item-by-item or equally with campus roommates before order submission without manual math.',
        category: 'Fintech',
        priority: 'MVP',
        complexity: 'High',
      },
      {
        id: 'feat-3',
        title: 'Dietary & Vegetarian Quick Toggle',
        description: 'Instant global filter for strict vegetarian, halal, vegan, and budget-friendly under $10 options.',
        category: 'Student Experience',
        priority: 'MVP',
        complexity: 'Low',
      },
      {
        id: 'feat-4',
        title: 'Live Courier Step-by-Step Tracking',
        description: 'Real-time countdown and map beacon showing rider location and dorm lobby arrival notification.',
        category: 'Core',
        priority: 'MVP',
        complexity: 'Medium',
      },
      {
        id: 'feat-5',
        title: 'Campus ID / Meal Plan Card Gateway',
        description: 'Allow students to connect campus dining dollars and auxiliary funds alongside Apple Pay.',
        category: 'Fintech',
        priority: 'V2',
        complexity: 'High',
      },
      {
        id: 'feat-6',
        title: 'Peer Dorm Delivery Runners',
        description: 'Allow student couriers walking back from classes to pick up orders for dorm peers to earn campus credit.',
        category: 'Campus Logistics',
        priority: 'Future',
        complexity: 'High',
      },
    ],
    userJourneys: [
      {
        step: 1,
        stage: 'Discovery & Selection',
        userAction: 'Opens app, selects "North Quad Dorm" hub, toggles "Veg Only" and "Under $10"',
        systemAction: 'Applies geo-fenced campus vendor list and sorts by shortest delivery ETA',
        touchpoint: 'Home Feed & Filter Bar',
      },
      {
        step: 2,
        stage: 'Group Basket Building',
        userAction: 'Adds Burrito Bowls to cart, selects "Split with 2 roommates"',
        systemAction: 'Calculates exact per-student share ($9.50 each) and generates payment hold link',
        touchpoint: 'Interactive Cart Sheet',
      },
      {
        step: 3,
        stage: 'Dorm Lobby Handoff',
        userAction: 'Receives arrival alert with 4-digit pickup pin and meets courier at lobby hub',
        systemAction: 'Rider verifies pin, order transitions to "Delivered", receipts distributed to split peers',
        touchpoint: 'Live Order Tracking Screen',
      },
    ],
    clarifications: [
      {
        id: 'clar-1',
        question: 'How should delivery locations within campus be validated?',
        context: 'Campus layouts often have pedestrian-only pathways and locked dorm lobbies.',
        options: [
          {
            id: 'opt-1a',
            label: 'Designated Campus Hubs (Recommended)',
            description: 'Students select from 18 verified dorm & library lobby drop boxes with NFC/PIN pickup.',
          },
          {
            id: 'opt-1b',
            label: 'Freeform GPS Pinning',
            description: 'Couriers attempt direct delivery to arbitrary campus coordinates (higher risk of lost couriers).',
          },
        ],
        selectedOptionId: 'opt-1a',
      },
      {
        id: 'clar-2',
        question: 'Should payment require upfront split approval from all roommates?',
        context: 'Waiting on roommates to authorize payment might delay urgent late-night food orders.',
        options: [
          {
            id: 'opt-2a',
            label: 'Host Covers First, Request Dispatched (Recommended)',
            description: 'Order executes immediately; app dispatches automated micro-charges to invited peers.',
          },
          {
            id: 'opt-2b',
            label: 'All Must Approve Before Kitchen Start',
            description: 'Cart times out after 7 minutes if a roommate fails to approve.',
          },
        ],
        selectedOptionId: 'opt-2a',
      },
      {
        id: 'clar-3',
        question: 'Should the app enforce .edu email authentication?',
        context: 'Limiting to verified college students preserves campus safety and targeted merchant discounts.',
        options: [
          {
            id: 'opt-3a',
            label: 'Enforce Verified .edu SSO (Recommended)',
            description: 'Sign-in restricted to university email; unlocks student-only discount tiers.',
          },
          {
            id: 'opt-3b',
            label: 'Open Access with Optional .edu Badge',
            description: 'Anyone nearby can order; students submit email optionally for coupons.',
          },
        ],
        selectedOptionId: 'opt-3a',
      },
    ],
    missingRequirements: [
      'Late-night operating hours mismatch: restaurants closing early without dynamic menu delisting.',
      'Campus safety protocol for guest couriers entering restricted residential quad halls after 10:00 PM.',
      'Partial item out-of-stock recovery logic during multi-roommate split orders.',
    ],
  },
  plan: {
    screens: [
      {
        id: 'scr-1',
        name: 'Home / Discovery Feed',
        route: '/home',
        purpose: 'Displays campus dining options, quick dietary filter toggles, ETA badges, and student meal deals.',
        components: ['CampusZonePicker', 'DietaryFilterRow', 'QuickDealCarousel', 'RestaurantCardGrid'],
      },
      {
        id: 'scr-2',
        name: 'Restaurant Menu & Customizer',
        route: '/restaurant/:id',
        purpose: 'Menu catalog organized by categories, dietary markers, addon selections, and meal customization.',
        components: ['RestaurantHero', 'CategoryTabs', 'MenuItemCard', 'CustomizationModal'],
      },
      {
        id: 'scr-3',
        name: 'Cart & Roommate Split Hub',
        route: '/cart',
        purpose: 'Itemized basket review, dynamic split-bill calculator (1 to 4 roommates), tip distribution, and checkout CTA.',
        components: ['CartItemList', 'SplitBillSlider', 'DormDropSelector', 'CheckoutSummaryBar'],
      },
      {
        id: 'scr-4',
        name: 'Live Order Tracking & PIN Handoff',
        route: '/orders/:orderId/track',
        purpose: 'Live status stages (Placed -> Kitchen -> In Transit -> Lobby Ready), courier contact, and security pickup PIN.',
        components: ['StatusStepper', 'CampusMapBeacon', 'CourierInfoCard', 'PickupPinBadge'],
      },
    ],
    databaseSchema: [
      {
        id: 'tbl-users',
        tableName: 'users',
        description: 'Verified campus students, resident assistants, and student couriers.',
        columns: [
          { name: 'id', type: 'UUID', isPrimary: true, notes: 'Auto-generated primary key' },
          { name: 'edu_email', type: 'VARCHAR(255)', notes: 'Verified .edu university address' },
          { name: 'full_name', type: 'VARCHAR(128)', notes: 'Student legal or display name' },
          { name: 'dorm_hall_id', type: 'UUID', isForeign: true, references: 'campus_zones.id' },
          { name: 'created_at', type: 'TIMESTAMPTZ', notes: 'Account registration timestamp' },
        ],
      },
      {
        id: 'tbl-zones',
        tableName: 'campus_zones',
        description: 'Verified drop-off locations across residential dorms and campus libraries.',
        columns: [
          { name: 'id', type: 'UUID', isPrimary: true },
          { name: 'zone_name', type: 'VARCHAR(128)', notes: 'e.g. North Quad Lobby, Science Library' },
          { name: 'building_code', type: 'VARCHAR(16)', notes: 'Campus architectural code (e.g. NQ-01)' },
          { name: 'access_instructions', type: 'TEXT', notes: 'Door access instructions for courier' },
        ],
      },
      {
        id: 'tbl-restaurants',
        tableName: 'restaurants',
        description: 'Campus-partnered eateries, food trucks, and dining hall express kiosks.',
        columns: [
          { name: 'id', type: 'UUID', isPrimary: true },
          { name: 'name', type: 'VARCHAR(128)' },
          { name: 'cuisine_type', type: 'VARCHAR(64)' },
          { name: 'avg_prep_minutes', type: 'INT', notes: 'Average preparation duration' },
          { name: 'is_active_late_night', type: 'BOOLEAN', notes: 'Open past 11:00 PM' },
          { name: 'rating', type: 'DECIMAL(2,1)' },
        ],
      },
      {
        id: 'tbl-orders',
        tableName: 'orders',
        description: 'Customer order transactions, split billing states, and courier assignment.',
        columns: [
          { name: 'id', type: 'UUID', isPrimary: true },
          { name: 'host_user_id', type: 'UUID', isForeign: true, references: 'users.id' },
          { name: 'restaurant_id', type: 'UUID', isForeign: true, references: 'restaurants.id' },
          { name: 'drop_zone_id', type: 'UUID', isForeign: true, references: 'campus_zones.id' },
          { name: 'status', type: 'VARCHAR(32)', notes: 'placed | preparing | transit | ready_lobby | delivered' },
          { name: 'subtotal_cents', type: 'INTEGER' },
          { name: 'split_count', type: 'INTEGER', notes: 'Number of roommates splitting (1-4)' },
          { name: 'pickup_pin', type: 'CHAR(4)', notes: '4-digit lobby security code' },
        ],
      },
    ],
    apiEndpoints: [
      {
        id: 'api-1',
        method: 'GET',
        path: '/api/v1/campus/zones',
        summary: 'List all verified campus drop hubs with current wait times',
        responseBody: '{\n  "data": [\n    { "id": "zone-nq", "name": "North Quad Dorm", "buildingCode": "NQ-01" },\n    { "id": "zone-lib", "name": "Engineering Library West", "buildingCode": "LIB-04" }\n  ]\n}',
        status: 200,
      },
      {
        id: 'api-2',
        method: 'GET',
        path: '/api/v1/restaurants/feed',
        summary: 'Retrieve restaurants with dietary filters and campus delivery ETA',
        responseBody: '{\n  "restaurants": [\n    { "id": "r1", "name": "Quad Burgers & Fries", "eta": "15-20 min", "studentDiscount": "15% off" }\n  ]\n}',
        status: 200,
      },
      {
        id: 'api-3',
        method: 'POST',
        path: '/api/v1/orders/checkout-split',
        summary: 'Create new order with automated roommate split calculation',
        requestBody: '{\n  "restaurantId": "r1",\n  "dropZoneId": "zone-nq",\n  "items": [{ "menuItemId": "m-101", "quantity": 2 }],\n  "splitCount": 3\n}',
        responseBody: '{\n  "orderId": "ord-8891",\n  "status": "placed",\n  "perPersonShare": 8.75,\n  "pickupPin": "4821"\n}',
        status: 201,
      },
      {
        id: 'api-4',
        method: 'GET',
        path: '/api/v1/orders/:orderId/track',
        summary: 'Poll live courier stage and estimated arrival countdown',
        responseBody: '{\n  "orderId": "ord-8891",\n  "status": "in_transit",\n  "courierName": "Devon S.",\n  "minutesRemaining": 8,\n  "pickupPin": "4821"\n}',
        status: 200,
      },
    ],
    techStack: [
      {
        id: 'tech-1',
        category: 'Mobile Runtime',
        technology: 'React Native + Expo SDK 52',
        version: 'v0.76 / Expo 52',
        tradeoffReasoning: 'Permits single-codebase iOS/Android target with native gesture fluidness and instant Expo OTA update delivery.',
      },
      {
        id: 'tech-2',
        category: 'Styling',
        technology: 'Tailwind CSS (NativeWind v4)',
        version: 'v4.0.1',
        tradeoffReasoning: 'Enables consistent utility-first styling across web and mobile viewports with compile-time zero runtime overhead.',
      },
      {
        id: 'tech-3',
        category: 'State Management',
        technology: 'Zustand + Immer',
        version: 'v5.0.3',
        tradeoffReasoning: 'Chosen over Redux for minimal boilerplate and unopinionated state slices, ideal for rapid cart & split-bill mutations.',
      },
      {
        id: 'tech-4',
        category: 'Database',
        technology: 'Supabase (PostgreSQL 16) + PostGIS',
        version: 'PostgreSQL 16.3',
        tradeoffReasoning: 'Provides built-in Row Level Security for student dorm privacy and PostGIS geometry for campus boundary queries.',
      },
    ],
    architectureNodes: [
      {
        id: 'arch-1',
        name: 'Mobile App Client (Expo)',
        layer: 'Client',
        description: 'React Native front-end rendered on iOS and Android devices, handling local optimistic cart states.',
        protocol: 'HTTPS / WSS',
      },
      {
        id: 'arch-2',
        name: 'Edge API Gateway',
        layer: 'API Gateway',
        description: 'Cloudflare Workers validating university JWT tokens and routing requests with sub-10ms latency.',
        protocol: 'HTTP/3 TLS 1.3',
      },
      {
        id: 'arch-3',
        name: 'Order & Split Microservice',
        layer: 'Microservices',
        description: 'Node.js/Fastify engine coordinating roommate payment holds, kitchen dispatches, and inventory locks.',
        protocol: 'gRPC Internal',
      },
      {
        id: 'arch-4',
        name: 'PostgreSQL Database & Realtime PubSub',
        layer: 'Persistence',
        description: 'ACID transactional store for financial ledgers with Supabase Realtime pushing courier GPS telemetry.',
        protocol: 'Postgres Wire / WSS',
      },
    ],
    tasks: [
      { id: 'tsk-1', title: 'Define PostgreSQL schema with dorm zone foreign keys', category: 'Data', status: 'completed', complexity: 'Low' },
      { id: 'tsk-2', title: 'Implement Zustand cart slice with roommate split reducer', category: 'Frontend', status: 'completed', complexity: 'Medium' },
      { id: 'tsk-3', title: 'Build interactive mobile Discovery Feed with Veg/Budget filters', category: 'Frontend', status: 'completed', complexity: 'Medium' },
      { id: 'tsk-4', title: 'Construct live order tracking screen with 4-digit PIN verification', category: 'Frontend', status: 'completed', complexity: 'Medium' },
      { id: 'tsk-5', title: 'Integrate WebSockets for live courier lobby approach alerts', category: 'Backend', status: 'in-progress', complexity: 'High' },
      { id: 'tsk-6', title: 'Setup automated university .edu SSO token validation', category: 'Backend', status: 'planned', complexity: 'Medium' },
    ],
  },
  virtualFiles: [
    {
      id: 'vf-app',
      name: 'App.tsx',
      path: 'src/App.tsx',
      language: 'tsx',
      content: `import React, { useState } from 'react';
import { useCartStore } from './store/cartStore';
import { HomeScreen } from './screens/HomeScreen';
import { CartSheet } from './components/CartSheet';
import { OrderTrackingScreen } from './screens/OrderTrackingScreen';

export function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'orders' | 'profile'>('home');
  const [activeOrderId, setActiveOrderId] = useState<string | null>(null);
  const isCartOpen = useCartStore((s) => s.isOpen);

  if (activeOrderId) {
    return <OrderTrackingScreen orderId={activeOrderId} onBack={() => setActiveOrderId(null)} />;
  }

  return (
    <div className="flex flex-col h-full bg-zinc-950 text-zinc-100 font-sans">
      <main className="flex-1 overflow-y-auto">
        {activeTab === 'home' && (
          <HomeScreen onOrderPlaced={(orderId) => setActiveOrderId(orderId)} />
        )}
      </main>

      {/* Global Slide-Over Cart Sheet */}
      {isCartOpen && <CartSheet onCheckoutSuccess={(id) => setActiveOrderId(id)} />}
    </div>
  );
}`,
    },
    {
      id: 'vf-home',
      name: 'HomeScreen.tsx',
      path: 'src/screens/HomeScreen.tsx',
      language: 'tsx',
      content: `import React, { useState } from 'react';
import { RESTAURANTS, CATEGORIES } from '../data/campusData';
import { useCartStore } from '../store/cartStore';

interface HomeScreenProps {
  onOrderPlaced: (orderId: string) => void;
}

export function HomeScreen({ onOrderPlaced }: HomeScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isVegOnly, setIsVegOnly] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);
  const cartItemsCount = useCartStore((s) => s.items.length);

  // Filter restaurants based on active category & dietary toggle
  const filteredRestaurants = RESTAURANTS.filter((r) => {
    const matchesCategory = selectedCategory === 'All' || r.category === selectedCategory;
    const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesVeg = !isVegOnly || r.hasVegOptions;
    return matchesCategory && matchesSearch && matchesVeg;
  });

  return (
    <div className="p-4 space-y-4">
      {/* Campus Hub Selector */}
      <div className="flex items-center justify-between py-2 border-b border-zinc-800">
        <div>
          <span className="text-xs text-zinc-400 uppercase tracking-wider">Delivering to</span>
          <p className="text-sm font-semibold text-emerald-400">📍 North Quad Dorm Lobby (Hub #04)</p>
        </div>
        <button 
          onClick={openCart}
          className="relative px-3 py-1.5 text-xs font-medium bg-zinc-800 hover:bg-zinc-700 rounded-lg text-white"
        >
          Cart ({cartItemsCount})
        </button>
      </div>

      {/* Search & Dietary Filters */}
      <div className="space-y-2">
        <input 
          type="text" 
          placeholder="Search campus burgers, bowls, matcha..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-3 py-2 text-sm bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-600"
        />

        <div className="flex gap-2 overflow-x-auto pb-1 text-xs">
          <button
            onClick={() => setIsVegOnly(!isVegOnly)}
            className={\`px-3 py-1 rounded-full border transition-colors \${
              isVegOnly 
                ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 font-medium' 
                : 'border-zinc-800 text-zinc-400 hover:text-zinc-200'
            }\`}
          >
            🌱 Veg Only
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={\`px-3 py-1 rounded-full border whitespace-nowrap \${
                selectedCategory === cat 
                  ? 'bg-zinc-100 text-zinc-900 border-zinc-100 font-medium' 
                  : 'border-zinc-800 text-zinc-400'
              }\`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Restaurant Feed */}
      <div className="space-y-3">
        {filteredRestaurants.map((restaurant) => (
          <div key={restaurant.id} className="p-3 bg-zinc-900/60 border border-zinc-800/80 rounded-xl space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-zinc-100 text-sm">{restaurant.name}</h3>
                <p className="text-xs text-zinc-400">{restaurant.cuisine} • {restaurant.eta} min</p>
              </div>
              <span className="px-2 py-0.5 text-xs bg-zinc-800 text-amber-400 rounded">★ {restaurant.rating}</span>
            </div>

            {/* Featured Item with Add to Cart */}
            <div className="pt-2 border-t border-zinc-800/50 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-zinc-200">{restaurant.featuredItem.name}</p>
                <p className="text-xs text-zinc-400">\${restaurant.featuredItem.price.toFixed(2)}</p>
              </div>
              <button
                onClick={() => addItem({
                  id: restaurant.featuredItem.id,
                  name: restaurant.featuredItem.name,
                  price: restaurant.featuredItem.price,
                  restaurant: restaurant.name,
                  isVeg: restaurant.featuredItem.isVeg,
                })}
                className="px-3 py-1 text-xs bg-zinc-100 text-zinc-900 font-semibold rounded-lg hover:bg-white"
              >
                + Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}`,
    },
    {
      id: 'vf-store',
      name: 'cartStore.ts',
      path: 'src/store/cartStore.ts',
      language: 'typescript',
      content: `import { create } from 'zustand';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  restaurant: string;
  isVeg: boolean;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  splitCount: number; // 1 to 4 roommates
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  setSplitCount: (count: number) => void;
  getPerPersonShare: () => number;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isOpen: false,
  splitCount: 1,
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  addItem: (newItem) => set((state) => {
    const existing = state.items.find((i) => i.id === newItem.id);
    if (existing) {
      return {
        items: state.items.map((i) =>
          i.id === newItem.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      };
    }
    return { items: [...state.items, { ...newItem, quantity: 1 }] };
  }),
  removeItem: (id) => set((state) => ({
    items: state.items.filter((i) => i.id !== id),
  })),
  setSplitCount: (count) => set({ splitCount: Math.max(1, count) }),
  getPerPersonShare: () => {
    const total = get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    // Potential bug in unhandled zero items:
    return total > 0 ? total / get().splitCount : 0;
  },
  clearCart: () => set({ items: [], splitCount: 1 }),
}));`,
    },
    {
      id: 'vf-track',
      name: 'OrderTrackingScreen.tsx',
      path: 'src/screens/OrderTrackingScreen.tsx',
      language: 'tsx',
      content: `import React, { useState, useEffect } from 'react';

interface TrackingProps {
  orderId: string;
  onBack: () => void;
}

export function OrderTrackingScreen({ orderId, onBack }: TrackingProps) {
  const [step, setStep] = useState<number>(2); // 0: Placed, 1: Kitchen, 2: Transit, 3: Arrived
  const stages = [
    { label: 'Order Confirmed', time: '12:04 AM' },
    { label: 'Kitchen Preparing', time: '12:11 AM' },
    { label: 'Rider on Campus Bike', time: '12:18 AM' },
    { label: 'Lobby Pickup Ready', time: '12:24 AM' },
  ];

  return (
    <div className="p-4 space-y-5 bg-zinc-950 text-zinc-100 min-h-full">
      <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
        <button onClick={onBack} className="text-xs text-zinc-400 hover:text-white">
          ← Back to Menu
        </button>
        <span className="text-xs font-mono text-zinc-500">Order #{orderId.slice(0, 8)}</span>
      </div>

      <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-xs text-zinc-400">Estimated Arrival</span>
          <span className="text-base font-bold text-emerald-400">8 mins remaining</span>
        </div>

        {/* 4-digit security PIN for student pickup */}
        <div className="p-3 bg-zinc-950/80 rounded-lg flex items-center justify-between border border-zinc-800/80">
          <div>
            <p className="text-xs text-zinc-400">Lobby Security PIN</p>
            <p className="text-lg font-mono font-bold tracking-widest text-zinc-100">4821</p>
          </div>
          <span className="text-[11px] px-2 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded">
            Show to Driver
          </span>
        </div>
      </div>

      {/* Progress Timeline */}
      <div className="space-y-3 pl-2">
        {stages.map((st, i) => (
          <div key={st.label} className="flex items-center gap-3">
            <div className={\`w-3 h-3 rounded-full border \${
              i <= step ? 'bg-emerald-500 border-emerald-400 ring-2 ring-emerald-500/20' : 'bg-zinc-800 border-zinc-700'
            }\`} />
            <div className="flex-1 flex justify-between items-center text-xs">
              <span className={i <= step ? 'font-medium text-zinc-200' : 'text-zinc-500'}>{st.label}</span>
              <span className="text-zinc-500 font-mono text-[10px]">{st.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}`,
    },
    {
      id: 'vf-schema',
      name: 'schema.sql',
      path: 'supabase/schema.sql',
      language: 'sql',
      content: `-- CampusEats Relational Schema (PostgreSQL 16)
CREATE TABLE campus_zones (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    zone_name VARCHAR(128) NOT NULL,
    building_code VARCHAR(16) NOT NULL UNIQUE,
    access_instructions TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    edu_email VARCHAR(255) NOT NULL UNIQUE,
    full_name VARCHAR(128) NOT NULL,
    dorm_hall_id UUID REFERENCES campus_zones(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE restaurants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(128) NOT NULL,
    cuisine VARCHAR(64) NOT NULL,
    rating NUMERIC(2,1) DEFAULT 4.5,
    is_active_late_night BOOLEAN DEFAULT true
);

CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    host_user_id UUID NOT NULL REFERENCES users(id),
    drop_zone_id UUID NOT NULL REFERENCES campus_zones(id),
    status VARCHAR(32) NOT NULL DEFAULT 'placed',
    split_count INTEGER DEFAULT 1 CHECK (split_count BETWEEN 1 AND 4),
    pickup_pin CHAR(4) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);`,
    },
  ],
  activeFileId: 'vf-app',
  modifications: [
    {
      id: 'mod-1',
      prompt: 'Initial scaffold from user natural language prompt: "Build a food delivery app for college students."',
      timestamp: '2 mins ago',
      changesSummary: 'Synthesized App.tsx, HomeScreen, Zustand cart store with roommate split-billing, and live order tracking screen.',
      affectedFiles: ['src/App.tsx', 'src/screens/HomeScreen.tsx', 'src/store/cartStore.ts'],
    },
  ],
  debugIssues: [
    {
      id: 'iss-1',
      title: 'Potential Division by Zero in Split-Bill share calculation',
      severity: 'critical',
      fileId: 'vf-store',
      filePath: 'src/store/cartStore.ts',
      line: 41,
      snippet: 'getPerPersonShare: () => {\n  const total = get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);\n  return total > 0 ? total / get().splitCount : 0;\n}',
      explanation:
        'When splitCount is initialized or manipulated via UI sliders to 0 or negative numbers, dividing total by splitCount results in Infinity or NaN, triggering React render crashes during checkout.',
      rootCause:
        'The state setter setSplitCount lacks bounds checking against non-positive integers, and getPerPersonShare assumes get().splitCount is strictly >= 1.',
      suggestedFix:
        'Sanitize splitCount using Math.max(1, Math.floor(count)) and defensively guard against splitCount === 0 with a fallback divisor of 1.',
      diffBefore: `  setSplitCount: (count) => set({ splitCount: count }),
  getPerPersonShare: () => {
    const total = get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return total / get().splitCount;
  },`,
      diffAfter: `  setSplitCount: (count) => set({ splitCount: Math.max(1, count) }),
  getPerPersonShare: () => {
    const total = get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const divisor = Math.max(1, get().splitCount || 1);
    return total > 0 ? Math.round((total / divisor) * 100) / 100 : 0;
  },`,
      isFixed: false,
    },
    {
      id: 'iss-2',
      title: 'Missing Optimistic Rollback on Network Failure in Add-to-Cart',
      severity: 'warning',
      fileId: 'vf-home',
      filePath: 'src/screens/HomeScreen.tsx',
      line: 68,
      snippet: 'onClick={() => addItem({\n  id: restaurant.featuredItem.id,\n  name: restaurant.featuredItem.name,\n  price: restaurant.featuredItem.price,\n  restaurant: restaurant.name,\n  isVeg: restaurant.featuredItem.isVeg,\n})}',
      explanation:
        'Directly mutating local Zustand store without an asynchronous transaction snapshot creates ghost cart items if the subsequent inventory reservation API call fails or times out.',
      rootCause:
        'No optimistic state snapshot or rollback mechanism wraps the local store mutation.',
      suggestedFix:
        'Introduce an error boundary or rollback snapshot that reverts the cart state if the backend inventory reservation returns HTTP 409 or network failure.',
      diffBefore: `  onClick={() => addItem(restaurant.featuredItem)}`,
      diffAfter: `  onClick={async () => {
    const previousSnapshot = useCartStore.getState().items;
    addItem(restaurant.featuredItem);
    try {
      await reserveInventory(restaurant.featuredItem.id);
    } catch (err) {
      useCartStore.setState({ items: previousSnapshot });
      toast.error('Item temporarily unavailable');
    }
  }}`,
      isFixed: false,
    },
    {
      id: 'iss-3',
      title: 'Unmemoized filteredRestaurants creates re-render overhead during search input',
      severity: 'info',
      fileId: 'vf-home',
      filePath: 'src/screens/HomeScreen.tsx',
      line: 18,
      snippet: 'const filteredRestaurants = RESTAURANTS.filter((r) => { ... });',
      explanation:
        'Filtering the entire restaurant array on every single keystroke causes re-evaluations of all child restaurant cards, which can lead to dropped frames on lower-end mobile devices.',
      rootCause:
        'The filteredRestaurants derivation is executed inline in the component body rather than wrapped in React.useMemo.',
      suggestedFix:
        'Wrap the filtering logic in useMemo([selectedCategory, searchQuery, isVegOnly]) to memoize the computation.',
      diffBefore: `  const filteredRestaurants = RESTAURANTS.filter((r) => {
    const matchesCategory = selectedCategory === 'All' || r.category === selectedCategory;
    const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesVeg = !isVegOnly || r.hasVegOptions;
    return matchesCategory && matchesSearch && matchesVeg;
  });`,
      diffAfter: `  const filteredRestaurants = React.useMemo(() => {
    return RESTAURANTS.filter((r) => {
      const matchesCategory = selectedCategory === 'All' || r.category === selectedCategory;
      const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesVeg = !isVegOnly || r.hasVegOptions;
      return matchesCategory && matchesSearch && matchesVeg;
    });
  }, [selectedCategory, searchQuery, isVegOnly]);`,
      isFixed: false,
    },
  ],
  explainTopics: [
    {
      id: 'exp-1',
      title: 'Zustand Cart Store & Roommate Split Calculation',
      targetSymbol: 'useCartStore.getPerPersonShare',
      fileContext: 'src/store/cartStore.ts',
      codeSnippet: `export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  splitCount: 1,
  getPerPersonShare: () => {
    const total = get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const divisor = Math.max(1, get().splitCount || 1);
    return total > 0 ? Math.round((total / divisor) * 100) / 100 : 0;
  },
}));`,
      explanations: {
        beginner:
          'Think of this like a group dinner bill. The app adds up all the food prices and then divides that total evenly among however many roommates are sharing. If the total is $30 and 3 roommates are splitting, each person pays exactly $10.',
        intermediate:
          'This uses Zustand’s get() accessor to read reactive store state outside the render cycle. We compute the total via an array reduce, ensure the divisor is clamped to a minimum of 1 to prevent division-by-zero, and round to two decimal currency places.',
        advanced:
          'By utilizing a getter pattern inside the Zustand slice rather than a selector in the component, we avoid recurring recomputations across multiple subscribing components unless the underlying items array or splitCount reference changes. We enforce numerical idempotency by sanitizing currency floats into two-decimal fixed precision.',
      },
      architecturalRationale:
        'We decoupled cart calculation logic from UI components into a centralized Zustand store slice. This guarantees consistent totals across the bottom sheet, checkout button, and split bill ledger without prop drilling.',
      tradeoffsConsidered: [
        'Zustand vs Redux Toolkit: Zustand has ~1.1kB bundle footprint and zero boilerplate vs Redux boilerplate.',
        'Client-side vs Server-side Split: Client computes instant feedback; backend verifies final cent-allocation with Banker’s Rounding during order creation.',
      ],
    },
    {
      id: 'exp-2',
      title: 'Live Order Tracking State Machine & PIN Handoff',
      targetSymbol: 'OrderTrackingScreen.stages',
      fileContext: 'src/screens/OrderTrackingScreen.tsx',
      codeSnippet: `const stages = [
  { label: 'Order Confirmed', time: '12:04 AM' },
  { label: 'Kitchen Preparing', time: '12:11 AM' },
  { label: 'Rider on Campus Bike', time: '12:18 AM' },
  { label: 'Lobby Pickup Ready', time: '12:24 AM' },
];`,
      explanations: {
        beginner:
          'Just like a parcel tracking bar, this shows four steps: received, cooking, on the way, and ready in your dorm lobby. It gives students peace of mind knowing exactly when to walk down to the front door.',
        intermediate:
          'This models a linear finite state machine (FSM). Each state maps to an active progress index, triggering CSS active rings and milestone badges. A 4-digit verification code is generated to safeguard handoffs in crowded dormitory vestibules.',
        advanced:
          'The UI maps directly to an asynchronous pub/sub event pipeline driven by Supabase Postgres CDC (Change Data Capture) or WebSocket channels. When a courier checks in at a campus geofence, a webhook transitions the state from `in_transit` to `ready_lobby` with sub-second propagation.',
      },
      architecturalRationale:
        'Campus buildings have strict access controls. A 4-digit PIN eliminates mistaken deliveries in high-traffic dorm lobbies without requiring drivers to possess building keycards.',
      tradeoffsConsidered: [
        'Continuous GPS Polling vs Discrete Milestones: Discrete milestones preserve mobile battery life and avoid noisy GPS bounce inside tall campus brick quadrangles.',
      ],
    },
    {
      id: 'exp-3',
      title: 'Relational Schema Design & Campus Zone Foreign Keys',
      targetSymbol: 'schema.sql: orders -> campus_zones',
      fileContext: 'supabase/schema.sql',
      codeSnippet: `CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    host_user_id UUID NOT NULL REFERENCES users(id),
    drop_zone_id UUID NOT NULL REFERENCES campus_zones(id),
    status VARCHAR(32) NOT NULL DEFAULT 'placed',
    split_count INTEGER DEFAULT 1 CHECK (split_count BETWEEN 1 AND 4),
    pickup_pin CHAR(4) NOT NULL
);`,
      explanations: {
        beginner:
          'Every order is locked to a specific approved campus spot (like "North Quad Dorm"). This prevents couriers from wandering randomly across campus and getting lost.',
        intermediate:
          'Using a foreign key constraint (`REFERENCES campus_zones(id)`) ensures referential integrity. An order cannot point to a non-existent drop zone, and SQL constraints enforce valid split counts between 1 and 4 roommates.',
        advanced:
          'By normalizing `campus_zones` instead of storing freeform address text, we can index drop zones spatially using PostGIS and efficiently batch concurrent orders arriving at the same dorm lobby into consolidated courier dispatches.',
      },
      architecturalRationale:
        'A normalized relational design enables efficient batch dispatch algorithms, allowing one courier to deliver 4 orders to the same dorm lobby simultaneously, reducing student delivery fees by up to 60%.',
      tradeoffsConsidered: [
        'Strict Foreign Keys vs Loose Geolocation: Strict drop zones eliminate failed deliveries, though it slightly restricts delivery to predefined campus nodes.',
      ],
    },
  ],
  activeExplainTopicId: 'exp-1',
  concepts: [
    {
      id: 'conc-1',
      title: 'Optimistic UI Updates & Error Rollbacks',
      category: 'State & Reactivity',
      summary:
        'Updating user interface state immediately before the network request finishes, and reverting gracefully if the server returns an error.',
      whyItMatters:
        'In mobile apps with flaky campus Wi-Fi, waiting for the server makes the UI feel sluggish. Optimistic updates make the app feel instant.',
      exampleSnippet: `// 1. Optimistically add item to cart
const prev = getState().cart;
setState({ cart: [...prev, item] });

// 2. Sync with backend
try {
  await api.reserveInventory(item.id);
} catch (err) {
  // 3. Rollback on failure
  setState({ cart: prev });
  showNotification("Could not reserve item");
}`,
      mastered: false,
      quizzes: [
        {
          id: 'q-1',
          question: 'What is the primary benefit of an Optimistic UI update in a mobile app?',
          options: [
            'It eliminates all network requests to the server',
            'It makes the interface feel instantly responsive without waiting for network round-trips',
            'It prevents all possible runtime exceptions in JavaScript',
            'It reduces database storage requirements',
          ],
          correctIndex: 1,
          explanation:
            'Optimistic updates execute the state transition locally right away, providing instantaneous feedback to the user while network synchronization happens asynchronously.',
        },
      ],
    },
    {
      id: 'conc-2',
      title: 'Relational Schema Normalization & Foreign Keys',
      category: 'Data Modeling',
      summary:
        'Structuring database tables to eliminate duplicate data and enforcing integrity relationships between tables using foreign key constraints.',
      whyItMatters:
        'Ensures financial transactions (like split orders) never point to deleted users, invalid dorms, or corrupt totals.',
      exampleSnippet: `CREATE TABLE orders (
  id UUID PRIMARY KEY,
  drop_zone_id UUID REFERENCES campus_zones(id) ON DELETE RESTRICT
);`,
      mastered: true,
      quizzes: [
        {
          id: 'q-2',
          question: 'Why is ON DELETE RESTRICT useful when linking orders to campus delivery zones?',
          options: [
            'It automatically deletes all past orders when a zone is removed',
            'It prevents accidental deletion of a campus zone if historical orders still reference it',
            'It encrypts the zone address for privacy compliance',
            'It speeds up mobile search queries',
          ],
          correctIndex: 1,
          explanation:
            'RESTRICT prevents parent record deletion if dependent child records exist, preserving historical auditing integrity.',
        },
      ],
    },
    {
      id: 'conc-3',
      title: 'Debounced Filtering & Memoization in Mobile Lists',
      category: 'Performance',
      summary:
        'Delaying expensive list computations until user typing has paused, and memoizing derived lists to avoid dropped frames during scrolling.',
      whyItMatters:
        'Large restaurant and menu lists can stutter during search typing on mobile devices if re-filtered on every single keystroke.',
      exampleSnippet: `const memoizedList = useMemo(() => {
  return list.filter(item => item.name.includes(debouncedQuery));
}, [list, debouncedQuery]);`,
      mastered: false,
      quizzes: [
        {
          id: 'q-3',
          question: 'When should you wrap a list filter computation in React.useMemo?',
          options: [
            'On every single simple variable assignment',
            'When the filtering involves non-trivial array iterations or causes visible render frame drops',
            'Only when writing server-side Node.js code',
            'Never, React 19 handles all memoization without code',
          ],
          correctIndex: 1,
          explanation:
            'useMemo should be applied when the computation is non-trivial and dependencies change less frequently than parent component re-renders.',
        },
      ],
    },
    {
      id: 'conc-4',
      title: 'Finite State Machines for Order Lifecycles',
      category: 'Architecture',
      summary:
        'Modeling application processes as a strict set of deterministic states (Placed -> Preparing -> Transit -> Delivered) with defined valid transitions.',
      whyItMatters:
        'Prevents illegal states (e.g., an order being marked Delivered before it was ever Confirmed by the kitchen).',
      exampleSnippet: `type OrderState = 'placed' | 'cooking' | 'in_transit' | 'delivered';
const transitions: Record<OrderState, OrderState[]> = {
  placed: ['cooking', 'cancelled'],
  cooking: ['in_transit'],
  in_transit: ['delivered'],
  delivered: []
};`,
      mastered: false,
      quizzes: [
        {
          id: 'q-4',
          question: 'What is the key advantage of a Finite State Machine in transaction workflows?',
          options: [
            'It makes CSS animations run faster',
            'It prevents invalid and impossible state transitions across asynchronous distributed systems',
            'It replaces the need for a backend database',
            'It converts REST APIs into GraphQL automatically',
          ],
          correctIndex: 1,
          explanation:
            'FSMs guarantee that an entity can only transition between strictly allowable states, preventing race conditions and bugs.',
        },
      ],
    },
  ],
  simulator: {
    activeScreen: 'home',
    selectedCategory: 'All',
    searchQuery: '',
    isVegOnly: false,
    isDarkMode: true,
    cart: [
      {
        id: 'item-101',
        name: 'Quad Deluxe Cheeseburger',
        price: 9.50,
        quantity: 2,
        restaurant: 'Quad Burgers & Fries',
        isVeg: false,
      },
      {
        id: 'item-102',
        name: 'Crispy Garlic Seasoned Fries',
        price: 3.75,
        quantity: 1,
        restaurant: 'Quad Burgers & Fries',
        isVeg: true,
      },
    ],
    orderStatus: 'idle',
    deliveryProgress: 0,
    splitCount: 2,
  },
  isPlanReady: true,
  isBuildReady: true,
  isDebugReady: true,
  isExplainReady: true,
  isLearnReady: true,
};

// Generator for user-entered arbitrary prompts
export function generateProjectFromIdea(rawIdea: string): LunorProject {
  const cleanIdea = rawIdea.trim();
  const title = cleanIdea.length > 30 ? cleanIdea.slice(0, 28) + '...' : cleanIdea;
  const projectName = title.replace(/[^a-zA-Z0-9 ]/g, '').trim() || 'Custom AI App';

  return {
    id: 'proj-' + Date.now(),
    name: projectName,
    tagline: `AI-engineered architecture & prototype for: "${cleanIdea}"`,
    rawIdea: cleanIdea,
    activeStage: 'understand',
    createdAt: 'Just now',
    updatedAt: 'Realtime synced',
    aiStatus: {
      state: 'synced',
      model: 'Lunor-Engineering-v3.8 (Deep Context)',
      contextTokens: 11200,
      latencyMs: 18,
    },
    understanding: {
      problemStatement: `Users seeking a solution for "${cleanIdea}" frequently encounter fragmented workflows, lack of purpose-built mobile tooling, and inefficient manual steps.`,
      solutionVision: `An integrated mobile application delivering streamlined UX, automated data flows, and intelligent assistance specifically tailored for this use-case.`,
      targetAudience: [
        {
          id: 'gen-p1',
          name: 'Primary End-User',
          role: 'Core Consumer / Practitioner',
          avatar: 'PE',
          painPoints: [
            'High cognitive load and repetitive friction in existing workflows',
            'Lack of real-time mobile tracking and instant feedback loops',
          ],
          goals: ['Speed up daily tasks by 10x', 'Clean, intuitive mobile experience without bloat'],
          quote: `"I need a dedicated, focused app that just works without unnecessary complexity."`,
        },
        {
          id: 'gen-p2',
          name: 'Power Administrator',
          role: 'Operations / Coordinator',
          avatar: 'PA',
          painPoints: ['Manual synchronization across disconnected spreadsheets and message threads'],
          goals: ['Centralized dashboard with automated state validation and audit trails'],
          quote: `"Visibility and reliable state synchronization are essential."`,
        },
      ],
      features: [
        {
          id: 'gen-f1',
          title: 'Core Workflow Engine',
          description: `Primary end-to-end user loop configured for ${cleanIdea}.`,
          category: 'Core',
          priority: 'MVP',
          complexity: 'Medium',
        },
        {
          id: 'gen-f2',
          title: 'Instant Filtering & Search',
          description: 'Client-side debounced search with category tagging and preference toggles.',
          category: 'Student Experience',
          priority: 'MVP',
          complexity: 'Low',
        },
        {
          id: 'gen-f3',
          title: 'Real-time State & Notifications',
          description: 'Live asynchronous status updates and milestone confirmations.',
          category: 'Core',
          priority: 'MVP',
          complexity: 'High',
        },
      ],
      userJourneys: [
        {
          step: 1,
          stage: 'Initiation',
          userAction: 'Launches app and sets profile preferences',
          systemAction: 'Configures personalized recommendations and local caching',
          touchpoint: 'Onboarding & Feed',
        },
        {
          step: 2,
          stage: 'Action Execution',
          userAction: 'Executes core workflow action and confirms parameters',
          systemAction: 'Validates inputs, commits optimistic local state, and syncs API',
          touchpoint: 'Action Sheet',
        },
        {
          step: 3,
          stage: 'Confirmation & Tracking',
          userAction: 'Monitors real-time progress and receives delivery/completion confirmation',
          systemAction: 'Sends push notification and updates audit logs',
          touchpoint: 'Live Status Screen',
        },
      ],
      clarifications: [
        {
          id: 'gen-clar-1',
          question: 'Should this application support offline-first local persistence?',
          context: 'Enabling local offline caching ensures seamless usage during network dropouts.',
          options: [
            {
              id: 'gen-opt-1',
              label: 'Yes, Offline-First with SQLite (Recommended)',
              description: 'Cache full state locally and synchronize via CRDT or optimistic queue upon reconnection.',
            },
            {
              id: 'gen-opt-2',
              label: 'Online-Only with Cloud API',
              description: 'Requires active internet connectivity for all transactional queries.',
            },
          ],
          selectedOptionId: 'gen-opt-1',
        },
      ],
      missingRequirements: [
        'Edge case handling for intermittent network connectivity during state synchronization.',
        'Data retention and user export policies for GDPR/CCPA compliance.',
      ],
    },
    plan: {
      screens: [
        {
          id: 'scr-1',
          name: 'Dashboard / Home',
          route: '/home',
          purpose: 'Main overview feed showing active items, actions, and key metrics.',
          components: ['HeroStats', 'SearchFilterBar', 'ActiveItemsList', 'BottomNavBar'],
        },
        {
          id: 'scr-2',
          name: 'Detail & Action View',
          route: '/detail/:id',
          purpose: 'Deep-dive inspection and state mutation interface.',
          components: ['ItemHeader', 'ActionPanel', 'HistoryTimeline'],
        },
        {
          id: 'scr-3',
          name: 'Live Status Monitor',
          route: '/status',
          purpose: 'Real-time progress tracker with milestone alerts.',
          components: ['ProgressTimeline', 'MetricsSummary', 'ActionButtons'],
        },
      ],
      databaseSchema: [
        {
          id: 'tbl-items',
          tableName: 'records',
          description: 'Core application entities and metadata.',
          columns: [
            { name: 'id', type: 'UUID', isPrimary: true },
            { name: 'user_id', type: 'UUID', isForeign: true, references: 'users.id' },
            { name: 'title', type: 'VARCHAR(255)' },
            { name: 'status', type: 'VARCHAR(32)' },
            { name: 'metadata', type: 'JSONB' },
            { name: 'created_at', type: 'TIMESTAMPTZ' },
          ],
        },
        {
          id: 'tbl-users',
          tableName: 'users',
          description: 'Registered users and authorization roles.',
          columns: [
            { name: 'id', type: 'UUID', isPrimary: true },
            { name: 'email', type: 'VARCHAR(255)' },
            { name: 'role', type: 'VARCHAR(32)' },
          ],
        },
      ],
      apiEndpoints: [
        {
          id: 'api-1',
          method: 'GET',
          path: '/api/v1/records',
          summary: 'Fetch active records with optional pagination',
          responseBody: '{\n  "records": [{ "id": "rec-1", "title": "Sample Item", "status": "active" }]\n}',
          status: 200,
        },
        {
          id: 'api-2',
          method: 'POST',
          path: '/api/v1/records',
          summary: 'Create a new record with validation',
          requestBody: '{\n  "title": "New Record",\n  "metadata": {}\n}',
          responseBody: '{\n  "id": "rec-2",\n  "status": "created"\n}',
          status: 201,
        },
      ],
      techStack: [
        {
          id: 'ts-1',
          category: 'Mobile Runtime',
          technology: 'React Native + Expo SDK 52',
          version: '52.0.0',
          tradeoffReasoning: 'Cross-platform native iOS & Android rendering with fast iteration cycles.',
        },
        {
          id: 'ts-2',
          category: 'State Management',
          technology: 'Zustand',
          version: 'v5.0.3',
          tradeoffReasoning: 'Lightweight reactive store for rapid UI state management.',
        },
        {
          id: 'ts-3',
          category: 'Database',
          technology: 'Supabase / PostgreSQL 16',
          version: '16.3',
          tradeoffReasoning: 'Relational ACID guarantees with built-in real-time subscription engine.',
        },
      ],
      architectureNodes: [
        {
          id: 'an-1',
          name: 'Client App',
          layer: 'Client',
          description: 'React Native mobile application on iOS & Android.',
          protocol: 'HTTPS',
        },
        {
          id: 'an-2',
          name: 'API Gateway',
          layer: 'API Gateway',
          description: 'Fastify REST API with JWT authorization.',
          protocol: 'HTTP/2',
        },
        {
          id: 'an-3',
          name: 'Postgres DB',
          layer: 'Persistence',
          description: 'Relational database for ACID transactions.',
          protocol: 'Postgres Wire',
        },
      ],
      tasks: [
        { id: 'tsk-1', title: 'Define data schema & relationships', category: 'Data', status: 'completed', complexity: 'Low' },
        { id: 'tsk-2', title: 'Build interactive mobile UI screens', category: 'Frontend', status: 'completed', complexity: 'Medium' },
        { id: 'tsk-3', title: 'Implement live state store and action handlers', category: 'Frontend', status: 'completed', complexity: 'Medium' },
        { id: 'tsk-4', title: 'Set up real-time websocket synchronization', category: 'Backend', status: 'planned', complexity: 'High' },
      ],
    },
    virtualFiles: [
      {
        id: 'vf-app',
        name: 'App.tsx',
        path: 'src/App.tsx',
        language: 'tsx',
        content: `import React, { useState } from 'react';

export function App() {
  const [items, setItems] = useState<string[]>(['Welcome to ${projectName}']);
  return (
    <div className="flex flex-col h-full bg-zinc-950 text-zinc-100 p-4">
      <h1 className="text-lg font-bold">${projectName}</h1>
      <p className="text-xs text-zinc-400">AI Engineered Prototype</p>
    </div>
  );
}`,
      },
    ],
    activeFileId: 'vf-app',
    modifications: [
      {
        id: 'mod-1',
        prompt: `Generated project from: "${cleanIdea}"`,
        timestamp: 'Just now',
        changesSummary: 'Synthesized understanding specification, architectural plan, and prototype skeleton.',
        affectedFiles: ['src/App.tsx'],
      },
    ],
    debugIssues: generateDynamicDebugIssues([
      {
        id: 'vf-app',
        name: 'App.tsx',
        path: 'src/App.tsx',
        language: 'tsx',
        content: `import React, { useState } from 'react';\n\nexport function App() {\n  const [items, setItems] = useState<string[]>(['Welcome to ${projectName}']);\n  return null;\n}`,
      },
    ], projectName),
    explainTopics: generateDynamicExplainTopics([
      {
        id: 'vf-app',
        name: 'App.tsx',
        path: 'src/App.tsx',
        language: 'tsx',
        content: `import React, { useState } from 'react';\n\nexport function App() {\n  const [items, setItems] = useState<string[]>(['Welcome to ${projectName}']);\n  return null;\n}`,
      },
    ], projectName),
    activeExplainTopicId: 'exp-dyn-1',
    concepts: generateDynamicConcepts(projectName, [
      {
        id: 'gen-f1',
        title: 'Core Workflow Engine',
        description: `Primary loop for ${cleanIdea}.`,
        category: 'Core',
        priority: 'MVP',
        complexity: 'Medium',
      },
    ]),
    simulator: {
      activeScreen: 'home',
      selectedCategory: 'All',
      searchQuery: '',
      isVegOnly: false,
      isDarkMode: true,
      cart: [],
      orderStatus: 'idle',
      deliveryProgress: 0,
      splitCount: 1,
    },
    isPlanReady: true,
    isBuildReady: true,
    isDebugReady: false,
    isExplainReady: false,
    isLearnReady: false,
  };
}
