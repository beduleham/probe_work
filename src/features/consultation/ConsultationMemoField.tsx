'use client';

import { useId, useLayoutEffect, useRef } from 'react';
import { MemoGuideChips } from './MemoGuideChips';
import { findMissingChips, insertTokenAtCursor, type MemoGuideChip } from './memoChips';

interface ConsultationMemoFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export function ConsultationMemoField({ value, onChange }: ConsultationMemoFieldProps) {
  const id = useId();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const pendingCursor = useRef<number | null>(null);

  // 칩 삽입으로 값이 바뀐 직후, 삽입된 토큰 뒤로 커서를 옮긴다.
  useLayoutEffect(() => {
    const el = textareaRef.current;
    if (el && pendingCursor.current !== null) {
      el.focus();
      el.setSelectionRange(pendingCursor.current, pendingCursor.current);
      pendingCursor.current = null;
    }
  }, [value]);

  const handleInsert = (chip: MemoGuideChip) => {
    const el = textareaRef.current;
    const start = el?.selectionStart ?? value.length;
    const end = el?.selectionEnd ?? value.length;
    const result = insertTokenAtCursor(value, start, end, chip.token);
    pendingCursor.current = result.cursor;
    onChange(result.value);
  };

  const missing = findMissingChips(value);

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-slate-800">
        통화 핵심 메모
      </label>
      <MemoGuideChips memo={value} onInsert={handleInsert} />
      <textarea
        id={id}
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={8}
        placeholder="예) [학년] 5학년 [인원] 120명 4반 [프로그램] 드론 코딩 [일자] 3/14 오전"
        className="w-full resize-y rounded-lg border border-slate-300 p-3 text-sm focus:border-brand-600 focus:ring-2 focus:ring-brand-100 focus:outline-none"
      />
      <p aria-live="polite" className="text-xs text-slate-500">
        {missing.length === 0
          ? '필수 항목이 모두 포함되었습니다.'
          : `누락된 항목: ${missing.map((c) => c.token).join(', ')}`}
      </p>
    </div>
  );
}
