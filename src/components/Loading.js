import React, { Component } from 'react'
import loading from '../images/moogle_load.gif'

class Loading extends Component {
  render() {
    return (
      <div className="bottom-0 right-0 absolute pa2">
        <img src={loading} height="150" alt="Now loading"/>
        <p>Fetching your data, kupo...</p>
      </div>
    )
  }
}

export default Loading;
