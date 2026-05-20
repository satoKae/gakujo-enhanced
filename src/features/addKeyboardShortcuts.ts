import { focusSidebar } from '../utils/focusSidebar';

const preventScroll: FocusOptions = { preventScroll: true };

const focusableSelector = ['a[href]', 'input:not([type=hidden])', 'select', 'button', 'textarea']
  .map((s) => s + ':not([disabled])')
  .join(',');

export function addKeyboardShortcuts(): void {
  const headerInformation = document.getElementsByClassName('c-header-information')?.[0];
  const headerInformationButton = document.getElementsByClassName('c-header-btn-information')?.[0];
  const mainElement = document.getElementsByTagName('main')?.[0];
  let focusedOn: undefined | null | Element;

  // Ctrl + I
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

  // [, ]
  document.addEventListener('keyup', (e) => {
    if (isTextInputActive() || e.ctrlKey || e.altKey || e.shiftKey) {
      return;
    }

    if (e.code === 'BracketRight') {
      focusSidebar();
    } else if (e.code === 'Backslash') {
      const focusableElement = mainElement?.querySelector(focusableSelector);
      if (focusableElement instanceof HTMLElement) {
        focusableElement.focus();
      }
    }
  });
}

function isTextInputActive(): boolean {
  const activeElement = document.activeElement;
  if (activeElement instanceof HTMLTextAreaElement) {
    return true;
  }

  if (activeElement instanceof HTMLInputElement) {
    return !['button', 'checkbox', 'color', 'file', 'image', 'radio', 'range', 'reset', 'submit', 'hidden'].includes(
      activeElement.type
    );
  }

  return activeElement instanceof HTMLElement && activeElement.isContentEditable;
}
