import React, { Component } from "react";
import "./App.css";
import Users from "./Users.js";
import Posts from "./Posts.js";
import AddPost from "./AddPost.js";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

async function GetAllUsers() {
  const u = await fetch("https://jsonplaceholder.typicode.com/users").then(
    (response) => {
      return response.json();
    }
  );
  return u;
}

async function GetAllUserPosts(UserID) {
  const p = await fetch(
    `https://jsonplaceholder.typicode.com/users/${UserID}/posts`
  ).then((response) => {
    return response.json();
  });
  return p;
}

export default class App extends Component {
  state = {
    users: [],
    userID: "",
    posts: [],
    showAddModal: false,
  };

  async componentDidMount() {
    const allUsers = await GetAllUsers();
    this.setState({
      users: allUsers,
    });
  }

  handleClose = () => {
    this.setState({
      showAddModal: false,
    });
  };

  handleShowPosts = async (userId) => {
    const allUserPosts = await GetAllUserPosts(userId);
    this.setState({
      posts: allUserPosts,
    });
  };

  handleAddPostModal = (userId) => {
    this.setState({
      showAddModal: true,
      userID: userId,
    });
  };

  handleAddPost = async (data) => {
    await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title: data.Title,
        body: data.Body,
        userId: data.UserId,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((post) => {
        this.setState({
          posts: [...this.state.posts, post],
          showAddModal: false,
        });
      });
  };

  handleDeletePost = async (postId) => {
    await fetch("https://jsonplaceholder.typicode.com/posts" + postId, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((success) => {
        this.setState({
          posts: [...this.state.posts.filter((post) => post.id !== postId)],
        });
      });
  };

  render() {
    return (
      <div>
        <Row style={{ textAlign: "center", display: "block" }}>
          <h1>Activity</h1>
        </Row>
        <Row>
          <Col md="6" lg="6">
            <AddPost
              handleClose={this.handleClose}
              show={this.state.showAddModal}
              userID={this.state.userID}
              handleAddPost={this.handleAddPost}
            />
            <Users
              usersList={this.state.users}
              handleShowPosts={this.handleShowPosts}
              handleAddPostModal={this.handleAddPostModal}
            />
          </Col>
          <Col md="6" lg="6">
            <Posts
              postsList={this.state.posts}
              handleDeletePost={this.handleDeletePost}
            />
          </Col>
        </Row>
      </div>
    );
  }
}
