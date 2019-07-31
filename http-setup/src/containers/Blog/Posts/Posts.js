import React, { Component } from "react";
import Post from "../../../components/Post/Post";
import FullPost from "../FullPost/FullPost";
import { Route } from "react-router-dom";
import axios from "../../../axios";
import "./Posts.css";

class Posts extends Component {
  state = {
    posts: []
  };

  componentDidMount() {
    axios("/posts")
      .then(response => {
        const posts = response.data.slice(0, 4);
        const updatedPosts = posts.map(post => ({ ...post, author: "max" }));
        this.setState({ posts: updatedPosts });
      })
      .catch(error => {
        //this.setState({ error: true });
      });
  }

  postSelectedHandler = id => {
    this.props.history.push({ pathname: "/posts/" + id });
  };

  render() {
    let posts = <p style={{ textAlign: "center" }}>Something went wrong!!</p>;
    if (!this.state.error) {
      posts = this.state.posts.map(post => {
        return (
          //   <Link key={post.id} to={`/posts/${post.id}`}>
          <Post
            key={post.id}
            author={post.author}
            title={post.title}
            clicked={() => this.postSelectedHandler(post.id)}
          />
          //   </Link>
        );
      });
    }
    return (
      <div>
        <section className="Posts">{posts}</section>
        <Route path={this.props.match.url + "/:id"} component={FullPost} />
      </div>
    );
  }
}

export default Posts;
