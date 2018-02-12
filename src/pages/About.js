import React, { Component } from 'react'
import classLists from '../css/classLists'

class About extends Component {
  render() {
    return (
    <main className={classLists.container}>
    <h1 className="f1 cinzel glow">About</h1>
    <p>
      XIVB is a blogging site for players of the MMORPG Final Fantasy XIV.
    </p>
    </main>
    )
  }
}

export default About
