import React from 'react';
import ReactDOM from 'react-dom'; // imports ReactDOM from module react-dom. can use render like below
import App from './pages/App'; // import component from ./App.js
import './css/reset.css';
import './css/tachyons.css';
import './css/index.css';
// ReactDOM.render(
//   <App />, // what to render. can also write this: <App></App>. does the same thing
//   document.getElementById('root') // where to render it
// );
// ReactDOM.render(
//  <Routes history={browserHistory} />,
//  document.getElementById('root')
// );

import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import About from './pages/About'
import Home from './pages/Home'
import Login from './pages/Login'

import Users from './pages/users/index'
import User from './pages/users/show'

import Posts from './pages/posts/index'
import Post from './pages/posts/show'
import NewPost from './pages/posts/new'
import EditPost from './pages/posts/edit'

import Characters from './pages/characters/index'
import Character from './pages/characters/show'

import Comment from './pages/comments/show'
import NewComment from './pages/comments/new'
import EditComment from './pages/comments/edit'

import NotFound from './pages/NotFound'

import Auth from './Auth'

// instead of rendering app we render the router
// can nest components inside a route
ReactDOM.render(
  (
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="/logout"
          onEnter={(nextState, replace) => {
            Auth.removeToken();
            replace('/');
          }}/>
        <Route path="/login" component={Login}/>
        <Route path="/about" component={About}/>
        <Route path="/users" component={Users}/>
        <Route path="/characters" component={Characters}/>
        <Route path="/:username" component={User}/>
        <Route path="/:username/posts" component={Posts}/>
        <Route path="/:username/posts/:postId" component={Post}/>
        <Route path="/:username/posts/:postId/edit" component={EditPost}/>
        <Route path="/characters/:characterId" component={Character} />
        <Route path="/:username/posts/:postId/comments/new" component={NewComment} />
        <Route path="/:username/posts/:postId/comments/:commentId" component={Comment} />
        <Route path="/:username/posts/:postId/comments/:commentId/edit" component={EditComment} />
        <Route path="/posts/new" component={NewPost} />
        <Route path="*" component={NotFound} />
        </Route>
    </Router>
  ),
  document.getElementById('root')
);
