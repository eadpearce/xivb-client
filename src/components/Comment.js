import React from 'react'
import { Link } from 'react-router'
import ReactMarkdown from 'react-markdown'

const Comment = ({
  comment,
  post
}) => (
  <div key={comment.id}>
    <p className="grd-silver play f5 mv3">At <Link className="grd-gold" to={"/"+post.user.username+"/posts/"+post.id+"/comments/"+comment.id}>{comment.long_date}</Link> <Link className="grd-gold" to={"/"+comment.user.username}>{comment.user.username}</Link> said: </p>
    <ReactMarkdown className="blog-post" source={comment.body}/>
  </div>
);
export default Comment;
