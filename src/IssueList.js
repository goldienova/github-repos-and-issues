import React from 'react';
import { connect } from 'react-redux'
import IssueListItem from './IssueListItem'
import { reorderIssues } from './redux/actions'

import './App.css';

function IssueList (props) {

  let reorderIssueList = (idx, newIdx)=>{
    let {selectedRepo, mappedIssuesToRepos} = props
    let issueList = mappedIssuesToRepos[selectedRepo]

    let removed = issueList.splice(idx, 1)
    issueList.splice(newIdx, 0, removed[0])

    let issueOrder = Object.keys(issueList)
    let removedOrder = issueOrder.splice(idx, 1)
    issueOrder.splice(newIdx, 0, removedOrder[0])
    let orderStr = issueOrder.join(',')

    props.onReorderIssues(selectedRepo, issueList, orderStr)
  }

  let {mappedIssuesToRepos} = props
  let issueList = mappedIssuesToRepos[props.selectedRepo] || []

  let issueCount = Object.keys(issueList).length

  return (
      <div className={props.issueListClass}>
      {issueCount ?
            Object.keys(issueList).map((issue, idx)=>{
            return <IssueListItem issue={issueList[issue]} key={idx} idx={idx} issueCount={issueCount} reorderIssueList={reorderIssueList} />
          }): <p>No Issues For this Repo</p>
        }
    </div>

  )

}


const mapStateToProps = (state) => {
  return {
    mappedIssuesToRepos: state.mappedIssuesToRepos,
    selectedRepo: state.selectedRepo
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onReorderIssues(selectedRepo, issueList, orderStr){
      dispatch(reorderIssues(selectedRepo, issueList, orderStr))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IssueList)
