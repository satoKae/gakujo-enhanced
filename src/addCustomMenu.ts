const menuBoldItems: string[] = ['ホーム', '連絡通知', 'スケジュール', '授業参考情報', '課題・アンケート提出'];

export function addCustomMenu(): void {
  const linkElements = Array.from(document.querySelectorAll('.c-gnav-item a:not(.js-accordion-trigger)'));

  const menuElement = document.body.insertAdjacentElement('afterbegin', document.createElement('div'));

  if (menuElement === null) {
    return;
  }

  menuElement.classList.add('custom-menu');
  linkElements.forEach((e) => {
    if (e instanceof HTMLElement) {
      const button = document.createElement('button');
      button.textContent = e.textContent;
      button.type = 'button';

      if (menuBoldItems.includes(e.textContent)) {
        button.classList.add('custom-menu-bold-text');
      }

      button.addEventListener('click', () => e.click());

      menuElement.appendChild(button);
    }
  });
}
