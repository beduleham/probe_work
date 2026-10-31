export interface MemoGuideChip {
  id: 'grade' | 'headcount' | 'program' | 'date';
  label: string;
  /** 메모 본문에 삽입되는 표준 토큰. LLM 파싱 시 키로 사용된다. */
  token: string;
}

export const MEMO_GUIDE_CHIPS: readonly MemoGuideChip[] = [
  { id: 'grade', label: '학년', token: '[학년]' },
  { id: 'headcount', label: '인원', token: '[인원]' },
  { id: 'program', label: '프로그램', token: '[프로그램]' },
  { id: 'date', label: '일자', token: '[일자]' },
];

export interface InsertResult {
  value: string;
  /** 삽입 직후 커서 위치 */
  cursor: number;
}

/**
 * 현재 선택 영역(selectionStart~selectionEnd)을 `token + ' '`으로 치환한다.
 * 앞 글자가 공백/줄바꿈이 아니면 토큰이 단어에 붙지 않도록 공백을 하나 덧붙인다.
 */
export function insertTokenAtCursor(
  value: string,
  selectionStart: number,
  selectionEnd: number,
  token: string,
): InsertResult {
  const start = Math.max(0, Math.min(selectionStart, value.length));
  const end = Math.max(start, Math.min(selectionEnd, value.length));
  const before = value.slice(0, start);
  const after = value.slice(end);
  const needsLeadingSpace = before.length > 0 && !/\s$/.test(before);
  const needsTrailingSpace = !/^\s/.test(after);
  const inserted = `${needsLeadingSpace ? ' ' : ''}${token}${needsTrailingSpace ? ' ' : ''}`;
  return { value: before + inserted + after, cursor: before.length + inserted.length };
}

/** 메모에 아직 포함되지 않은 필수 가이드 칩 목록 */
export function findMissingChips(value: string): MemoGuideChip[] {
  return MEMO_GUIDE_CHIPS.filter((chip) => !value.includes(chip.token));
}
