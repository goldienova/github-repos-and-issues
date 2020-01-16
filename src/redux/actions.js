import constants from './constants'

export const fetchRepos=(api_key)=>dispatch=>{
  const headers = {'Authorization' : `Basic ${btoa(`username:${api_key}`)}`}

  fetch('https://api.github.com/user/repos?per_page=100', {
    'method': 'GET',
    headers: headers
  })
  .then((response) => {
    return response.json();
  })
  .then((repoList)=>{
    dispatch({
      type: constants.FETCH_REPOS,
      repoList
    })
  })
}


export const clearRepos=()=>dispatch=>{
  return{
    type: constants.CLEAR_REPOS,
    repoList: {}
  }
}

export const fetchIssues=(fullName, api_key)=>dispatch=>{

    const headers = {'Authorization' : `Basic ${btoa(`username:${api_key}`)}`}


    fetch(`https://api.github.com/repos/${fullName}/issues`, {
      'method': 'GET',
      headers: headers
    })
    .then((response) => {
      return response.json();
    })
    .then((issueList)=>{
      let order = sessionStorage.getItem(fullName)
      let orderedList

      if(order){
        orderedList = []

        order.split(',').forEach(idx =>{
          orderedList.push(issueList[idx])
        })

      }

      let newMappedList = {}
      newMappedList[fullName] = orderedList || issueList

      dispatch({
        type: constants.MAP_ISSUES_TO_REPO,
        newMappedList
      })
    })


}


export const reorderIssues=(fullName, issueList, orderStr)=>dispatch=>{

  let newList = {}
  newList[fullName] = issueList

  dispatch({
    type: constants.REORDER_ISSUES,
    newList
  })

  sessionStorage.setItem(fullName, orderStr)

}

export const clearIssues=()=>dispatch=>{

}

export const setKey=(api_key)=>dispatch=>{
  dispatch({
    type: constants.SET_KEY,
    api_key
  })

}

export const clearKey=()=>dispatch=>{
  dispatch({
    type: constants.CLEAR_KEY,
    key: ''
  })

}

export const selectRepo=(selectedRepo)=>dispatch=>{
  dispatch({
    type: constants.SELECT_REPO,
    selectedRepo
  })
}
