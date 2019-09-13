import React from 'react'

export default function GithubProfile ({user}) {
  if(!user) {
    return (
      <div className="profile-card">
        <div className="profile-card__thumbnail-img"></div>
        <div className="profile-card__body">
          <p><span>No content available</span></p>
        </div>
      </div>
    )
  }

  return (
    <div className='profile-card'>
      <div className="profile-card__thumbnail-img">
        <a href={user.html_url} target='_blank'>
          <img src={user.avatar_url} alt='' />
        </a>
      </div>
      <div className="profile-card__body">
        <h2 className="username">{user.name ? user.name : 'Anonymus' }</h2>
        <p>
        <span>Bio:</span> {user.bio ? user.bio : '-'} <br />
        <span>Id:</span> {user.id} <br />
        <span>Login name:</span> {user.login} <br />
        <span>Followers:</span> {user.followers} <br />
        <span>Public repos:</span> {user.public_repos} <br />
        </p>
      </div>
    </div>
  )
}
