import { navState } from '@/test/navigationMock';
import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { useAppShellStore } from '@/stores/useAppShellStore';
import { Header } from './Header';
import { MobileNav } from './MobileNav';
import { Sidebar } from './Sidebar';

beforeEach(() => {
  navState.pathname = '/calendar';
  act(() => {
    useAppShellStore.setState({ isMobileNavOpen: false, isSidebarCollapsed: false, isQuickConsultationOpen: false });
  });
});

describe('Sidebar', () => {
  it('renders the four main routes with correct hrefs', () => {
    render(<Sidebar />);
    const nav = screen.getByRole('navigation', { name: '주요 메뉴' });
    const hrefs = within(nav).getAllByRole('link').map((a) => a.getAttribute('href'));
    expect(hrefs).toEqual(['/calendar', '/schools', '/plans', '/resources']);
  });

  it('marks the active route with aria-current="page"', () => {
    navState.pathname = '/schools/123';
    render(<Sidebar />);
    expect(screen.getByRole('link', { name: '학교 이력 관리' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: '자원 캘린더' })).not.toHaveAttribute('aria-current');
  });
});

describe('Header', () => {
  it('shows current title, quick consultation CTA and the user profile with role tag', () => {
    navState.pathname = '/plans';
    render(<Header />);
    expect(screen.getByRole('heading', { name: '교육 계획안' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /빠른 상담/ })).toBeInTheDocument();
    expect(screen.getByText('홍길동')).toBeInTheDocument();
    expect(screen.getByText('상담 직원')).toBeInTheDocument();
  });

  it('opens the quick consultation flag when the CTA is clicked', async () => {
    render(<Header />);
    await userEvent.click(screen.getByRole('button', { name: /빠른 상담/ }));
    expect(useAppShellStore.getState().isQuickConsultationOpen).toBe(true);
  });
});

describe('MobileNav', () => {
  it('opens from the hamburger and closes after a link is tapped', async () => {
    render(
      <>
        <Header />
        <MobileNav />
      </>,
    );
    expect(screen.queryByRole('navigation', { name: '모바일 메뉴' })).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: '메뉴 열기' }));
    const drawer = screen.getByRole('navigation', { name: '모바일 메뉴' });
    // jsdom does not navigate; prevent the default anchor behaviour warning by clicking the link only.
    await userEvent.click(within(drawer).getByRole('link', { name: '교구·차량 자원' }));
    expect(useAppShellStore.getState().isMobileNavOpen).toBe(false);
    expect(screen.queryByRole('navigation', { name: '모바일 메뉴' })).not.toBeInTheDocument();
  });
});
