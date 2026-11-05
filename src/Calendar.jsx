import { useState } from 'react'
import Icon from './Icon.jsx'
import { cover } from './data.js'

const DAYS = ['L', 'M', 'Me', 'J', 'V', 'S', 'D']
const MONTHS = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
const pad = (n) => String(n).padStart(2, '0')

export default function Calendar({ events, query, onAdd }) {
  const today = new Date()
  const [y, setY] = useState(today.getFullYear())
  const [m, setM] = useState(today.getMonth())
  const [sel, setSel] = useState(`${y}-${pad(m + 1)}-${pad(today.getDate())}`)
  const [planning, setPlanning] = useState(false)
  const [form, setForm] = useState({ title: '', time: '09:00', image: null })

  const offset = (new Date(y, m, 1).getDay() + 6) % 7
  const total = new Date(y, m + 1, 0).getDate()
  const cells = [...Array(offset).fill(null), ...Array.from({ length: total }, (_, i) => i + 1)]
  while (cells.length % 7) cells.push(null)

  const key = (d) => `${y}-${pad(m + 1)}-${pad(d)}`
  const on = (date) => events.filter((e) => e.date === date).sort((a, b) => a.time.localeCompare(b.time))
  const q = query.trim().toLowerCase()
  const matches = (d) => q && on(key(d)).some((e) => e.title.toLowerCase().includes(q))
  const move = (d) => { const nd = new Date(y, m + d, 1); setY(nd.getFullYear()); setM(nd.getMonth()) }
  const pick = (k) => { setSel(k); setPlanning(false) }

  const [sy, sm, sd] = sel.split('-')
  const tasks = on(sel)

  const submit = (e) => {
    e.preventDefault()
    if (!form.title.trim()) return
    onAdd({ id: Date.now(), title: form.title.trim(), date: sel, time: form.time, image: form.image || cover(form.title, events.length) })
    setForm({ title: '', time: '09:00', image: null })
    setPlanning(false)
  }

  return (
    <section>
      <h2 className="title">Calendrier</h2>
      <p className="sub">Cliquez sur un jour pour voir les tâches ou planifier un nouvel événement</p>
      <div className="cal-layout">
        <div className="card">
          <div className="cal-head">
            <button className="icon-btn sm" onClick={() => move(-1)} aria-label="Mois précédent"><Icon name="left" size={16} /></button>
            <h3>{MONTHS[m]} {y}</h3>
            <button className="icon-btn sm" onClick={() => move(1)} aria-label="Mois suivant"><Icon name="right" size={16} /></button>
          </div>
          <div className="cal-grid">
            {DAYS.map((d) => <div key={d} className="cal-dow">{d}</div>)}
            {cells.map((d, i) => d === null ? <div key={i} className="cal-cell empty" /> : (
              <button key={i} onClick={() => pick(key(d))}
                className={'cal-cell' + (sel === key(d) ? ' selected' : '') + (matches(d) ? ' match' : '')}>
                {d}{on(key(d)).length > 0 && <span className="dot" />}
              </button>
            ))}
          </div>
        </div>

        <aside className="card info">
          <h3>Info</h3>
          <p className="info-date">{sd}/{sm}/{sy}</p>
          {tasks.length === 0 ? <p className="cap">Aucun événement prévu ce jour.</p> : (
            <ul className="tasks">{tasks.map((t) => <li key={t.id}><time>{t.time}</time><span>{t.title}</span></li>)}</ul>
          )}
          {!planning ? (
            <button className="btn" onClick={() => setPlanning(true)}>Planifier un événement</button>
          ) : (
            <form className="form flat plan" onSubmit={submit}>
              <label className="field"><span>Titre :</span>
                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} autoFocus required /></label>
              <label className="field"><span>Heure :</span>
                <input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} required /></label>
              <label className="field"><span>Image (facultatif) :</span>
                <input type="file" accept="image/*" onChange={(e) => e.target.files[0] && setForm({ ...form, image: URL.createObjectURL(e.target.files[0]) })} /></label>
              <div className="row">
                <button className="btn" type="submit">Planifier</button>
                <button className="btn ghost" type="button" onClick={() => setPlanning(false)}>Annuler</button>
              </div>
            </form>
          )}
        </aside>
      </div>
    </section>
  )
}
