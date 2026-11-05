import Icon from './Icon.jsx'

const INDIGO = '#4f46e5', TEAL = '#0f9d88', ORANGE = '#d97706'

function BarChart({ data, labels, color, w, h, bw }) {
  const max = Math.max(...data)
  const step = w / data.length
  return (
    <svg viewBox={`0 0 ${w} ${h + 22}`} className="chart">
      {data.map((v, i) => {
        const bh = (v / max) * h
        return (
          <g key={i}>
            <rect x={step * i + (step - bw) / 2} y={h - bh} width={bw} height={bh} rx="4" fill={color} />
            <text x={step * i + step / 2} y={h + 15} textAnchor="middle" className="axis">{labels[i]}</text>
          </g>
        )
      })}
    </svg>
  )
}

function smooth(pts) {
  let d = `M${pts[0][0]},${pts[0][1]}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2
    d += ` C${p1[0] + (p2[0] - p0[0]) / 6},${p1[1] + (p2[1] - p0[1]) / 6} ${p2[0] - (p3[0] - p1[0]) / 6},${p2[1] - (p3[1] - p1[1]) / 6} ${p2[0]},${p2[1]}`
  }
  return d
}

function LineChart({ series, w = 600, h = 150 }) {
  const toPts = (arr) => arr.map((v, i) => [(i / (arr.length - 1)) * w, h - (v / 100) * h])
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="chart" preserveAspectRatio="none">
      {[0, 1, 2, 3].map((i) => <line key={i} x1="0" x2={w} y1={(h / 3) * i} y2={(h / 3) * i} stroke="#eceef2" />)}
      {series.map((s) => (
        <path key={s.name} d={smooth(toPts(s.data))} fill="none" stroke={s.color} strokeWidth="2.5" />
      ))}
    </svg>
  )
}

function Pie({ slices }) {
  const r = 62, c = 64
  let a = -Math.PI / 2
  return (
    <svg viewBox="0 0 128 128" width="124" height="124">
      {slices.map((s) => {
        const a2 = a + (s.value / 100) * Math.PI * 2
        const [x1, y1, x2, y2] = [c + r * Math.cos(a), c + r * Math.sin(a), c + r * Math.cos(a2), c + r * Math.sin(a2)]
        const d = `M${c},${c} L${x1},${y1} A${r},${r} 0 ${s.value > 50 ? 1 : 0} 1 ${x2},${y2} Z`
        a = a2
        return <path key={s.name} d={d} fill={s.color} stroke="#fff" strokeWidth="2" />
      })}
    </svg>
  )
}

const STATS = [
  { v: 248, l: 'Inscrits' }, { v: 196, l: 'Présents' }, { v: 52, l: 'Absents' }, { v: 14, l: 'En attente' },
]
const SLICES = [
  { name: 'Ateliers', value: 45, color: INDIGO },
  { name: 'Conférences', value: 30, color: TEAL },
  { name: 'Réunions', value: 25, color: ORANGE },
]

export default function Dashboard() {
  return (
    <section>
      <h2 className="title">Tableau de bord des statistiques</h2>
      <p className="sub">Suivez la participation et planifiez mieux vos événements réguliers</p>

      <div className="grid-top">
        <div className="card">
          <h3>Inscriptions</h3><p className="cap">Évolution du nombre d'inscrits</p>
          <BarChart data={[30, 62, 60, 105, 125, 170]} labels={['S1', 'S2', 'S3', 'S4', 'S5', 'S6']} color={INDIGO} w={440} h={150} bw={30} />
        </div>
        <div className="card">
          <h3>Participants</h3><p className="cap">Aperçu des personnes impliquées</p>
          <div className="kpis">
            {STATS.map((s) => (
              <div className="kpi" key={s.l}>
                <span className="kpi-icon"><Icon name="user" size={18} /></span>
                <strong>{s.v}</strong><small>{s.l}</small>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid-mid">
        <div className="card">
          <h3>Évolution de la participation</h3><p className="cap">Comparaison mois par mois</p>
          <div className="legend">
            <span><i style={{ background: INDIGO }} />Inscriptions</span>
            <span><i style={{ background: TEAL }} />Participation</span>
          </div>
          <LineChart series={[
            { name: 'Inscriptions', color: INDIGO, data: [42, 62, 66, 55, 46, 60, 72, 62, 50, 46, 58, 85] },
            { name: 'Participation', color: TEAL, data: [46, 54, 58, 57, 50, 56, 62, 60, 56, 58, 64, 88] },
          ]} />
        </div>
        <div className="card">
          <h3>Répartition</h3><p className="cap">Par type d'événement</p>
          <div className="pie-row">
            <Pie slices={SLICES} />
            <ul className="pie-legend">
              {SLICES.map((s) => <li key={s.name}><i style={{ background: s.color }} />{s.name} {s.value} %</li>)}
            </ul>
          </div>
        </div>
      </div>

      <div className="card">
        <h3>Comparaison des événements</h3><p className="cap">Participants par période</p>
        <BarChart data={[65, 100, 80, 120, 58, 108, 125, 90]} labels={['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août']} color={TEAL} w={920} h={120} bw={30} />
      </div>
    </section>
  )
}
