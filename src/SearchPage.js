import React, { useState }from 'react'
import UserSearch from './components/UserSearch'
import { getReposByUser } from './api'
import RepoItem from './components/RepoItem'

export default function SearchPage () {
  const [repos, setRepos] = useState([])

  const userChanged = (username) => {
    if(username) {
      getReposByUser(username).then((repos) => {
        setRepos(repos.slice(0, 10)) //Only 10       
      })
    } else {
      setRepos([])
    }
  }

  let reposTemplate
  if (repos.length > 0) {
    reposTemplate = (
    <>
      <h2>Repositories</h2>
      <ul>
      {repos.map(( repo ) => {
        return <RepoItem repo={repo} key={repo.id} />
      })}
      </ul>
    </>
    )
  }
  return (
    <div>
      <h1 className="text-align-center">Search for a GitHub user!</h1>
      <div className="flex justify-center">
        <UserSearch userChanged={userChanged}/>
      </div>
      {reposTemplate}
    </div>
  )
}
