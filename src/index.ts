import { addCalendarDownloadButton } from './features/addCalendarDownloadButton';
import { addCustomMenu } from './features/addCustomMenu';
import { changeSelectValue } from './features/changeSelectValue';
import { hidePerformance } from './features/hidePerformance';
import { loginAuto } from './features/loginAuto';
import { sortSelectOptions } from './features/sortSelectOptions';

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
