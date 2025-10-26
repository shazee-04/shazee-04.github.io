import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

function Stat({ label, value }) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center px-4 py-2">
        <div className="text-xl font-bold">{value}</div>
        <div className="text-xs text-muted-foreground">{label}</div>
      </CardContent>
    </Card>
  )
}

export default function Profile({ profile }) {
  if (!profile) return null
  return (
    <section className="py-10 md:py-16">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <Avatar className="w-28 h-28">
            <AvatarImage src={profile.avatar_url} alt={`${profile.name || profile.login} avatar`} />
            <AvatarFallback>{(profile.name || profile.login).substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold">{profile.name || profile.login}</h1>
            <p className="mt-2 text-muted-foreground max-w-prose">{profile.bio}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {profile.location && <Badge variant="secondary">{profile.location}</Badge>}
              {profile.blog && <Badge variant="secondary" asChild><a href={profile.blog} target="_blank" rel="noreferrer">Website</a></Badge>}
              <Badge variant="secondary" asChild><a href={profile.html_url} target="_blank" rel="noreferrer">GitHub</a></Badge>
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
