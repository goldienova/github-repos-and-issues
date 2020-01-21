import { combineReducers } from 'redux'



const repoList = (state=[], action)=>{
  switch(action.type){
    case 'FETCH_REPOS':
      return action.repoList
    case 'CLEAR_REPOS':
      return []
    default: return state
  }
}

const mappedIssuesToRepos = (state={}, action)=>{
  switch(action.type){
    case 'MAP_ISSUES_TO_REPO':
      return Object.assign({}, state, action.newMappedList)
    case 'REORDER_ISSUES':
      return Object.assign({}, state, action.newList)
    default: return state
  }
}

const apiKey = (state='', action)=>{
  switch(action.type){
    case 'SET_KEY':
      return action.api_key
    case 'CLEAR_KEY':
      return ''
    default: return state
  }
}

const selectedRepo = (state='', action)=>{
  switch(action.type){
    case 'SELECT_REPO':
      return action.selectedRepo
    default: return state
  }
}

export default combineReducers({repoList, mappedIssuesToRepos, apiKey, selectedRepo})
