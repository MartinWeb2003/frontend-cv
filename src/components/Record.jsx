import { useTranslation } from 'react-i18next'
import './Record.css'

/*
 * Experience, education and stack in one editorial ledger. These used to be
 * three sections with three animated mega-titles; the content is the same,
 * the noise is gone.
 *
 * Self-rated skill percentages were removed on purpose: an unverifiable "93%"
 * is the kind of invented metric CLAUDE.md section 0.7 rules out, and the
 * stack list says more without it.
 */
const ENTRIES = [
  { kind: 'work', role: 'experience.job1Role', org: 'experience.job1Company', period: 'experience.job1Period', note: 'home.rec1' },
  { kind: 'work', role: 'experience.job2Role', org: 'experience.job2Company', period: 'experience.job2Period', note: 'home.rec2' },
  { kind: 'edu', role: 'education.deg1Title', org: 'education.deg1School', period: 'education.deg1Period', note: 'education.deg1Spec' },
  { kind: 'edu', role: 'education.deg2Title', org: 'education.deg2School', period: 'education.deg2Period', note: 'education.deg2Spec' },
]

const STACK = [
  { label: 'skills.band1Label', items: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Angular', 'Three.js', 'Framer Motion', 'CSS', 'Figma'] },
  { label: 'skills.band2Label', items: ['Node.js', 'PostgreSQL', 'MySQL', '.NET Core', 'REST API', 'WordPress'] },
  { label: 'skills.band3Label', items: ['C#', 'Java', 'Python', 'C / C++', 'SQL'] },
]

const LANGS = ['1', '2', '3']

export default function Record() {
  const { t } = useTranslation()

  return (
    <section id="experience" className="record section" aria-labelledby="record-title">
      <div className="container record__grid">
        <header className="record__head">
          <h2 id="record-title" className="h2">{t('home.recordTitle')}</h2>
          <p className="lead record__intro">{t('home.recordIntro')}</p>
        </header>

        <div className="record__body">
          <ol className="record__list">
            {ENTRIES.map((e) => (
              <li key={e.role} className="record__row">
                <span className="record__period">{t(e.period)}</span>
                <div>
                  <h3 className="record__role">{t(e.role)}</h3>
                  <p className="record__org">
                    {t(e.org)}
                    <span className="record__kind">{t(e.kind === 'work' ? 'home.kindWork' : 'home.kindEdu')}</span>
                  </p>
                  <p className="record__note">{t(e.note)}</p>
                </div>
              </li>
            ))}
          </ol>

          <div id="skills" className="record__stack">
            {STACK.map((g) => (
              <div key={g.label} className="record__group">
                <h3 className="record__group-label">{t(g.label)}</h3>
                <ul>
                  {g.items.map((x) => (
                    <li key={x} className="tag">{x}</li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="record__group">
              <h3 className="record__group-label">{t('skills.langsHeading')}</h3>
              <dl className="record__langs">
                {LANGS.map((n) => (
                  <div key={n}>
                    <dt>{t(`skills.lang${n}Name`)}</dt>
                    <dd>{t(`skills.lang${n}Level`)}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
