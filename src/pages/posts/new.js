import React, { Component } from 'react'
import Loading from '../../components/Loading'
import Auth from '../../Auth'
import classLists from '../../css/classLists'

class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      post: { title: '', body: ''},
      loaded: false,
      errors: []
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    const field = e.target.name;
    const post = this.state.post;
    post[field] = e.target.value;
    this.setState({ post });
  }
  onSubmit(e) {
    e.preventDefault();
    if (!this.state.post.title) {
      this.setState({ errors: "Title cannot be empty" })
      return;
    }
    if (!this.state.post.body) {
      this.setState({ errors: "Post body cannot be empty" })
      return;
    }
    if (this.state.post.author_id === Auth.currentUser()) {
      Auth.fetch(`${process.env.API_URL}/api/posts`, {
        method: 'POST',
        body: {
          title: this.state.post.title,
          body: this.state.post.body,
        }
      })
      .then(() => {
        this.props.router.push('/');
      });
    } else {
      Auth.fetch(`${process.env.API_URL}/api/posts`, {
        method: 'POST',
        body: {
          title: this.state.post.title,
          body: this.state.post.body,
          character_id: this.state.post.author_id
        }
      })
      .then(response => {
        this.props.router.push(`/${Auth.currentUser()}/posts/${response.id}`);
      });
    }
  }
  componentDidMount() {
    this.fetchUser();
  }
  fetchUser() {
    Auth.fetch(`${process.env.API_URL}/api/users/${Auth.currentUser()}`, {})
    .then(response => {
      this.setState({
        user: response,
        loaded : true
      });
    });
  }
  render() {
    const post = this.state.post;
    let user = null;
    let alts = null;
    let select = null;
    let main = null;
    let user_author = null;
    const options = [];

    if (this.state.loaded) {
      user = this.state.user;
      alts = this.state.user.alts.map(alt => {
        return React.createElement(
          'option',
          { value: alt.id, key: alt.id },
          alt.data.name
        );
      });
      user_author = React.createElement(
        'option',
        { value: user.id, key: user.id },
        user.username
      );
      main = React.createElement(
        'option',
        { value: user.main.id, key: user.main.id },
        user.main.data.name
      );
      options.push([user_author, main, alts]);
      select = React.createElement(
        'select',
          { name: 'author_id', onChange: this.onChange, value: user.id },
          options
      );
    }
    return (this.state.loaded) ? (
      <main className={classLists.container}>
      <h1 className="glow cinzel f1">New Post</h1>
      <p>Blog posts support <a href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet">markdown</a></p>
      <label className="play f4 grd-silver pr2">Select post author:</label>
      {select}
      <form action="/posts" onSubmit={this.onSubmit}>
      <input
        onChange={this.onChange}
        name="title"
        className="db mv2 w-100 blog-post"
        type="text"
        placeholder="Title"
        value={post.title}></input>
      <textarea
        onChange={this.onChange}
        name="body"
        className="db mv2 w-100 blog-post"
        value={post.body}
        rows="20"/>
      <input className="btn green-btn" type="submit" value="Post"></input>
      </form>
      <p className="red">{this.state.errors}</p>
      </main>
    ) : (
      <Loading/>
    )
  }
}
export default NewPost;
