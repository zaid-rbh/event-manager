import { useState } from 'react'
import Modal from './Modal.jsx'
import { DEMO } from './data.js'

export default function Login({ onClose, onSuccess }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const submit = (e) => {
    e.preventDefault()
    if (email.trim().toLowerCase() === DEMO.email && password === DEMO.password) onSuccess(email.trim())
    else setError('Adresse e-mail ou mot de passe incorrect.')
  }
  return (
    <Modal onClose={onClose}>
      <h2 className="title sm">Se connecter</h2>
      <p className="sub">Accès réservé à l'organisateur</p>
      <form className="form flat" onSubmit={submit}>
        <label className="field"><span>E-mail :</span>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoFocus required /></label>
        <label className="field"><span>Mot de passe :</span>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /></label>
        {error && <em className="err">{error}</em>}
        <button className="btn" type="submit">Se connecter</button>
        <p className="cap">Compte de démonstration : {DEMO.email} / {DEMO.password}</p>
      </form>
    </Modal>
  )
}
