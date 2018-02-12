import React, { Component } from 'react'
import NavLink from '../../components/NavLink'
import Loading from '../../components/Loading'
import {Link} from 'react-router'
import Auth from '../../Auth'
import classLists from '../../css/classLists'
import ReactMarkdown from 'react-markdown'
import NotFound from '../NotFound'

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      recentPosts: '',
      error: ''
    };
  }
  componentDidMount() {
    this.fetchUser();
  }
  fetchUser() {
    Auth.fetch(`/api/users/${this.props.params.username}`, {})
    .then(response => {
      if (response.error) {
        this.setState({ error: response.error, loaded: true });
      }
      else {
        this.setState({ user: response });
        const recentPosts = [];
        if (this.state.user.posts.length > 0) {
          // sort newest first
          const sorted_posts = this.state.user.posts.sort((a,b) => {
            return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          }).reverse();
          for (let i = 0; i < 5; i++) {
            recentPosts.push(sorted_posts[i]);
          }
          this.setState({ recentPosts: recentPosts, loaded: true });
        }
      }
    })
  }
  render() {
    const user = this.state.user;
    const recentPosts = this.state.recentPosts;
    if (this.state.loaded && !this.state.error) {
      return (
      <main className={classLists.container}>
        <h1 className="glow cinzel f1"><NavLink className="white hover-white" to={'/'+user.username}>{user.username}</NavLink>'s Profile</h1>
        {/* NAVIGATION HERE */}
        <div className="fl db">
          <Link className="grd-gold play f4 mb2" to={"/"+user.username+"/posts"}>
          <img alt="Posts" className="v-mid pr2" src="https://ffxiv.gamerescape.com/w/images/8/86/Main_Command_26_Icon.png"/>
          Posts</Link>
        </div>
        <div className="fr db">
          <Link className="grd-gold play f4 mb2" to="/users">
          Back
          <img alt="Go back" className="v-mid pl2" src="https://ffxiv.gamerescape.com/w/images/5/5e/Main_Command_19_Icon.png"/>
          </Link>
        </div>

        {/* USER INFO */}
        <div className="cb w-100"><h2 className="grd-silver play f4 dib mt3">Age: </h2><span> {user.age}</span></div>
        <h2 className="grd-silver play f4">About: </h2>
        <ReactMarkdown className="blog-post" source={user.about} />

        {/* CHARACTER INFO */}
        <h2 className="grd-silver play f4 mt3 mb1">Main Character: </h2>
          <p><Link to={'/characters/'+user.main.id}>{user.main.data.name} <i>"{user.main.data.data.title}"</i></Link> on {user.main.data.server}</p>
        <h2 className="grd-silver play f4 dib">Main Job: </h2><span> {user.main_job}</span>
        <h2 className="grd-silver play f4 mb1">Alts: </h2>
        <p className="lh-title">{user.alts.map(alt => {
          return (alt.data.data.title) ?
            (
              <span className="db" key={alt.id}>
              <Link to={'/characters/'+alt.id}>{alt.data.name} <i>"{alt.data.data.title}"</i></Link> on {alt.data.server}</span>
            ) :
            (<span className="db" key={alt.id}><Link to={'/characters/'+alt.id}>{alt.data.name}</Link> on {alt.data.server}</span>)
        })}</p>

        {/* TOP 5 RECENT POSTS */}
        <h2 className="grd-silver play f4 mb1">Recent posts: </h2>
        <div className="lh-title">
        {recentPosts.map(post => {
          if (post) {
            if (post.title) {
              return (
              <div key={post.id}>
                <span>{post.short_date}: </span><Link to={'/'+user.username+'/posts/'+post.id}>{post.title}</Link>
              </div>
            )
           } else return <span key="1">No posts yet.</span>
          }
        })}
        <Link className="play grd-gold f4" to={"/"+user.username+"/posts"}>View all posts</Link>
        </div>


      </main>
    )} else if (this.state.loaded && this.state.error) return <NotFound/>
    else return <Loading/>
  }
}

export default User
