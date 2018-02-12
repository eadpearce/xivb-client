import React, { Component } from 'react'
import Loading from '../../components/Loading'
import Auth from '../../Auth'
import classLists from '../../css/classLists'
import { Link } from 'react-router'

class EditComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: { body: '' },
      loaded: false,
      errors: []
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
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
  deleteComment(e) {
    e.preventDefault();
    Auth.fetch(`/api/comments/${this.props.params.commentId}`, {
      method: 'DELETE',
      body: ''
    })
    .then(() => {
      this.props.router.push(`/${this.props.params.username}/posts/${this.props.params.postId}`);
    });
  }
  onChange(e) {
    const field = e.target.name;
    const comment = this.state.comment;
    comment[field] = e.target.value;
    this.setState({ comment });
  }
  onSubmit(e) {
    e.preventDefault();
    Auth.fetch(`/api/comments/${this.props.params.commentId}`, {
      method: 'PATCH',
      body: {
        body: this.state.comment.body
      }
    })
    .then(() => {
      this.props.router.push(`/${this.props.params.username}/posts/${this.props.params.postId}/comments/${this.props.params.commentId}`);
    });
  }
  render() {
    const comment = this.state.comment;

    return (this.state.loaded) ? (
      <main className={classLists.container}>
      <h1 className="glow cinzel f1">New Comment</h1>
      <p>Comments support <a target="_blank" rel="noopener noreferrer" href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet">markdown</a></p>
      <form action="/comments" onSubmit={this.onSubmit}>
      <textarea
        onChange={this.onChange}
        name="body"
        className="db mv2 w-100 blog-post"
        value={comment.body}
        rows="10"/>
      <input className="fl btn green-btn small" type="submit" value="Post"></input>
      <button onClick={this.deleteComment} className="fl small btn red-btn ml2">Delete</button>
      <Link className="fr btn blue-btn small" to={"/"+this.props.params.username+"/posts/"+this.props.params.postId} >Cancel</Link>
      </form>
      </main>
    ) : (
      <Loading/>
    )
  }
}
export default EditComment;
