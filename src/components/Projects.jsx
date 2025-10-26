import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

function ProjectCard({repo}){
  return (
    <a href={repo.html_url} target="_blank" rel="noreferrer">
      <Card className="h-full transition-shadow hover:shadow-md">
        <CardHeader>
          <div className="flex items-start justify-between gap-3">
            <CardTitle className="line-clamp-1">{repo.name}</CardTitle>
            <Badge variant="secondary">{repo.language || '—'}</Badge>
          </div>
          {repo.description && <CardDescription className="line-clamp-2">{repo.description}</CardDescription>}
        </CardHeader>
        <CardFooter className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>⭐ {repo.stargazers_count}</span>
          <span>🍴 {repo.forks_count}</span>
          <span className="ml-auto">Updated {new Date(repo.updated_at).toLocaleDateString()}</span>
        </CardFooter>
      </Card>
    </a>
  )
}

export default function Projects({repos}){
  if(!repos) return null
  if(repos.length === 0) return (
    <section className="py-10 md:py-16">
      <div className="max-w-5xl mx-auto px-4">
        <p className="text-muted-foreground">No public repositories found.</p>
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
