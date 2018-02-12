import React, { Component } from 'react'
import NavLink from '../../components/NavLink'
import Loading from '../../components/Loading'
import Auth from '../../Auth'
import classLists from '../../css/classLists'

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loaded: false
    };
  }
  componentDidMount() {
    this.fetchUsers();
  }
  fetchUsers() {
    Auth.fetch('/api/users', {})
    .then(response => {
      this.setState({ users: response, loaded: true });
    });
  }
  render() {
    const users = this.state.users;
    return (this.state.loaded) ?
    (
      <main className={classLists.container}>
      <h1 className="glow cinzel f1">Users</h1>
      {users.map(user => {
        return <NavLink key={user.username} to={'/'+user.username}>{user.username}</NavLink>
      })}
      </main>
    ) : (
      <Loading/>
    );
  }
}

export default Users
