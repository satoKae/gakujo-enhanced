const preventScroll: FocusOptions = { preventScroll: true };

export function addKeyboardShortcuts(): void {
  const headerInformation = document.getElementsByClassName('c-header-information')?.[0];
  const headerInformationButton = document.getElementsByClassName('c-header-btn-information')?.[0];
  let focusedOn: undefined | null | Element;

  if (headerInformation instanceof HTMLElement && headerInformationButton instanceof HTMLAnchorElement) {
    document.addEventListener('keyup', (e) => {
      if (e.ctrlKey && !e.altKey && !e.shiftKey && e.code === 'KeyI') {
        if (headerInformation.classList.contains('is-open')) {
          headerInformationButton.click();
          if (focusedOn instanceof HTMLElement) {
            focusedOn.focus(preventScroll);
          }
        } else {
          focusedOn = document.activeElement;
          headerInformationButton.click();
          headerInformationButton.focus(preventScroll);
        }
      }
    });
  }
}
