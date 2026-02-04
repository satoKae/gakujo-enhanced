export function loginAuto(): void {
  if (document.title !== 'ログイン') {
    return;
  }
  const button = document.getElementById('btnSsoStart');
  if (button instanceof HTMLButtonElement) {
    button.click();
  }
}
