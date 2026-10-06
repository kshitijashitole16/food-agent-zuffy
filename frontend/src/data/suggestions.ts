import type { IconName } from '../components/common/Icon';
interface Suggestion {
  icon: IconName;
  title: string;
  subtitle: string;
  prompt: string;
}
export const suggestions: readonly Suggestion[] = [
  {
    icon: 'leaf',
    title: 'Find my next meal',
    subtitle: 'Something veg under ₹200',
    prompt: 'Recommend a vegetarian meal from your menu under ₹200.',
  },
  {
    icon: 'sparkle',
    title: 'Cook with what I have',
    subtitle: 'A quick pantry recipe',
    prompt:
      'I have rice, tomatoes and onions. Suggest an easy vegetarian dinner recipe with steps.',
  },
  {
    icon: 'clock',
    title: 'Where’s my order?',
    subtitle: 'Check my latest delivery',
    prompt: 'What is the status of my latest order?',
  },
  {
    icon: 'history',
    title: 'A little order help',
    subtitle: 'Delivery, fees & refunds',
    prompt: 'How do delivery fees and refunds work in this demo?',
  },
];
