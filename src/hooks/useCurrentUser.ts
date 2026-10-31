import type { UserSessionContext } from '@/types/navigation';

/**
 * 임시 Mock 세션. 사내 OAuth(SSO) 연동 태스크에서 실제 세션 조회로 교체한다.
 */
export const MOCK_CURRENT_USER: UserSessionContext = {
  id: 'mock-user-1',
  name: '홍길동',
  role: 'STAFF',
  email: 'probe@probe.internal',
};

export function useCurrentUser(): { user: UserSessionContext; isLoading: false } {
  return { user: MOCK_CURRENT_USER, isLoading: false };
}

export const ROLE_LABELS: Record<UserSessionContext['role'], string> = {
  STAFF: '상담 직원',
  ADMIN: '관리자',
};
