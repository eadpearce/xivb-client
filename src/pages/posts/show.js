import React, { Component } from 'react'
import Loading from '../../components/Loading'
import {Link} from 'react-router'
import Auth from '../../Auth'
import classLists from '../../css/classLists'
import ReactMarkdown from 'react-markdown'
import Comment from '../../components/Comment'
import NotFound from '../NotFound'

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      loaded: false
    };
  }
  componentDidMount() {
    this.fetchPost();
  }
  fetchPost() {
    Auth.fetch(`${process.env.API_URL}/api/posts/${this.props.params.postId}`, {})
    .then(response => {
      if (!response.error) this.setState({ post: response, loaded: true });
      else this.setState({ error: response.error, loaded: true });
    });
  }
  render() {
    const post = this.state.post;
    let author = null;
    let comment = null;
    let edit = null;
    if (this.state.loaded && !this.state.error) {
      if (post.character) {
        author = <p className="fl grd-silver f4 play">By <Link className="grd-gold" to={"/characters/"+post.character.id}>{post.character.data.name}</Link></p>;
      } else {
        author = <p className="fl grd-silver f4 play">By <Link className="grd-gold" to={"/"+post.user.username}>{post.user.username}</Link></p>;
      }
      if (Auth.isLoggedIn()) {
        comment = <Link to={"/"+post.user.username+"/posts/"+post.id+"/comments/new"} className="fl small btn green-btn">Comment</Link>;
      }
      if (Auth.currentUser() === post.user.username) {
        edit = <Link to={"/"+post.user.username+"/posts/"+post.id+"/edit"} className="fr small btn blue-btn">Edit/Delete</Link>;
      }
    }

    if (this.state.loaded && !this.state.error) {
    return (
      <main className={classLists.container}>
      <h1 className="glow f1 cinzel">{post.title}</h1>

      {/* NAVIGATION */}
      {author}
      <Link className="fr db grd-gold play f4 mb2" to={"/"+post.user.username+"/posts"}>Back
      <img alt="Go back" className="v-mid pl2" src="https://ffxiv.gamerescape.com/w/images/5/5e/Main_Command_19_Icon.png"/>
      </Link>

      <p className="cb grd-silver f4 play">At {post.long_date} <Link className="grd-gold" to={"/"+post.user.username}>{post.user.username}</Link> wrote:</p>
      <ReactMarkdown className="blog-post" source={post.body} />

      {comment}
      {edit}

      {/* COMMENTS */}
      <h2 className="cb grd-silver play f4">Comments</h2>
      {post.comments.map((comment, i) => {
        return <Comment key={i} post={post} comment={comment}/>
      })}
      </main>
    )} else if (this.state.loaded && this.state.error) return <NotFound/>;
    else return <Loading/>;
  }
}
export default Post;
