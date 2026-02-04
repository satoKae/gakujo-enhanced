import { addCalendarDownloadButton } from './addCalendarDownloadButton';
import { addCustomMenu } from './addCustomMenu';
import { changeSelectValue } from './changeSelectValue';
import { hidePerformance } from './hidePerformance';
import { loginAuto } from './loginAuto';
import { sortSelectOptions } from './sortSelectOptions';

import customMenuStyle from './styles/customMenu.css';
import theme from './styles/theme.css';

GM.addStyle(theme);
GM.addStyle(customMenuStyle);

window.addEventListener('load', () => {
  loginAuto();
  hidePerformance();
  addCalendarDownloadButton();
  addCustomMenu();
  sortSelectOptions();
  changeSelectValue();
});
