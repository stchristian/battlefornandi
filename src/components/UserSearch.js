import React, { useState, useEffect } from 'react'
import GithubProfile from '../GithubProfile'
import { getUser } from '../api'
import { debounce } from 'lodash'
import { connect } from 'react-redux'
import { fetchUserIfNeeded } from "../store/actions"

function UserSearch ({ userChanged, placeholder, fetchUserIfNeeded, users }) {
  const [username, setUsername] = useState('')

  const searchUserByName = debounce(
    async (username) => {
      console.log(username)
      setUsername(username)
      if (username) {
        fetchUserIfNeeded(username)
      } else {
        userChanged(null)
      }
    }, 500)

  useEffect(() => {
    return () => {
      searchUserByName.cancel()
    }
  }, [] )

  useEffect(() => {
    if(users[username] && users[username].data !== null) {
      userChanged(username)
    }
  }, [users])

  const handleChange = (event) => {
    searchUserByName(event.target.value)
  }

  const noUserFound = () => {
    return username && users[username] && users[username].userNotFound
  }
  
  return (
    <div className='user-search'>
      <input type='text' onChange={handleChange} className={ noUserFound() ? 'invalid-input' : ''} placeholder={placeholder || 'Search for a user...'} />
      <GithubProfile user={username && users[username] && users[username].data} />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserIfNeeded: username => dispatch(fetchUserIfNeeded(username))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSearch)

