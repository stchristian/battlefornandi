import { 
  REQUEST_USER,
  RECEIVE_USER,
  USER_NOT_FOUND,
  REQUEST_REPOS_BY_LANG,
  RECEIVE_REPOS_BY_LANG
} from '../actions/actionTypes'

import {
  combineReducers
} from 'redux'
import { userNotFound } from '../actions';

//example state tree
const initialState = {
  popularReposByLanguage: {
    All: {
      isFetching: false,
      data: null,
    }
  },
  users: {
    stchristian: {
      isFetching: false,
      data: null,
      userNotFound: true //optional if user not found
    }
  },
  reposByUser: {
    stchristian: {
      isFetching: false,
      items: []
    }
  }
};

function repos(state = { isFetching: false, data: null }, action) {
  switch (action.type) {
    case REQUEST_REPOS_BY_LANG: 
      return {
        ...state, 
        isFetching: true
      }
    case RECEIVE_REPOS_BY_LANG: 
      return {
        isFetching: false,
        data: action.data
      }
    default: 
      return state
  }
}

function popularReposByLanguage(state = {}, action) {
  switch (action.type) {
    case REQUEST_REPOS_BY_LANG: 
    case RECEIVE_REPOS_BY_LANG: 
      return {
        ...state,
        [action.programmingLanguage]: repos(state[action.programmingLanguage], action)
      }
    default: 
      return state;
  }
}

// missing error handling
function user(state = { isFetching: false, data: null }, action) {
  switch (action.type) {
    case REQUEST_USER: 
      return {
        isFetching: true,
        data: null,
      }
    case RECEIVE_USER: 
      return {
        isFetching: false,
        data: action.data
      }
    case USER_NOT_FOUND:
      return {
        isFetching: false,
        data: null,
        userNotFound: true,
      }
    default: 
      return state
  }
}

function users(state = {}, action) {
  switch (action.type) {
    case REQUEST_USER: 
    case RECEIVE_USER: 
    case USER_NOT_FOUND:
      return {
        ...state,
        [action.username]: user(state[action.username], action)
      }
    default: 
      return state;
  }
}

const rootReducer = combineReducers({
  users,
  popularReposByLanguage
})

export default rootReducer;