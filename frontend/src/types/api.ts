/** These interfaces match the records returned by the Spring Boot API. */
export type Diet = 'All' | 'Vegetarian' | 'Vegan' | 'Non-Vegetarian';
export type Tab = 'assistant' | 'menu' | 'orders';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: string;
  diet: Exclude<Diet, 'All'>;
  price: number;
  minutes: number;
  rating: number;
  emoji: string;
  color: string;
  ingredients: string[];
  allergens: string[];
  tag: string;
}

export interface Preferences {
  diet: Diet;
  avoid: string;
}

export interface HistoryMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatRequest {
  message: string;
  sessionId: string;
  history: HistoryMessage[];
  preferences: Preferences;
  ingredients?: string[];
}

export interface ChatResponse {
  reply: string;
  sessionId: string;
  model: string;
  toolsUsed: string[];
  recommendations: MenuItem[];
}

export interface ChatMessage extends HistoryMessage {
  id: string;
  toolsUsed?: string[];
  recommendations?: MenuItem[];
  /** Pending/failed messages are displayed but excluded from model history. */
  localOnly?: boolean;
}

export interface Health {
  status: string;
  ollama: 'ready' | 'offline' | 'model_missing';
  model: string;
  message: string;
}

export interface OrderLineRequest {
  itemId: string;
  quantity: number;
}

export interface OrderRequest {
  sessionId: string;
  items: OrderLineRequest[];
}

export interface OrderLine extends OrderLineRequest {
  name: string;
  emoji: string;
  price: number;
}

export type OrderStatus = 'Preparing' | 'On the way' | 'Delivered';

export interface Order {
  id: string;
  items: OrderLine[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  estimatedMinutes: number;
  createdAt: string;
  demo: boolean;
}

export interface CartLine extends MenuItem {
  quantity: number;
}

export type Cart = Record<string, number>;
