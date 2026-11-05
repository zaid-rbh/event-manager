import { useState } from 'react'
import Icon from './Icon.jsx'
import Dashboard from './Dashboard.jsx'
import Calendar from './Calendar.jsx'
import EventList from './EventList.jsx'
import RegisterForm from './RegisterForm.jsx'
import Login from './Login.jsx'
import { SEED } from './data.js'

const NAV = [
  { id: 'stats', label: 'Dashboard', icon: 'bars' },
  { id: 'calendar', label: 'Calendrier', icon: 'cal' },
]

function UserMenu({ user, onLogin, onLogout }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="user-menu">
      <button className="avatar" onClick={() => setOpen(!open)} aria-label="Compte" aria-expanded={open}>
        <Icon name="user" size={20} />
      </button>
      {open && (
        <div className="dropdown">
          {user ? (
            <>
              <p className="cap">{user}</p>
              <button onClick={() => { setOpen(false); onLogout() }}>Se déconnecter</button>
            </>
          ) : (
            <button onClick={() => { setOpen(false); onLogin() }}>Se connecter</button>
          )}
        </div>
      )}
    </div>
  )
}

export default function App() {
  const [user, setUser] = useState(null)
  const [events, setEvents] = useState(SEED)
  const [page, setPage] = useState('stats')
  const [query, setQuery] = useState('')
  const [reg, setReg] = useState(null)
  const [showLogin, setShowLogin] = useState(false)

  return (
    <>
      {user ? (
        <div className="app">
          <aside className="sidebar">
            <h1 className="brand">Organisateur</h1>
            <nav>
              {NAV.map((n) => (
                <button key={n.id} className={'nav-item' + (page === n.id ? ' active' : '')} onClick={() => setPage(n.id)}>
                  <Icon name={n.icon} /> {n.label}
                </button>
              ))}
            </nav>
          </aside>
          <main className="main">
            <header className="topbar">
              <label className="search">
                <Icon name="search" size={16} />
                <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Rechercher un événement..." />
              </label>
              <UserMenu user={user} onLogout={() => { setUser(null); setQuery('') }} />
            </header>
            {page === 'stats' && <Dashboard />}
            {page === 'calendar' && <Calendar events={events} query={query} onAdd={(e) => setEvents([...events, e])} />}
          </main>
        </div>
      ) : (
        <div className="public">
          <header className="pub-top"><UserMenu user={null} onLogin={() => setShowLogin(true)} /></header>
          <EventList events={events} onRegister={setReg} />
        </div>
      )}
      {reg && <RegisterForm event={reg} onClose={() => setReg(null)} />}
      {showLogin && <Login onClose={() => setShowLogin(false)} onSuccess={(u) => { setUser(u); setShowLogin(false); setPage('stats') }} />}
    </>
  )
}
