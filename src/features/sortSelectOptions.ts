const collator = new Intl.Collator('ja');

function sort(selectElement: HTMLSelectElement): void {
  const optionsArray = Array.from(selectElement.options);
  optionsArray.sort((a, b) => collator.compare(a.textContent || '', b.textContent || ''));
  selectElement.textContent = '';
  optionsArray.forEach((option) => selectElement.add(option));
}

export function sortSelectOptions(): void {
  const subjectSelect = document.getElementById('changeClassSubjectCmb');
  const startYearSelect = document.getElementById('changeStartYearCmb');
  const startSemesterSelect = document.getElementById('changeStartSemesterCmb');

  if (!(subjectSelect instanceof HTMLSelectElement)) {
    return;
  }

  sort(subjectSelect);

  startYearSelect?.addEventListener('change', () => {
    setTimeout(() => {
      sort(subjectSelect);
    }, 400);
  });

  startSemesterSelect?.addEventListener('change', () => {
    setTimeout(() => {
      sort(subjectSelect);
    }, 400);
  });
}
