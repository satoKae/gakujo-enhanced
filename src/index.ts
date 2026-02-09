import { features } from './features';
import { MenuManager } from './MenuManager';

const menu = new MenuManager(features);
menu.init();

window.addEventListener('load', () => {
  const currentTitle = document.title;
  for (const feature of features) {
    if (
      !feature.matchTitle.some((title) =>
        typeof title === 'string' ? currentTitle === title : title.test(currentTitle)
      )
    ) {
      continue;
    }
    if (!GM_getValue(feature.key, true)) {
      continue;
    }

    if (feature.style) {
      GM.addStyle(feature.style);
    }
    if (feature.func) {
      feature.func();
    }
  }
});
