import React from 'react'

function ProjectCard({repo}){
  return (
    <a href={repo.html_url} target="_blank" rel="noreferrer" className="p-4 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-2xl hover:shadow-md transition">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-semibold text-lg line-clamp-1">{repo.name}</h3>
        <span className="text-xs px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800">{repo.language || '—'}</span>
      </div>
      {repo.description && <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 line-clamp-2">{repo.description}</p>}
      <div className="mt-3 flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
        <span>⭐ {repo.stargazers_count}</span>
        <span>🍴 {repo.forks_count}</span>
        <span className="ml-auto">Updated {new Date(repo.updated_at).toLocaleDateString()}</span>
      </div>
    </a>
  )
}

export default function Projects({repos}){
  if(!repos) return null
  if(repos.length === 0) return (
    <section className="py-10 md:py-16">
      <div className="max-w-5xl mx-auto px-4">
        <p className="text-slate-500 dark:text-slate-400">No public repositories found.</p>
      </div>
    </section>
  )
  return (
    <section className="py-10 md:py-16">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-xl md:text-2xl font-bold mb-4">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {repos.map(r => <ProjectCard key={r.id} repo={r} />)}
        </div>
      </div>
    </section>
  )
}
