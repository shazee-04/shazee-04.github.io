export async function fetchGitHubProfile(username){
  const res = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`)
  if(!res.ok) throw new Error(`Profile fetch failed: ${res.status}`)
  return res.json()
}

export async function fetchGitHubRepos(username){
  const res = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`)
  if(!res.ok) throw new Error(`Repos fetch failed: ${res.status}`)
  return res.json()
}
