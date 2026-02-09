import { addCalendarDownloadButton } from './features/addCalendarDownloadButton';
import { addCustomMenu } from './features/addCustomMenu';
import { changeSelectValue } from './features/changeSelectValue';
import { hidePerformance } from './features/hidePerformance';
import { loginAuto } from './features/loginAuto';
import { sortSelectOptions } from './features/sortSelectOptions';

import customMenuStyle from './styles/customMenu.css';
import theme from './styles/theme.css';

export interface Feature {
  label: string;
  key: string;
  matchTitle: (string | RegExp)[];
  style?: string;
  func?: () => void;
}

export const features: Feature[] = [
  {
    label: '自動ログイン',
    key: 'feature_login_auto',
    matchTitle: ['ログイン'],
    func: loginAuto,
  },
  {
    label: '成績ダッシュボードを隠す',
    key: 'feature_hide_performance',
    matchTitle: ['ホーム画面（学生・保護者）'],
    func: hidePerformance,
  },
  {
    label: 'カレンダーダウンロードボタンを追加',
    key: 'feature_add_calendar_download_button',
    matchTitle: ['スケジュール'],
    func: addCalendarDownloadButton,
  },
  {
    label: '授業参考情報の選択肢をソート',
    key: 'feature_sort_select_options',
    matchTitle: ['授業参考情報一覧'],
    func: sortSelectOptions,
  },
  {
    label: '連絡一覧の表示件数を変更',
    key: 'feature_change_select_value',
    matchTitle: ['連絡一覧'],
    func: changeSelectValue,
  },
  {
    label: 'サイドバーの追加',
    key: 'feature_add_custom_menu',
    matchTitle: [/^.*$/],
    func: addCustomMenu,
    style: customMenuStyle,
  },
  {
    label: 'カスタムテーマ',
    key: 'feature_theme',
    matchTitle: [/^.*$/],
    style: theme,
  },
];
