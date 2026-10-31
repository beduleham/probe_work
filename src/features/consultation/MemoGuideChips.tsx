'use client';

import { Check, Plus } from 'lucide-react';
import { cn } from '@/lib/cn';
import { MEMO_GUIDE_CHIPS, type MemoGuideChip } from './memoChips';

interface MemoGuideChipsProps {
  memo: string;
  onInsert: (chip: MemoGuideChip) => void;
}

export function MemoGuideChips({ memo, onInsert }: MemoGuideChipsProps) {
  return (
    <div role="toolbar" aria-label="메모 입력 가이드" className="flex flex-wrap gap-2">
      {MEMO_GUIDE_CHIPS.map((chip) => {
        const used = memo.includes(chip.token);
        return (
          <button
            key={chip.id}
            type="button"
            // mousedown 기본 동작을 막아 텍스트 입력창의 포커스·커서 위치를 유지한다.
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => onInsert(chip)}
            aria-label={`${chip.token} 삽입`}
            className={cn(
              'flex min-h-11 items-center gap-1 rounded-full border px-3 text-sm font-medium transition-colors',
              used
                ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                : 'border-brand-100 bg-brand-50 text-brand-700 hover:bg-brand-100',
            )}
          >
            {used ? <Check className="size-4" aria-hidden="true" /> : <Plus className="size-4" aria-hidden="true" />}
            {chip.token}
          </button>
        );
      })}
    </div>
  );
}
