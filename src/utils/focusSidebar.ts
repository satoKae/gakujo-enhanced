const segmenter = new Intl.Segmenter('ja-JP', { granularity: 'word' });

export function focusSidebar(): void {
  const customMenu = document.getElementById('custom-menu');
  if (!(customMenu instanceof HTMLElement)) {
    return;
  }

  for (const menuItem of customMenu.children) {
    if (isInRelatedPage(menuItem.textContent) && menuItem instanceof HTMLElement) {
      menuItem.focus();
    }
  }
}

function isInRelatedPage(checkString: string): boolean {
  switch (document.title) {
    case 'ホーム画面（学生・保護者）':
      return checkString === 'ホーム';

    case '単位修得情報':
      return checkString === '成績ダッシュボード';
  }

  const segments = Array.from(segmenter.segment(checkString))
    .map((s) => s.segment)
    .filter((s) => 1 < s.length)
    .filter((s) => !['情報', '学内', '授業', '履修'].includes(s));

  return segments.some((s) => document.title.includes(s));
}
