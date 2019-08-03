import React, { Component } from "react";
import { Route, NavLink, Switch, Redirect } from "react-router-dom";
import Posts from "./Posts/Posts";
import "./Blog.css";

//import NewPost from "./NewPost/NewPost";
import asyncComponent from "../../hoc/asyncComponent";
const AsyncNewPost = asyncComponent(() => {
  return import("./NewPost/NewPost");
});

class Blog extends Component {
  state = {
    auth: true
  };

  render() {
    return (
      <div>
        <header className="Blog">
          <nav>
            <ul>
              <li>
                <NavLink
                  exact
                  activeClassName="my-active"
                  activeStyle={{
                    color: "#fa923f",
                    textDecoration: "underline"
                  }}
                  to="/posts"
                >
                  Posts
                </NavLink>
              </li>
              <li>
                <NavLink
                  exact
                  to={{
                    pathname: "/new-post",
                    hash: "submit"
                  }}
                >
                  New Post
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
        {/* <Route path="/" exact render={() => <h1>Home</h1>} />
        <Route path="/"  render={() => <h1>Home 2</h1>} /> */}
        <Switch>
          {this.state.auth ? (
            <Route path="/new-post" component={AsyncNewPost} />
          ) : null}
          <Route path="/posts" component={Posts} />
          {/* <Route path="/" component={Posts} /> */}
          <Route render={() => <h1>404 Page not found</h1>} />
          {/* <Redirect from="/" to="/posts" /> */}
        </Switch>
      </div>
    );
  }
}

export default Blog;
