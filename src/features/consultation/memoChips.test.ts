import { describe, expect, it } from 'vitest';
import { findMissingChips, insertTokenAtCursor } from './memoChips';

describe('insertTokenAtCursor', () => {
  it('inserts into an empty memo', () => {
    expect(insertTokenAtCursor('', 0, 0, '[학년]')).toEqual({ value: '[학년] ', cursor: 5 });
  });

  it('inserts at the cursor in the middle of text, padding with spaces', () => {
    const r = insertTokenAtCursor('5학년120명', 3, 3, '[인원]');
    expect(r.value).toBe('5학년 [인원] 120명');
    expect(r.cursor).toBe('5학년 [인원] '.length);
  });

  it('does not double spaces when surrounded by whitespace', () => {
    const r = insertTokenAtCursor('a \nb', 2, 2, '[일자]');
    expect(r.value).toBe('a [일자]\nb');
    expect(r.cursor).toBe(6);
  });

  it('replaces the selected range', () => {
    const r = insertTokenAtCursor('희망: XXX 끝', 4, 7, '[프로그램]');
    expect(r.value).toBe('희망: [프로그램] 끝');
  });

  it('clamps out-of-range selections', () => {
    expect(insertTokenAtCursor('abc', 99, 99, '[학년]').value).toBe('abc [학년] ');
  });
});

describe('findMissingChips', () => {
  it('lists the chips not yet in the memo', () => {
    expect(findMissingChips('[학년] 3 [일자] 내일').map((c) => c.token)).toEqual(['[인원]', '[프로그램]']);
  });
});
