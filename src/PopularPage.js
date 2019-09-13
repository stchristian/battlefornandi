import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getPopularRepos as _getPopularRepos } from './api'
import RepoItem from './components/RepoItem'
import { connect } from 'react-redux'
import { fetchReposByLangIfNeeded } from './store/actions'

const languages = [
  'All',
  'JavaScript',
  'C',
  'C++',
  'Java',
  'CSS',
  'HTML',
  'PHP',
  'Ruby',
  'Python'
]

function PopularPage ({ match, fetchReposByLangIfNeeded, popularReposByLanguage }) {
  const lang = match.params.lang

  useEffect(() => {
    if(!popularReposByLanguage[lang] || popularReposByLanguage[lang].data == null) {
      fetchReposByLangIfNeeded(lang)
    }
  }, [match])

  const navElement = languages.map((l, index) => {
    return <Link className={`m-r-1 m-b-1 button ${match.params.lang === languages[index].toLowerCase() ? 'button--selected' : ''}`} key={l} to={`/popular/${l.toLowerCase()}`}>{l}</Link>
  })

  return (
    <div className='popular'>
      <h1><i className="fa fa-github"></i> Most popular repositories</h1>
      <div className='flex justify-center flex-wrap'>
        { navElement }
      </div>
      <ul>
        {
          popularReposByLanguage[lang] && (popularReposByLanguage[lang].isFetching ? 
          <div className="text-align-center">
          <img src="/nandi.jpg" alt="" className="loading-spinner"/>
          </div>
            : popularReposByLanguage[lang].data.items.map((repo) => {
              return <RepoItem repo={repo} key={repo.id} />
            })
          )
        }
      </ul>
    </div>
  )
}

const mapStateToProps = ({ popularReposByLanguage }) => {
  return {
    popularReposByLanguage
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchReposByLangIfNeeded: programmingLanguage => dispatch(fetchReposByLangIfNeeded(programmingLanguage))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PopularPage)
