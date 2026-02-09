const encoder = new TextEncoder();

interface calendarEvent {
  title: string;
  start: string;
  end: string;
  className: string;
  listType: string;
  dataIndex: number;
}

async function digest(message: string): Promise<string> {
  const msgUint8 = encoder.encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

function formatDateString(s: string): string {
  return s.replaceAll('-', '').replaceAll(':', '');
}

async function handleDownload(event: Event): Promise<void> {
  event.preventDefault();

  const calendarData: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:http://github.com/satokae/gakujo-enhanced',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-TIMEZONE:Asia/Tokyo',
  ];

  const date = new Date();
  const dtstamp = formatDateString(date.toISOString().split('.')[0] || '') + 'Z';

  const scriptElement = Array.from(document.querySelectorAll('script')).find((s) =>
    s.textContent?.includes('カレンダー表示領域取得')
  );

  if (!scriptElement?.textContent) return;

  const events: calendarEvent[] = JSON.parse(
    (scriptElement.textContent.split('events:')[1] || '').split('} ],')[0] + '}]'
  ) satisfies calendarEvent[];

  const data = events
    .filter((e) => e.listType === 'TimeTable')
    .map((e) => {
      const [name, period, room, ...rest] = e.title.split('　');
      return {
        name,
        period,
        room,
        description: rest.join(' '),
        start: e.start,
        end: e.end,
      };
    });

  for (const e of data) {
    calendarData.push(
      'BEGIN:VEVENT',
      `SUMMARY:${e.name}`,
      `LOCATION:${e.room}`,
      `DESCRIPTION:${e.period} ${e.description}`,
      `DTSTART:${formatDateString(e.start)}`,
      `DTEND:${formatDateString(e.end)}`,
      `UID:${await digest(e.start + e.end)}`,
      `DTSTAMP:${dtstamp}`,
      'END:VEVENT'
    );
  }

  calendarData.push('END:VCALENDAR');

  const blob = new Blob([calendarData.join('\r\n')], {
    type: 'text/calendar',
  });
  const url = URL.createObjectURL(blob);
  const datePickerValue = (document.getElementById('datePicker') as HTMLInputElement).value || '';

  const a = document.createElement('a');
  a.href = url;
  a.download = `授業カレンダー${datePickerValue}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function createDownloadButton(): HTMLLIElement {
  const li = document.createElement('li');
  li.className = 'c-heading-btn-item';

  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'c-btn c-btn-line';

  const spanOuter = document.createElement('span');
  spanOuter.className = 'c-btn-link';

  const spanInner = document.createElement('span');
  spanInner.className = 'c-btn-text';
  spanInner.textContent = 'カレンダーをダウンロード';

  spanOuter.appendChild(spanInner);
  button.appendChild(spanOuter);
  li.appendChild(button);

  button.addEventListener('click', handleDownload);

  return li;
}

export function addCalendarDownloadButton(): void {
  const anchorElement = Array.from(document.getElementsByTagName('a')).find((e) => e.textContent === '月間表示');

  if (!(anchorElement instanceof HTMLElement) || !anchorElement.classList.contains('is-active')) {
    return;
  }

  const buttonContainerElement = document.getElementsByClassName('c-heading-btn-items')[0];

  if (buttonContainerElement instanceof HTMLElement) {
    const downloadButton = createDownloadButton();
    buttonContainerElement.appendChild(downloadButton);
  }
}
