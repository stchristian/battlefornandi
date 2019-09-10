import React from 'react'

export default function GithubProfile(props) {
  return (
    <div>
      <h2>{ props.user.name }</h2>
      <a href={ props.user.html_url } target="_blank" rel="noopener noreferrer">
      <img src={ props.user.avatar_url } alt=""/>
      </a>
      <p>
      Bio: { props.user.bio } <br/>
      Id: { props.user.id } <br/>
      Login: { props.user.login } <br/>
      Követők: { props.user.followers } <br/>
      Publikus repók száma: { props.user.public_repos } <br/>
      </p>
    </div>
  )
}
