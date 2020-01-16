import React from 'react';
import { connect } from 'react-redux'
import { fetchRepos, clearRepos, setKey} from './redux/actions'

import RepoListItem from './RepoListItem'

import './App.css';

class RepoList extends React.Component {

  state = {
    key: ''
  }

  handleKeyDown = (event)=>{
    if (event.key === 'Enter') {
      this.props.onFetchRepos(event.target.value)
      this.props.onSetKey(event.target.value)
    }
  }

  handleChange = (event)=>{
    this.setState({key: event.target.value})
  }

  render(){
    return (
      <div className='repoList'>

        {this.props.repoList.length ? this.props.repoList.map((repo, idx)=>{
          return (
            <RepoListItem key={idx} name={repo.name} fullName ={repo.full_name} addColumn={this.props.addColumn} />
          )
        }) :
          <input type="text" onKeyDown={this.handleKeyDown} value={this.state.key} placeholder={'Enter Api Key Here'} onChange={this.handleChange} >
          </input>
        }
      </div>
    )
  }

}


const mapStateToProps = (state) => {
  return {
    repoList: state.repoList,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchRepos(apiKey){
      dispatch(fetchRepos(apiKey))
    },
    onClearRepos(){
      dispatch(clearRepos())
    },
    onSetKey(apiKey){
      dispatch(setKey(apiKey))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RepoList)

