import React, { Component } from 'react'
import NavLink from '../../components/NavLink'
import Loading from '../../components/Loading'
import Auth from '../../Auth'
import classLists from '../../css/classLists'

class Characters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      characters: [],
      loaded: false
    };
  }
  componentDidMount() {
    this.fetchCharacters();
  }
  fetchCharacters() {
    Auth.fetch(`${process.env.API_URL}/api/characters`, {})
    .then(response => {
      // console.log(response);
      this.setState({ characters: response });
      this.setState({ loaded: true });
    });
  }
  render() {
    const characters = this.state.characters;
    return (this.state.loaded) ? (
      <main className={classLists.container}>
      <h1 className="f1 glow cinzel">Characters</h1>
      {characters.map((character, index) => {
        return (
          <li key={ index }>
          <NavLink to={'/characters/'+character.id}>{character.data.name}</NavLink>
          </li>
        )
      })}
      </main>
    ) : (
      <Loading/>
    );
  }
}

export default Characters
