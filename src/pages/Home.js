import React, { Component } from 'react'
import Auth from '../Auth'
import { Link } from 'react-router'
import classLists from '../css/classLists'

class Home extends Component {
  render() {
    return (Auth.isLoggedIn()) ? ( // USER DASHBOARD
      <main className={classLists.container}>
      <h1 className="f1 cinzel glow">Dashboard</h1>
      <div className="mb3">
        <Link className="play grd-gold f4" to={"/"+Auth.currentUser()+"/posts"}>
          <img className="v-mid pr2" src="https://ffxiv.gamerescape.com/w/images/8/86/Main_Command_26_Icon.png"/>
          View my posts</Link>
      </div>
      <div className="mb3">
        <Link className="play grd-gold f4" to={"/"+Auth.currentUser()}>
          <img className="v-mid pr2" src="https://ffxiv.gamerescape.com/w/images/7/71/Main_Command_3_Icon.png"/>
          View my profile</Link>
      </div>
      <Link className="db btn big green-btn" to="/posts/new">Write a new post</Link>
      </main>
    ) : ( // HOMEPAGE
      <main className={classLists.container}>
      <h1 className="f1 glow cinzel">Home</h1>
      </main>
    );
  }
}

export default Home
