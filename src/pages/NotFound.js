import React, { Component } from 'react'
import classLists from '../css/classLists'

class NotFound extends Component {
  render() {
    return ( // HOMEPAGE
      <main className={classLists.container}>
      <h1 className="f1 glow cinzel">Not Found</h1>
      </main>
    );
  }
}

export default NotFound
