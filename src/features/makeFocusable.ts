export function makeFocusable(): void {
  const dataTable = document.getElementById('dataTable01');
  const scheduleTable = document.getElementsByClassName('schedule-table')[0];

  const createKeyboardClickHandler = (clickTarget: HTMLElement) => {
    return (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        clickTarget.click();
      }
    };
  };

  for (const i of dataTable?.getElementsByTagName('tr') ?? []) {
    const clickTarget = i.querySelector('[id="content"]:not(:has(a)):not(:has(button))');
    if (clickTarget instanceof HTMLElement) {
      i.tabIndex = 0;
      i.addEventListener('keydown', createKeyboardClickHandler(clickTarget));
    }
  }

  for (const i of scheduleTable?.getElementsByTagName('li') ?? []) {
    i.tabIndex = 0;
    i.addEventListener('keydown', createKeyboardClickHandler(i));
  }
}
