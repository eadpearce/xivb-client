import React, { Component } from 'react'
import { Link } from 'react-router'
import { IndexLink } from 'react-router'
import Auth from '../Auth'

class Header extends Component {
  render() {
    let loggedIn = null;
    if (Auth.isLoggedIn()) {
      loggedIn = <li className="fl"><Link className="grd-gold" to="/logout">Log Out</Link></li>;
    } else {
      loggedIn = <li className="fl"><Link className="grd-gold" to="/login">Log In</Link></li>;
    }
    let loggedInAs = null;
    if (Auth.isLoggedIn()) {
      loggedInAs = <li className="fl pr2"><span className="grd-silver">Logged in as </span>
      <Link className="grd-gold" to={"/"+Auth.currentUser()}>{Auth.currentUser()}</Link></li>
    }
    return (
      <div className="play nav w-100 h2 pa2 bg-black">
        <IndexLink className="fl grd-gold" to="/">XIVB</IndexLink>
        <ul role="Navigation" className="fr mv0 pa0">
          <li className="fl pr2"><Link className="grd-gold" to="/about">About</Link></li>
          <li className="fl pr2"><Link className="grd-gold" to="/users">Users</Link></li>
          <li className="fl pr2"><Link className="grd-gold" to="/characters">Characters</Link></li>
          {loggedInAs}
          {loggedIn}
        </ul>
      </div>
    )
  }
}
export default Header;
