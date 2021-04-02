import React, { Component } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export default class Users extends Component {
  render() {
    return (
      <div>
        <ol>
          {this.props.usersList.map((user) => (
            <li key={user.id}>
              <Card style={{ width: "20rem" }}>
                <Card.Body>
                  <Card.Title>{user.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{user.username}</Card.Subtitle>
                  <Card.Subtitle className="mb-2 text-muted">{user.email}</Card.Subtitle>
                  <Button variant="primary" onClick={() => this.props.handleShowPosts(user.id)}>Show Posts</Button>
                  <Button variant="success" onClick={() => this.props.handleAddPostModal(user.id)}>Add A New Post</Button>
                </Card.Body>
              </Card>
            </li>
          ))}
        </ol>
      </div>
    );
  }
}
