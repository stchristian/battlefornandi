import { 
  FETCH_POPULAR_REPOS, 
  FETCH_REPO_BY_USER, 
  FETCH_USER,
  REQUEST_USER,
  RECEIVE_USER,
  USER_NOT_FOUND,
  REQUEST_REPOS_BY_LANG,
  RECEIVE_REPOS_BY_LANG
} from "./actionTypes"

import { 
  getPopularRepos,
  getUser,
  getReposByUser,
} from '../../api'

export function fetchPopularRepos(programmingLanguage = 'All') {
  return { type: FETCH_POPULAR_REPOS, programmingLanguage }
};

export function fetchRepoByUser(username) {
  return { type: FETCH_REPO_BY_USER, username}
};


export function requestUser(username) {
  return { type: REQUEST_USER, username }
}

export function receiveUser(username, data) {
  return { type: RECEIVE_USER, username, data}
}

export function userNotFound(username) {
  return { type: USER_NOT_FOUND, username }
}

export function requestReposByLang(programmingLanguage) {
  return { type: REQUEST_REPOS_BY_LANG, programmingLanguage }
}

export function receiveReposByLang(programmingLanguage, data) {
  return { type: RECEIVE_REPOS_BY_LANG, programmingLanguage, data}
}

export function fetchUser(username) {
  return function (dispatch) {
    dispatch(requestUser(username))

    return getUser(username)
      .then(data => {
        dispatch(receiveUser(username, data))
      })
      .catch(err => {
        if (err.isAxiosError && err.response.status === 404) {
          dispatch(userNotFound(username))
        }
      })
  }
}

function shouldFetchUser(state, username) {
  const user = state.users[username]
  if (!user) {
    return true
  } else {
    return false
  }
}

export function fetchUserIfNeeded(username) {
  return function(dispatch, getState) {
    if(shouldFetchUser(getState(), username)) {
      return dispatch(fetchUser(username))
    } else {
      return Promise.resolve()
    }
  }
}

export function fetchReposByLang(programmingLanguage) {
  return function (dispatch) {
    dispatch(requestReposByLang(programmingLanguage))
    return getPopularRepos(programmingLanguage)
      .then(data => {
        dispatch(receiveReposByLang(programmingLanguage, data))
      })
      .catch(err => {
        throw err
      })
  }
}

function shouldFetchReposByLang(state, programmingLanguage) {
  const repos = state.popularReposByLanguage[programmingLanguage]
  if (!repos) {
    return true
  } else {
    return false
  }
}

export function fetchReposByLangIfNeeded(programmingLanguage) {
  return function(dispatch, getState) {
    if(shouldFetchReposByLang(getState(), programmingLanguage)) {
      return dispatch(fetchReposByLang(programmingLanguage))
    } else {
      return Promise.resolve()
    }
  }
}