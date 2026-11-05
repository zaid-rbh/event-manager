import { fmt } from './data.js'
export default function EventList({ events, onRegister }) {
  const sorted = [...events].sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))
  return (
    <div className="events-grid">
      {sorted.map((e) => (
        <article className="ev-card" key={e.id}>
          <img src={e.image} alt={e.title} />
          <div className="ev-body">
            <h3>{e.title}</h3>
            <p className="cap">{fmt(e.date)} · {e.time}</p>
            <button className="btn" onClick={() => onRegister(e)}>S'inscrire</button>
          </div>
        </article>
      ))}
    </div>
  )
}
