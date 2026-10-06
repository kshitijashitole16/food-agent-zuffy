import { request } from './client';
import type {
  ChatRequest,
  ChatResponse,
  Health,
  MenuItem,
  Order,
  OrderRequest,
} from '../types/api';

export const zuffyApi = {
  getHealth: () => request<Health>('/health', { timeout: 10_000 }),
  getMenu: () => request<MenuItem[]>('/menu', { timeout: 10_000 }),
  getOrders: (sessionId: string) =>
    request<Order[]>(`/orders?sessionId=${encodeURIComponent(sessionId)}`),
  chat: (body: ChatRequest) =>
    request<ChatResponse>('/chat', {
      method: 'POST',
      body: JSON.stringify(body),
    }),
  createOrder: (body: OrderRequest) =>
    request<Order>('/orders', {
      method: 'POST',
      body: JSON.stringify(body),
    }),
};
