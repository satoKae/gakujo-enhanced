import linkifyElement from 'linkify-element';

export function linkifyMessage(): void {
  const th = document.getElementsByTagName('th');
  const contentHeader = Array.from(th).find((h) => h.textContent === '内容');
  const contentContainer = contentHeader?.parentElement;

  if (contentContainer instanceof HTMLElement) {
    linkifyElement(contentContainer);
  }
}
