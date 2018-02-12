import React, { Component } from 'react'
import { Link } from 'react-router'
import Auth from '../../Auth'
import Loading from '../../components/Loading'
import classLists from '../../css/classLists'
import NotFound from '../NotFound'

class Character extends Component {
  constructor(props) {
    super(props);
    this.state = {
      character: [],
      loaded: false,
      error: ''
    };
  }
  componentDidMount() {
    this.fetchCharacter();
  }
  fetchCharacter() {
    Auth.fetch(`/api/characters/${this.props.params.characterId}`, {})
    .then(response => {
      if (response.status > 400) this.setState({ error: response.error, loaded: true });
      else this.setState({ character: response, loaded : true });
    });
  }
  render() {
    const character = this.state.character;
    let title = null;
    let grand_company = null;
    const classjobs = [];
    const crafterClasses = [];
    // keys of all crafting classes
    const crafters = ['8','9','10','11','12','13','14','15','16','17','18'];
    if (this.state.loaded && !this.state.error) {
      // get keys of classjobs object
      const keys = Object.keys(character.data.data.classjobs);
      for (let i = 0; i < keys.length; i++) {
        // if the class is not a crafter push it into the classjobs array
        if (crafters.indexOf(keys[i]) === -1) classjobs.push(character.data.data.classjobs[keys[i]]);
        else crafterClasses.push(character.data.data.classjobs[keys[i]]);
      }

      if (character.data.data.title) title = <h2 className="cb script glow f1">{character.data.data.title}</h2>;
      if (character.data.data.grand_company) grand_company = <p className="cb grd-silver play f4"><img alt={character.data.data.grand_company.name+" icon"} height="32" className="v-mid" src={character.data.data.grand_company.icon}/> {character.data.data.grand_company.name} {character.data.data.grand_company.rank}</p>;
    }
    if (this.state.loaded && !this.state.error) {
    return (
      <main className={classLists.container}>
        <h2 className="play grd-silver f3 mt4">Character Profile:</h2>
        <div className="w-75 fl">
          <h1 className="cinzel glow f1 mv2">{character.data.name}</h1>{title}
        </div>
        <img alt={character.data.name+" avatar"} className="ba b--washed-yellow bw1 br-100 fr" src={character.data.data.avatar}/>
        <p className="cb grd-silver play f4">{character.data.data.gender} {character.data.data.clan} {character.data.data.race}</p>
        {grand_company}

        <div className="w-25-ns w-100 fl-ns pr1">
        <h3 className="grd-silver play f4 mb2">Nameday:</h3>
          <p>{character.data.data.nameday}</p>
        </div>
        <div className="w-25-ns w-100 fl-ns ph1">
        <h3 className="grd-silver play f4 mb2">Guardian: </h3>
          <p><img alt={character.data.data.guardian.name+" icon"} className="v-mid" src={character.data.data.guardian.icon}/> {character.data.data.guardian.name}</p>
        </div>
        <div className="w-25-ns w-100 fl-ns ph1">
        <h3 className="grd-silver play f4 mb2">City: </h3>
          <p><img alt={character.data.data.city.name+" icon"} className="v-mid" src={character.data.data.city.icon}/> {character.data.data.city.name}</p>
        </div>
        <div className="w-25-ns w-100 fl-ns pl1">
        <h3 className="grd-silver f4 play mb2">Played by: </h3>
          <p><Link to={'/'+character.user.username}>{character.user.username}</Link> on {character.data.data.server}</p>
        </div>

        {/* ALL CLASSES AND LEVELS */}
        <div className="w-100 fl-ns">
        <h3 className="cb grd-silver f4 play mb2">All classes:</h3>
        {classjobs.map((job, id) => {
          return <div className="fl ph1" key={job.id}><img alt={job.name+" icon"} src={job.data.icon} height="32" className="v-mid"/>
            <p className="tc w-100">{job.level}</p></div>
        })}
        </div>

        <div className="cb w-third-ns w-100 fl-ns pr1">
        <h3 className="grd-silver f4 play mb2">Current class:</h3>
        <p><img alt={character.data.data.active_class.role.name+" icon"} height="32" className="v-mid" src={character.data.data.active_class.role.icon}/> {character.data.data.active_class.role.name}</p>
        </div>
        <div className="w-two-thirds-ns w-100 fl-ns pl1">
        <h3 className="cb grd-silver f4 play mb2">Crafters:</h3>
        {crafterClasses.map((crafter, id) => {
          return <div className="fl ph1" key={crafter.id}><img alt={crafter.name+" icon"} src={crafter.data.icon} height="32" className="v-mid"/>
            <p className="tc w-100">{crafter.level}</p></div>
        })}
        </div>

        <h3 className="cb grd-silver f4 play">Bio:</h3>
          <p className="blog-post">{character.about}</p>

      </main>
    )} else if (this.state.loaded && this.state.error) return <NotFound/>
    else return <Loading/>;
  }
}

export default Character
