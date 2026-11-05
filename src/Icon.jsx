const P = {
  home: 'M3 11l9-8 9 8M5 10v10h14V10',
  list: 'M4 7h16M4 12h16M4 17h10',
  cal: 'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4',
  doc: 'M6 3h12v18H6zM9 8h6M9 12h6M9 16h4',
  bars: 'M6 20V12M12 20V5M18 20v-6',
  chat: 'M4 5h16v11H9l-5 4z',
  gear: 'M12 9a3 3 0 100 6 3 3 0 000-6zM12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2',
  search: 'M11 4a7 7 0 100 14 7 7 0 000-14zM21 21l-5-5',
  user: 'M12 4a4 4 0 100 8 4 4 0 000-8zM4 21c0-4 4-6 8-6s8 2 8 6',
  left: 'M15 5l-7 7 7 7',
  right: 'M9 5l7 7-7 7',
}
export default function Icon({ name, size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={P[name]} />
    </svg>
  )
}
