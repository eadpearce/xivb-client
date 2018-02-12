import React, { Component } from 'react'
import Loading from '../../components/Loading'
import Auth from '../../Auth'
import classLists from '../../css/classLists'
import { Link } from 'react-router'

class NewComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: {},
      loaded: true,
      errors: []
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    const field = e.target.name;
    const comment = this.state.comment;
    comment[field] = e.target.value;
    this.setState({ comment });
  }
  onSubmit(e) {
    e.preventDefault();
    Auth.fetch('/api/comments', {
      method: 'POST',
      body: {
        post_id: parseInt(this.props.params.postId, 10),
        body: this.state.comment.body
      }
    })
    .then(() => {
      this.props.router.push(`/${this.props.params.username}/posts/${this.props.params.postId}`);
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
      <Link className="fr btn red-btn small" to={"/"+this.props.params.username+"/posts/"+this.props.params.postId} >Cancel</Link>
      </form>
      </main>
    ) : (
      <Loading/>
    )
  }
}
export default NewComment;
