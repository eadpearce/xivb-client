import React, { Component } from 'react'
import Auth from '../Auth'
import classLists from '../css/classLists'
import Loading from '../components/Loading'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {email: '', password: ''},
      errors: '',
      loaded: true
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    const field = e.target.name;
    const user = this.state.user;
    user[field] = e.target.value;
    this.setState({ user });
  }
  onSubmit(e) {
    this.setState({ loaded: false });
    e.preventDefault();
    // send a req to /login with credentials
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.user.email,
        password: this.state.user.password,
      })
    })
    // parse the response
    .then(res => res.json())
    // get the token back
    .then(data => {
      this.setState({ loaded: true });
      if (data.token) {
        const token = data.token;
        // save token to localStorage with Auth
        Auth.setToken(token);
        this.props.router.push('/');
      } else {
        this.setState({ errors: data.errors });
      }
    });
  }
  render() {
    const user = this.state.user;
    let error = null;
    let loading = null;
    if (!this.state.loaded) loading = <Loading/>;
    if (this.state.errors[0]) error = <p className="red">{this.state.errors[0]}</p>
    return (
      <main className={classLists.container}>
      <h1 className="f1 glow cinzel">Login</h1>
      <form action="/" onSubmit={this.onSubmit}>
      <label htmlFor="email">Email:</label>
      <input className="db mb2 w-50-ns w-100"
        name="email"
        type="email"
        value={user.email}
        onChange={this.onChange}>
      </input>
      <label htmlFor="password">Password:</label>
      <input className="db mb2 w-50-ns w-100"
        name="password"
        type="password"
        value={user.password}
        onChange={this.onChange}>
      </input>
      <input className="btn green-btn"
        type="submit" value="Login"></input>
      </form>
      {error}
      {loading}
      </main>
    )
  }
}

export default Login
