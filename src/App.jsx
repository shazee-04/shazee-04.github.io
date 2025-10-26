import React, { useEffect, useMemo, useState } from 'react'
import Profile from './components/Profile.jsx'
import Projects from './components/Projects.jsx'
import { fetchGitHubProfile, fetchGitHubRepos } from './lib/github.js'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'

const USERNAME = 'shazee-04'

export default function App() {
  const [profile, setProfile] = useState(null)
  const [repos, setRepos] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    (async () => {
      try {
        const [p, r] = await Promise.all([
          fetchGitHubProfile(USERNAME),
          fetchGitHubRepos(USERNAME)
        ])
        setProfile(p)
        // Filter out portfolio repo itself
        const filtered = r.filter(repo => repo.name.toLowerCase() !== `${USERNAME}.github.io`)
        setRepos(filtered)
      } catch (e) {
        setError(e.message || 'Failed to load data')
      }
    })()
  }, [])

  const topLanguages = useMemo(() => {
    if (!repos) return []
    const counts = {}
    repos.forEach(r => { if (r.language) counts[r.language] = (counts[r.language] || 0) + 1 })
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).map(x => x[0]).slice(0, 5)
  }, [repos])

  return (
    <div className="min-h-dvh antialiased">
      <main>
        {error && (
          <div className="py-10 md:py-16">
            <div className="max-w-5xl mx-auto px-4">
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </div>
          </div>
        )}
        
        {!profile && !error && (
          <div className="py-10 md:py-16">
            <div className="max-w-5xl mx-auto px-4">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <Skeleton className="w-28 h-28 rounded-full" />
                <div className="flex-1 w-full">
                  <Skeleton className="h-8 w-48 mb-2" />
                  <Skeleton className="h-4 w-full max-w-prose mb-4" />
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-20" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {profile && <Profile profile={profile} />}

        {!repos && !error && (
          <div className="py-10 md:py-16">
            <div className="max-w-5xl mx-auto px-4">
              <Skeleton className="h-6 w-32 mb-4" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map(i => (
                  <Skeleton key={i} className="h-40" />
                ))}
              </div>
            </div>
          </div>
        )}

        {repos && (<Projects repos={repos} />)}
      </main>
    </div>
  )
}
