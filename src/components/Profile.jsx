import React from 'react'

function Stat({label, value}){
  return (
    <div className="flex flex-col items-center px-4 py-2 bg-white/70 dark:bg-slate-900/70 rounded-xl border border-slate-200/60 dark:border-slate-800/60">
      <div className="text-xl font-bold">{value}</div>
      <div className="text-xs text-slate-500 dark:text-slate-400">{label}</div>
    </div>
  )
}

export default function Profile({profile}){
  if(!profile) return null
  return (
    <section className="py-10 md:py-16">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img src={profile.avatar_url} alt={`${profile.name || profile.login} avatar`} className="w-28 h-28 rounded-2xl object-cover" />
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold">{profile.name || profile.login}</h1>
            <p className="mt-2 text-slate-500 dark:text-slate-400 max-w-prose">{profile.bio || 'Developer building useful stuff on GitHub.'}</p>
            <div className="mt-4 flex flex-wrap gap-2 text-sm">
              {profile.location && <span className="px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800">{profile.location}</span>}
              {profile.blog && <a className="px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800" href={profile.blog} target="_blank" rel="noreferrer">Website</a>}
              <a className="px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800" href={profile.html_url} target="_blank" rel="noreferrer">GitHub</a>
            </div>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
          <Stat label="Repos" value={profile.public_repos} />
          <Stat label="Gists" value={profile.public_gists} />
          <Stat label="Followers" value={profile.followers} />
          <Stat label="Following" value={profile.following} />
        </div>
      </div>
    </section>
  )
}
