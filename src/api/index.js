import axios from 'axios'

const baseURL = 'https://api.github.com'

const http = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    Accept: 'application/vnd.github.v3+json'
  }
})

export async function getReposByUser (username) {
  const { data } = await http.get(`/users/${username}/repos`)
  return data
}

export async function getUser (username) {
  const { data } = await http.get(`/users/${username}`)
  return data
}

export async function searchRepo (params) {
  const { data } = await http.get('/search/repositories', {
    params
  })
  return data
}

export async function getPopularRepos (programmingLanguage) {
  return searchRepo({
    q: `stars:>1 language:${programmingLanguage || 'all'}`,
    sort: 'stars',
    order: 'desc'
  })
}
