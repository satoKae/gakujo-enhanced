export function changeSelectValue(): void {
  if (document.title === '連絡一覧') {
    const select = document.getElementsByName('dataTable01_length')[0];
    if (select instanceof HTMLSelectElement) {
      select.value = '50';
      select.dispatchEvent(new Event('change'));
    }
  }
}
