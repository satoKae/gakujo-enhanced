export function loginAuto(): void {
  const button = document.getElementById('btnSsoStart');
  if (button instanceof HTMLButtonElement) {
    button.click();
  }
}
