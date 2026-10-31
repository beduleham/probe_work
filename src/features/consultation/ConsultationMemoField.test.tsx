import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, it } from 'vitest';
import { ConsultationMemoField } from './ConsultationMemoField';

function Harness({ initial = '' }: { initial?: string }) {
  const [v, setV] = useState(initial);
  return <ConsultationMemoField value={v} onChange={setV} />;
}

describe('ConsultationMemoField', () => {
  it('renders the four guide chips', () => {
    render(<Harness />);
    for (const t of ['[학년]', '[인원]', '[프로그램]', '[일자]']) {
      expect(screen.getByRole('button', { name: `${t} 삽입` })).toBeInTheDocument();
    }
  });

  it('inserts the chip token at the caret position and keeps the caret after it', async () => {
    const user = userEvent.setup();
    render(<Harness initial="5학년 120명" />);
    const textarea = screen.getByRole('textbox', { name: '통화 핵심 메모' }) as HTMLTextAreaElement;
    textarea.focus();
    textarea.setSelectionRange(4, 4); // "5학년 |120명"
    await user.click(screen.getByRole('button', { name: '[인원] 삽입' }));
    expect(textarea.value).toBe('5학년 [인원] 120명');
    expect(textarea.selectionStart).toBe('5학년 [인원] '.length);
    expect(document.activeElement).toBe(textarea);

    await user.keyboard('4반');
    expect(textarea.value).toBe('5학년 [인원] 4반120명');
  });

  it('updates the missing-items hint', async () => {
    const user = userEvent.setup();
    render(<Harness />);
    expect(screen.getByText(/누락된 항목: \[학년\], \[인원\], \[프로그램\], \[일자\]/)).toBeInTheDocument();
    for (const t of ['[학년]', '[인원]', '[프로그램]', '[일자]']) {
      await user.click(screen.getByRole('button', { name: `${t} 삽입` }));
    }
    expect(screen.getByText('필수 항목이 모두 포함되었습니다.')).toBeInTheDocument();
  });
});
