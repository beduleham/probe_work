import { vi } from 'vitest';

export const navState = { pathname: '/calendar' };
export const pushMock = vi.fn();

vi.mock('next/navigation', () => ({
  usePathname: () => navState.pathname,
  useRouter: () => ({ push: pushMock, replace: vi.fn(), prefetch: vi.fn(), back: vi.fn() }),
  redirect: vi.fn(),
}));
