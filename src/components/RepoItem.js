import React from 'react'
import PropTypes from 'prop-types'

function RepoItem ({ repo }) {
  return (
    <li className='repo-item'>
      <article>
        <header>
          <h2><a href={repo.html_url} target='_blank' rel='noopener noreferrer'>{repo.name}</a>/<span>{repo.owner.login}</span></h2>
        </header>
        <p><i className="fa fa-star"></i> {repo.stargazers_count}</p>
        <p>Language: {repo.language}</p>
        <p>{repo.description ? repo.description: 'No available description'}</p>
        <footer>
          <p>Created at: { (new Date(repo.created_at)).toDateString() }</p>
        </footer>
      </article>
    </li>
  )
}

//Using PropTypes just in this component to see how it works
RepoItem.propTypes = {
  repo: PropTypes.shape({
    html_url: PropTypes.string,
    name: PropTypes.string,
    language: PropTypes.string,
    description: PropTypes.string,
    created_at: PropTypes.string,
    stargazers_count: PropTypes.number,
    owner: PropTypes.shape({
      login: PropTypes.string
    })
  }).isRequired
}

export default RepoItem
