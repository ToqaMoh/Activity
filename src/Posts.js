import React, { Component } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export default class Posts extends Component {
  render() {
    return (
      <div>
        {this.props.postsList.map((post) => (
          <Card key={post.id}>
            <Card.Header as="h5">{post.title}</Card.Header>
            <Card.Body>
              <Card.Text>
                {post.body}
              </Card.Text>
              <Button variant="danger" onClick={() => this.props.handleDeletePost(post.id)}>Delete Post</Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    );
  }
}
