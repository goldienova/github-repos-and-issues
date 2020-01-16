import React from 'react';
import RepoList from './RepoList';
import IssueList from './IssueList';

import './App.css';

export default class App extends React.Component {

  state = {
    class: 'single',
    issueListClass: 'hidden'
  }

  changeClassName = (className, issueListClassName) => {
    this.setState({
      class: className,
      issueListClass: issueListClassName
    })
  }

  handleClick = () => {
    this.setState(prevState=>{
      let toggleState = prevState.class === 'double' ? 'reverse-double' : 'double'
      return {class: toggleState}
    })
  }

  render(){
   return(
     <div className={this.state.class}>
       <div className='gutter-left' onClick={this.handleClick}><p>{'<'}</p></div>
       <RepoList addColumn={this.changeClassName}/>
       <IssueList issueListClass={this.state.issueListClass}/>
       <div className='gutter-right' onClick={this.handleClick}><p>{'>'}</p></div>
     </div>
   )
  }

}
