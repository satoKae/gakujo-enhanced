import { MENU_ICONS } from './constants';
import type { Feature } from './features';

export class MenuManager {
  private _features: Feature[];
  private _menuIds: Record<string, number> = {};

  constructor(features: Feature[]) {
    this._features = features;
  }

  public init(): void {
    this._render();
  }

  private _render(): void {
    this._features.forEach((feature) => {
      const currentState = GM_getValue(feature.key, true);
      const icon = currentState ? MENU_ICONS.ON : MENU_ICONS.OFF;
      const label = `${icon} ${feature.label}`;

      this._menuIds[feature.key] = GM_registerMenuCommand(label, () => this._toggleFeature(feature), {
        id: this._menuIds[feature.key],
        autoClose: false,
      });
    });
  }

  private _toggleFeature(feature: Feature): void {
    const currentState = GM_getValue(feature.key, true);
    const nextState = !currentState;

    GM_setValue(feature.key, nextState);

    this._render();
  }
}
