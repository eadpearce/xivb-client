import React, { Component } from 'react'
import Home from './Home'
import Header from '../components/Header'

// can also use activeStyle={{ color: 'red' }}
// with NavLink the link to Home is always active
// parent routes are active when child routes are active
// unfortunately / is the parent of everything
// fix this by using IndexLink instead

// we can also use onlyActiveOnIndex with a NavLink

class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        {/* this adds the content of the component underneath the navbar ^^ so we can have the navbar on every page */}
        {/* if there are no children it just renders the Home component */}
        {this.props.children || <Home/>}

      </div>
    )
  }
}

export default App
