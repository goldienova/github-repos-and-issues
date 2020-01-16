import React from 'react';
import { connect } from 'react-redux'
import { fetchIssues, selectRepo } from './redux/actions'

class RepoListItem extends React.Component{

  handleButtonClick= (event)=>{
    let issuesFromState = this.props.mappedIssuesToRepos[this.props.fullName]

    this.props.onSelectRepo(this.props.fullName)

    if(!issuesFromState){
      this.props.onFetchIssues(this.props.fullName, this.props.apiKey, this.props.mappedIssuesToRepos)
    }

    this.props.addColumn('double', 'issueList')
  }

  render(){
    return(
      <button className="repo" onClick={this.handleButtonClick}>
        {this.props.name}
      </button>
    )
  }


}

const mapStateToProps = (state) => {
  return {
    apiKey: state.apiKey,
    mappedIssuesToRepos: state.mappedIssuesToRepos
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchIssues(fullName, apiKey, repoList){
      dispatch(fetchIssues(fullName, apiKey, repoList))
    },
    onSelectRepo(repoName){
      dispatch(selectRepo(repoName))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RepoListItem)
