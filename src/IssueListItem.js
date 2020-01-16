import React from 'react';
import { connect } from 'react-redux'
// import { reorderIssues } from './redux/actions'

import './App.css';

class IssueListItem extends React.Component {
  state = {
    order: ''
  }

  handleKeyDown = (event)=>{
    if (event.key === 'Enter') {
      let {idx} = this.props
      let newIdx = event.target.value-1
      this.setState({order: ''})
      this.props.reorderIssueList(idx, newIdx)
    }
  }

  handleChange = (event)=>{
    this.setState({order: event.target.value})
  }

  formatStr(num){
    let str = num.toString()
    return str.length===1 ? `0${str}` : str
  }

  render(){
    const { idx, issue } = this.props

    let createdAt = new Date(issue.created_at)
    let formattedCreatedAt = `${
      this.formatStr(createdAt.getDate())}/${this.formatStr(createdAt.getMonth()+1)}/${createdAt.getFullYear()
    }`

    let timeSinceUpdate = new Date()-new Date(issue.updated_at)
    let formattedUpdateDate = ''
    if(timeSinceUpdate>31536000000){
      formattedUpdateDate = `${Math.floor(timeSinceUpdate/31536000000)} years ago`
    }else if (timeSinceUpdate>86400000){
      formattedUpdateDate = `${Math.floor(timeSinceUpdate/86400000)} days ago`
    } else if(timeSinceUpdate>3600000){
      formattedUpdateDate = `${Math.floor(timeSinceUpdate/3600000)} hours ago`
    } else if(timeSinceUpdate>600000){
      formattedUpdateDate = `${Math.floor(timeSinceUpdate/600000)} minutes ago`
    }

    return (
        <div key={idx} className='issue'>

          <p>{`Title: ${issue.title}`}</p>
          <p>{`Created At: ${formattedCreatedAt}`}</p>
          <p>{`Last Updated: ${formattedUpdateDate}`}</p>
          {issue.assignee ?
            <p> {'Assignee: '}
              <img src={issue.assignee && issue.assignee.avatar_url} alt={'Picure of Issue Assignee'}/>
            </p> :
            <p> {'No Assignee'}</p>
          }
          <p>{'Issue Importance: '}
            <input type='number' onChange={this.handleChange} onKeyDown={this.handleKeyDown} value={this.state.order || idx+1} min={1} max={this.props.issueCount}></input>
          </p>

        </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    issueList: state.issueList
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IssueListItem)
