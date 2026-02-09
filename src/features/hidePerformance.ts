export function hidePerformance(): void {
  const headings = Array.from(document.querySelectorAll('h2'));
  const target = headings.find((h) => h.textContent.trim() === '成績ダッシュボード');
  if (
    target?.nextElementSibling &&
    target.nextElementSibling instanceof HTMLElement &&
    target.nextElementSibling.children[1] instanceof HTMLElement
  ) {
    const button = target.nextElementSibling.children[1];

    if (!button.classList.contains('is-open')) {
      button.click();
    }
  }
}
