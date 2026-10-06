import type { Cart, ChatMessage, Diet, MenuItem } from '../types/api';

export const DIETS: readonly Diet[] = ['All', 'Vegetarian', 'Vegan', 'Non-Vegetarian'];
export const isDiet = (value: unknown): value is Diet =>
  typeof value === 'string' && DIETS.some((diet) => diet === value);

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

const isStrings = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((item) => typeof item === 'string');

function isMenuItem(value: unknown): value is MenuItem {
  if (!isObject(value)) return false;
  return (
    ['id', 'name', 'description', 'category', 'emoji', 'color', 'tag'].every(
      (key) => typeof value[key] === 'string',
    ) &&
    isDiet(value.diet) &&
    value.diet !== 'All' &&
    ['price', 'minutes', 'rating'].every(
      (key) => typeof value[key] === 'number' && Number.isFinite(value[key]),
    ) &&
    isStrings(value.ingredients) &&
    isStrings(value.allergens)
  );
}

export function readSaved(key: string): unknown {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? undefined : JSON.parse(raw);
  } catch {
    return undefined;
  }
}

export function save(key: string, value: unknown): void {
  // The app remains usable when browser storage is blocked or full.
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* Optional persistence. */
  }
}

export function readCart(): Cart {
  const saved = readSaved('zuffy-cart');
  if (!isObject(saved)) return {};
  return Object.fromEntries(
    Object.entries(saved).filter(
      (entry): entry is [string, number] =>
        typeof entry[1] === 'number' &&
        Number.isInteger(entry[1]) &&
        entry[1] > 0 &&
        entry[1] <= 10,
    ),
  );
}

export function readChat(): ChatMessage[] {
  const saved = readSaved('zuffy-chat');
  if (!Array.isArray(saved)) return [];
  const messages: ChatMessage[] = [];
  for (const value of saved) {
    if (
      !isObject(value) ||
      !['user', 'assistant'].includes(String(value.role)) ||
      typeof value.content !== 'string'
    )
      continue;
    messages.push({
      id: typeof value.id === 'string' ? value.id : crypto.randomUUID(),
      role: value.role === 'user' ? 'user' : 'assistant',
      content: value.content.slice(0, 4000),
      localOnly: value.localOnly === true,
      toolsUsed: isStrings(value.toolsUsed) ? value.toolsUsed : [],
      recommendations: Array.isArray(value.recommendations)
        ? value.recommendations.filter(isMenuItem)
        : [],
    });
  }
  return messages.slice(-24);
}
