import React, { Component } from 'react'
import Auth from '../../Auth'
import classLists from '../../css/classLists'
import {Link} from 'react-router'
import Loading from '../../components/Loading'
import ReactMarkdown from 'react-markdown'

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: [],
      loaded: false
    };
  }
  componentDidMount() {
    this.fetchComment();
  }
  fetchComment() {
    Auth.fetch(`/api/comments/${this.props.params.commentId}`, {})
    .then(response => {
      this.setState({
        comment: response,
        loaded : true
      });
    });
  }
  render() {
    const comment = this.state.comment;
    let reply = null;
    let edit = null;
    if (this.state.loaded) {
      if (Auth.isLoggedIn()) {
        reply = <Link to={"/"+this.props.params.username+"/posts/"+this.props.params.postId+"/comments/new"} className="fl small btn green-btn">Reply</Link>;
      }
      if (comment.user.username === Auth.currentUser()) {
        edit = <Link to={"/"+this.props.params.username+"/posts/"+this.props.params.postId+"/comments/"+this.props.params.commentId+"/edit"} className="fr small btn blue-btn">Edit/Delete</Link>;
      }
    }
    return (this.state.loaded) ? (
      <main className={classLists.container}>
      <h1 className="f2 glow cinzel">Comment on <Link className="white hover-yellow" to={"/"+comment.post.user.username+"/posts/"+comment.post.id}>{comment.post.title}</Link></h1>
      <div key={comment.id}>
        <p className="grd-silver play f5">At <Link className="grd-gold" to={"/comments/"+comment.id}>{comment.long_date}</Link> <Link className="grd-gold" to={"/"+comment.user.username}>{comment.user.username}</Link> said: </p>
        <ReactMarkdown className="blog-post" source={comment.body}/>

        {reply}
        {edit}

      </div>
      </main>
    ) : ( <Loading/> )
  }
}
export default Comment;
