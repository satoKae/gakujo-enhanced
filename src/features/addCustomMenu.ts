import { focusSidebar, isInRelatedPage } from '../utils/focusSidebar';

const menuBoldItems: string[] = ['ホーム', '連絡通知', 'スケジュール', '授業参考情報', '課題・アンケート提出'];

export function addCustomMenu(): void {
  const linkElements = Array.from(document.querySelectorAll('.c-gnav-item a:not(.js-accordion-trigger)'));

  const menuElement = document.body.insertAdjacentElement('afterbegin', document.createElement('div'));

  let isMarkerAdded = false;

  if (menuElement === null) {
    return;
  }

  menuElement.classList.add('custom-menu');
  menuElement.id = 'custom-menu';
  linkElements.forEach((e) => {
    if (e instanceof HTMLElement) {
      const button = document.createElement('button');
      button.textContent = e.textContent;
      button.type = 'button';

      if (menuBoldItems.includes(e.textContent)) {
        button.classList.add('custom-menu-bold-text');
      }

      button.addEventListener('click', () => e.click());

      if (!isMarkerAdded && isInRelatedPage(e.textContent)) {
        button.classList.add('custom-menu-marker');
        isMarkerAdded = true;
      }

      menuElement.appendChild(button);
    }
  });
  focusSidebar();
}
