import { useState } from 'react'
import Modal from './Modal.jsx'
import { fmt } from './data.js'

const EMPTY = { nom: '', prenom: '', profile: '', gmail: '', tel: '+212' }

export default function RegisterForm({ event, onClose }) {
  const [f, setF] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [ticket, setTicket] = useState(null)
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })

  const submit = (ev) => {
    ev.preventDefault()
    const e = {}
    if (!f.nom.trim()) e.nom = 'Saisissez votre nom.'
    if (!f.prenom.trim()) e.prenom = 'Saisissez votre prénom.'
    if (!f.profile.trim()) e.profile = 'Indiquez votre profil.'
    if (!/^[^\s@]+@gmail\.com$/i.test(f.gmail)) e.gmail = 'Saisissez une adresse @gmail.com valide.'
    if (!/^\+212[5-7]\d{8}$/.test(f.tel.replace(/[\s-]/g, ''))) e.tel = 'Format attendu : +212 6XXXXXXXX.'
    setErrors(e)
    if (!Object.keys(e).length) setTicket({ ...f, code: 'TKT-' + Math.random().toString(36).slice(2, 8).toUpperCase() })
  }

  const Field = ({ k, label, ...p }) => (
    <label className="field">
      <span>{label} :</span>
      <input value={f[k]} onChange={set(k)} aria-invalid={!!errors[k]} {...p} />
      {errors[k] && <em>{errors[k]}</em>}
    </label>
  )

  return (
    <Modal onClose={onClose}>
      <div className="banner">
        <img src={event.image} alt={event.title} />
        <div><h2 className="title sm">{event.title}</h2><p className="cap">{fmt(event.date)} · {event.time}</p></div>
      </div>
      {ticket ? (
        <div className="ticket">
          <p className="sub">Inscription confirmée. Présentez ce ticket à l'entrée.</p>
          <p><strong>{ticket.prenom} {ticket.nom}</strong> · {ticket.profile}</p>
          <p className="cap">{ticket.gmail} · {ticket.tel}</p>
          <p className="code">{ticket.code}</p>
          <button className="btn" onClick={onClose}>Fermer</button>
        </div>
      ) : (
        <form className="form flat" onSubmit={submit} noValidate>
          {Field({ k: 'nom', label: 'Nom' })}
          {Field({ k: 'prenom', label: 'Prénom' })}
          {Field({ k: 'profile', label: 'Profile' })}
          {Field({ k: 'gmail', label: 'Gmail', type: 'email', placeholder: '@gmail.com' })}
          {Field({ k: 'tel', label: 'N° téléphone', type: 'tel' })}
          <button className="btn" type="submit">Avoir le ticket</button>
        </form>
      )}
    </Modal>
  )
}
