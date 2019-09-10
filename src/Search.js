import React, { useState, useEffect } from 'react'
import GithubProfile from './GithubProfile'
import { getUser } from './api'
import { debounce } from 'lodash'

export default function Search () {
  const [user, setUser] = useState(null)

  const searchUserByName = debounce(
    async (text) => {
      if (text) {
        try {
          const user = await getUser(text)
          setUser(user)
        } catch (err) {
          if (err.isAxiosError && err.response.status === 404) {
            setUser(null)
          } else {
            throw err
          }
        }
      }
    }, 1000)

  useEffect(() => {
    return () => {
      searchUserByName.cancel()
    }
  })

  return (
    <div>
      <h1>Search page</h1>
      <input type='text' onChange={e => searchUserByName(e.target.value)} />
      {user ? <GithubProfile user={user} /> : <p>Nincs ilyen nevű felhasználó</p>}
    </div>
  )
}
