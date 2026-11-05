// Image de couverture générée (remplaçable par une vraie photo : image: '/events/mon-image.jpg' dans /public/events)
const PALETTE = [['#4f46e5', '#818cf8'], ['#0f9d88', '#5eead4'], ['#d97706', '#fbbf24'], ['#be185d', '#f472b6'], ['#0369a1', '#38bdf8']]
export const cover = (title, i = 0) => {
  const [a, b] = PALETTE[i % PALETTE.length]
  const ini = title.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join('')
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 340"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="600" height="340" fill="url(#g)"/><circle cx="500" cy="60" r="120" fill="#fff" opacity=".12"/><circle cx="90" cy="320" r="150" fill="#fff" opacity=".1"/><text x="40" y="215" font-family="Arial,sans-serif" font-size="120" font-weight="700" fill="#fff">${ini}</text></svg>`
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg)
}
export const SEED = [
  { id: 1, title: 'Atelier DevOps', date: '2026-11-10', time: '10:00' },
  { id: 2, title: 'Conférence Cloud Computing', date: '2026-11-18', time: '09:30' },
  { id: 3, title: 'Atelier React', date: '2026-11-25', time: '14:00' },
  { id: 4, title: 'Atelier Kubernetes', date: '2026-12-03', time: '09:00' },
  { id: 5, title: 'Conférence Cybersécurité', date: '2026-12-10', time: '11:00' },
].map((e, i) => ({ ...e, image: cover(e.title, i) }))
export const fmt = (d) => d.split('-').reverse().join('/')
export const DEMO = { email: 'organisateur@gmail.com', password: 'admin123' }
