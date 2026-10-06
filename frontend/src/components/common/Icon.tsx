import type { ReactNode, SVGProps } from 'react';
export type IconName =
  | 'sparkle'
  | 'bag'
  | 'search'
  | 'arrow'
  | 'send'
  | 'plus'
  | 'minus'
  | 'close'
  | 'clock'
  | 'check'
  | 'leaf'
  | 'history'
  | 'refresh';
interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number;
}
export default function Icon({ name, size = 20, ...props }: IconProps) {
  const paths: Record<IconName, ReactNode> = {
    sparkle: (
      <>
        <path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5Z" />
        <path d="m20 2 .7 1.8L22.5 4l-1.8.7L20 6.5l-.7-1.8L17.5 4l1.8-.2Z" />
      </>
    ),
    bag: (
      <>
        <path d="M5 7h14l1 14H4L5 7Z" />
        <path d="M8 7V6a4 4 0 0 1 8 0v1" />
      </>
    ),
    search: (
      <>
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="m16 16 4.5 4.5" />
      </>
    ),
    arrow: (
      <>
        <path d="M5 12h14m-5-5 5 5-5 5" />
      </>
    ),
    send: (
      <>
        <path d="m4 4 17 8-17 8 3-8-3-8Zm3 8h14" />
      </>
    ),
    plus: <path d="M12 5v14M5 12h14" />,
    minus: <path d="M5 12h14" />,
    close: <path d="m6 6 12 12M6 18 18 6" />,
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    leaf: (
      <>
        <path d="M5 19c-4-8 2-14 15-15 0 12-6 18-13 14" />
        <path d="m5 20 10-10" />
      </>
    ),
    history: (
      <>
        <path d="M3 10a9 9 0 1 1 1.8 8M3 4v6h6" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    refresh: (
      <>
        <path d="M20 7A8.5 8.5 0 0 0 5 5l-2 3m0-5v5h5M4 17a8.5 8.5 0 0 0 15 2l2-3m0 5v-5h-5" />
      </>
    ),
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name] || paths.sparkle}
    </svg>
  );
}
