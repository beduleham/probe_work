'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { useState } from 'react';
import { useAppShellStore } from '@/stores/useAppShellStore';
import { ConsultationMemoField } from './ConsultationMemoField';

/**
 * 빠른 상담 등록 모달 (최소 버전).
 * 현재는 메모 입력 + 가이드 칩만 제공한다. 학생/학급 수, 교사 연락처 입력과
 * 캘린더 등록·교구 차감 저장은 예약/트랜잭션 엔진 태스크에서 연결한다.
 */
export function QuickConsultationDialog() {
  const open = useAppShellStore((s) => s.isQuickConsultationOpen);
  const setOpen = useAppShellStore((s) => s.setQuickConsultationOpen);
  const [memo, setMemo] = useState('');

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-slate-900/40" />
        <Dialog.Content className="fixed inset-x-0 bottom-0 z-50 max-h-[90dvh] overflow-y-auto rounded-t-2xl bg-white p-4 shadow-xl sm:inset-auto sm:top-1/2 sm:left-1/2 sm:w-full sm:max-w-lg sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-2xl sm:p-6">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <Dialog.Title className="text-lg font-semibold text-slate-900">빠른 상담 등록</Dialog.Title>
              <Dialog.Description className="mt-1 text-sm text-slate-600">
                가이드 칩을 눌러 필수 항목을 커서 위치에 바로 넣을 수 있습니다.
              </Dialog.Description>
            </div>
            <Dialog.Close
              aria-label="닫기"
              className="flex size-11 shrink-0 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"
            >
              <X className="size-5" />
            </Dialog.Close>
          </div>
          <ConsultationMemoField value={memo} onChange={setMemo} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
