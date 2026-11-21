import React, { useState } from 'react'
import './App.css'
import profilePhoto from './profile.jpg'

/* ------------------------------------------------------------------
   EDIT THIS OBJECT. Everything except the name and photo is dummy data.
------------------------------------------------------------------- */
const profile = {
  name: 'Vishaka Kumari',
  first: 'Vishaka',
  last: 'Kumari',
  photo: profilePhoto,
  role: 'Frontend developer and UI designer',
  intro:
    "I build fast, accessible websites and apps, from the first sketch to the deployed product. I'm looking for projects where design and code are made by the same person.",
  email: 'hello@example.com',
  location: 'Your city, Country',
  about: [
    "I started building websites because I wanted to see my ideas work in a browser, not just on paper. Today I focus on React front ends, clear interfaces and pages that load quickly on any phone.",
    "I like small teams, honest feedback and shipping early. Outside of work you will find me sketching layouts, reading about typography and trying out new tools.",
  ],
  facts: [
    { label: 'Based in', value: 'Your city, Country' },
    { label: 'Focus', value: 'React, UI design, accessibility' },
    { label: 'Languages', value: 'English, Your language' },
    { label: 'Open to', value: 'Freelance and internships' },
  ],
  skills: [
    { name: 'React', level: 5 },
    { name: 'JavaScript', level: 5 },
    { name: 'HTML and CSS', level: 5 },
    { name: 'Figma', level: 4 },
    { name: 'Git and GitHub', level: 4 },
    { name: 'Accessibility', level: 4 },
    { name: 'Node.js', level: 3 },
    { name: 'TypeScript', level: 3 },
  ],
  projects: [
    {
      title: 'Weekly planner app',
      category: 'Web app',
      blurb: 'A responsive planner that helps people organise tasks by day, with drag and drop and offline support.',
      stack: ['React', 'Firebase'],
      year: '2026',
      href: '#',
    },
    {
      title: 'Local bakery website',
      category: 'Design',
      blurb: 'A landing page and brand refresh for a neighbourhood bakery, designed in Figma and built in React.',
      stack: ['Figma', 'CSS'],
      year: '2026',
      href: '#',
    },
    {
      title: 'Sales dashboard',
      category: 'Web app',
      blurb: 'Turns a messy spreadsheet into charts anyone can read, with filters by month and region.',
      stack: ['React', 'Charts'],
      year: '2025',
      href: '#',
    },
    {
      title: 'Accessible UI kit',
      category: 'Open source',
      blurb: 'A small component library with keyboard-friendly buttons, menus and dialogs.',
      stack: ['TypeScript', 'Accessibility'],
      year: '2025',
      href: '#',
    },
    {
      title: 'Student portal redesign',
      category: 'Design',
      blurb: 'A concept redesign of a university portal that cuts the steps to check results from six to two.',
      stack: ['Figma', 'Prototyping'],
      year: '2024',
      href: '#',
    },
  ],
  timeline: [
    {
      years: '2025 to now',
      title: 'Freelance frontend developer',
      place: 'Self-employed',
      text: 'Building websites and small web apps for local businesses and student startups.',
    },
    {
      years: '2024',
      title: 'Web development intern',
      place: 'Sample Company',
      text: 'Worked on a React dashboard, fixed accessibility issues and wrote reusable components.',
    },
    {
      years: '2022 to 2026',
      title: 'BS in Computer Science',
      place: 'Your University',
      text: 'Coursework in web development, databases and human-computer interaction.',
    },
  ],
  achievements: [
    'Winner, Sample University Hackathon 2025',
    'Google UX Design Certificate (sample)',
    'Speaker, Campus Tech Meetup 2025',
    'Open-source contributor, 20+ merged pull requests',
  ],
  links: [
    { label: 'GitHub', href: '#' },
    { label: 'LinkedIn', href: '#' },
    { label: 'Resume (PDF)', href: '#' },
  ],
}

const LEVELS = ['', 'Beginner', 'Basic', 'Comfortable', 'Strong', 'Expert']

function Meter({ level }) {
  return (
    <span className="meter" aria-hidden="true">
      {[1, 2, 3, 4, 5].map((n) => (
        <i key={n} className={n <= level ? 'on' : ''} />
      ))}
    </span>
  )
}

export default function App() {
  const [filter, setFilter] = useState('All')
  const [copied, setCopied] = useState(false)
  const [form, setForm] = useState({ name: '', message: '' })

  const categories = ['All', ...new Set(profile.projects.map((p) => p.category))]
  const shown = profile.projects.filter((p) => filter === 'All' || p.category === filter)
  const year = new Date().getFullYear()

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  function sendMessage(e) {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio message from ${form.name}`)
    const body = encodeURIComponent(form.message)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
  }

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>

      <header className="top">
        <a className="wordmark" href="#top">{profile.name}</a>
        <nav aria-label="Main">
          <a href="#work">Work</a>
          <a href="#skills">Skills</a>
          <a href="#experience">Experience</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main id="main">
        <section className="hero" id="top">
          <div className="hero-grid">
            <div className="hero-text">
              <h1 className="name">
                <span>{profile.first}</span>
                <span>{profile.last}</span>
              </h1>
              <div className="hero-body">
                <p className="role">{profile.role}</p>
                <p className="intro">{profile.intro}</p>
                <div className="cta">
                  <a className="btn btn-primary" href="#work">View my work</a>
                  <a className="btn btn-ghost" href="#contact">Hire me</a>
                </div>
              </div>
            </div>
            <figure className="portrait">
              <img src={profile.photo} alt={`Portrait of ${profile.name}`} width="800" height="1000" />
            </figure>
          </div>
        </section>

        <section className="work" id="work" aria-labelledby="work-title">
          <div className="head">
            <h2 id="work-title">Selected work</h2>
            <div className="filters" role="group" aria-label="Filter projects">
              {categories.map((c) => (
                <button key={c} type="button" aria-pressed={filter === c} onClick={() => setFilter(c)}>
                  {c}
                </button>
              ))}
            </div>
          </div>
          <ul className="rows">
            {shown.map((p) => (
              <li key={p.title}>
                <a className="row" href={p.href}>
                  <h3>{p.title}</h3>
                  <div className="row-info">
                    <p>{p.blurb}</p>
                    <p className="tags">{p.category}: {p.stack.join(', ')}</p>
                  </div>
                  <span className="year">{p.year}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="skills" id="skills" aria-labelledby="skills-title">
          <h2 id="skills-title">Skills</h2>
          <ul className="skill-list">
            {profile.skills.map((s) => (
              <li key={s.name}>
                <span className="skill-name">{s.name}</span>
                <span className="skill-level">{LEVELS[s.level]}</span>
                <Meter level={s.level} />
              </li>
            ))}
          </ul>
        </section>

        <section className="experience" id="experience" aria-labelledby="exp-title">
          <h2 id="exp-title">Experience and education</h2>
          <div className="exp-grid">
            <ol className="timeline">
              {profile.timeline.map((t) => (
                <li key={t.title}>
                  <span className="years">{t.years}</span>
                  <div>
                    <h3>{t.title}</h3>
                    <p className="place">{t.place}</p>
                    <p>{t.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <aside className="wins">
              <h3>Highlights</h3>
              <ul>
                {profile.achievements.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        <section className="about" id="about" aria-labelledby="about-title">
          <h2 id="about-title">About me</h2>
          <div className="about-grid">
            <div className="about-text">
              {profile.about.map((t) => (
                <p key={t.slice(0, 24)}>{t}</p>
              ))}
            </div>
            <dl className="facts">
              {profile.facts.map((f) => (
                <div key={f.label}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="contact" id="contact" aria-labelledby="contact-title">
          <h2 id="contact-title">Have a project in mind?</h2>
          <div className="contact-grid">
            <div className="contact-left">
              <a className="mail" href={`mailto:${profile.email}`}>{profile.email}</a>
              <button type="button" className="btn btn-ghost copy" onClick={copyEmail}>
                {copied ? 'Email copied' : 'Copy email'}
              </button>
              <ul className="links">
                {profile.links.map((l) => (
                  <li key={l.label}><a href={l.href}>{l.label}</a></li>
                ))}
              </ul>
            </div>
            <form className="form" onSubmit={sendMessage}>
              <label>
                Your name
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </label>
              <label>
                Your message
                <textarea
                  rows="5"
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </label>
              <button type="submit" className="btn btn-primary">Send message</button>
            </form>
          </div>
        </section>
      </main>

      <footer className="foot">
        <p>{profile.location}</p>
        <p>&copy; {year} {profile.name}</p>
      </footer>
    </>
  )
}
