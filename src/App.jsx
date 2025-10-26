import React, { useEffect, useMemo, useState } from 'react'
import Profile from './components/Profile.jsx'
import Projects from './components/Projects.jsx'
import { fetchGitHubProfile, fetchGitHubRepos } from './lib/github.js'

const USERNAME = 'shazee-04'

export default function App(){
  const [profile, setProfile] = useState(null)
  const [repos, setRepos] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    (async () => {
      try{
        const [p, r] = await Promise.all([
          fetchGitHubProfile(USERNAME),
          fetchGitHubRepos(USERNAME)
        ])
        setProfile(p)
        // Filter out portfolio repo itself
        const filtered = r.filter(repo => repo.name.toLowerCase() !== `${USERNAME}.github.io`)
        setRepos(filtered)
      }catch(e){
        setError(e.message || 'Failed to load data')
      }
    })()
  }, [])

  const topLanguages = useMemo(() => {
    if(!repos) return []
    const counts = {}
    repos.forEach(r => { if(r.language) counts[r.language] = (counts[r.language]||0)+1 })
    return Object.entries(counts).sort((a,b)=>b[1]-a[1]).map(x=>x[0]).slice(0,5)
  }, [repos])

  return (
    <div className="min-h-dvh antialiased">
      <main>
        {error && (
          <div className="py-10 md:py-16">
            <div className="max-w-5xl mx-auto px-4">
              <div className="text-red-600">{error}</div>
            </div>
          </div>
        )}
        {!profile && !error && (
          <div className="py-10 md:py-16">
            <div className="max-w-5xl mx-auto px-4"><p className="text-slate-500 dark:text-slate-400">Loading profile...</p></div>
          </div>
        )}
        {profile && <Profile profile={profile} />}

        {!repos && !error && (
          <div className="py-10 md:py-16">
            <div className="max-w-5xl mx-auto px-4"><p className="text-slate-500 dark:text-slate-400">Loading projects...</p></div>
          </div>
        )}
        {repos && (
          <>
            {topLanguages.length > 0 && (
              <section className="py-10 md:py-16">
                <div className="max-w-5xl mx-auto px-4">
                  <div className="flex flex-wrap gap-2">
                    {topLanguages.map(lang => (
                      <span key={lang} className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-sm">{lang}</span>
                    ))}
                  </div>
                </div>
              </section>
            )}
            <Projects repos={repos} />
          </>
        )}
      </main>
    </div>
  )
}
